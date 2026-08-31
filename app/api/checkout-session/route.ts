import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { carsData } from '@/public/cars/CarsData';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripe = new Stripe(stripeSecretKey || '');

/**
 * Trusted server-side car lookup.
 * Never accept price, total, or discount from the client.
 * The client sends only carIds + quantities; the server resolves everything else.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      carIds,        // number[]  – the only car data trusted from the client
      quantities,    // Record<number, number>  – carId → quantity chosen by the user
      fullName,
      email,
      address,
      city,
      postalCode,
      stateName,
      countryName,
      phoneNumber,
    } = body;

    // ── Validate shape ────────────────────────────────────────────────────────
    if (!carIds || !Array.isArray(carIds) || carIds.length === 0) {
      return NextResponse.json({ error: 'carIds are required' }, { status: 400 });
    }
    if (!fullName || !email || !address || !city || !postalCode) {
      return NextResponse.json({ error: 'Missing required delivery details' }, { status: 400 });
    }

    // ── Resolve each car from the authoritative server-side catalog ───────────
    const resolvedCars: Array<{
      id: number;
      brand: string;
      model: string;
      price: number;
      image: string;
      bodySilhouette: string;
      specs: string;
      quantity: number;
    }> = [];

    for (const rawId of carIds) {
      const carId = Number(rawId);
      if (!Number.isInteger(carId) || carId <= 0) {
        return NextResponse.json({ error: `Invalid carId: ${rawId}` }, { status: 400 });
      }

      // Look up in the authoritative catalog – never use client-supplied price
      const catalogCar = carsData.find((c) => c.id === carId);
      if (!catalogCar) {
        return NextResponse.json({ error: `Car not found: ${carId}` }, { status: 404 });
      }

      // Clamp quantity: must be ≥ 1 and ≤ availability
      const requestedQty = quantities && quantities[carId] ? Number(quantities[carId]) : 1;
      const availability = catalogCar.availability ?? 1;
      if (!Number.isInteger(requestedQty) || requestedQty < 1) {
        return NextResponse.json(
          { error: `Invalid quantity for car ${carId}` },
          { status: 400 }
        );
      }
      if (requestedQty > availability) {
        return NextResponse.json(
          {
            error: `Requested quantity (${requestedQty}) exceeds availability (${availability}) for ${catalogCar.brand} ${catalogCar.model}`,
          },
          { status: 400 }
        );
      }

      // Authoritative price from the catalog (number, not string)
      const authorizedPrice =
        typeof catalogCar.price === 'number' ? catalogCar.price : null;
      if (authorizedPrice === null) {
        return NextResponse.json(
          { error: `${catalogCar.brand} ${catalogCar.model} is "Price On Request" and cannot be purchased online.` },
          { status: 400 }
        );
      }

      resolvedCars.push({
        id: catalogCar.id,
        brand: catalogCar.brand,
        model: catalogCar.model ?? '',
        price: authorizedPrice,
        image: catalogCar.image ?? '',
        bodySilhouette: catalogCar.bodySilhouette ?? '',
        specs: catalogCar.specs ?? '',
        quantity: requestedQty,
      });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // ── Build Stripe line items from server-resolved data ─────────────────────
    // Deposit: $10,000 per vehicle (server-defined, not client-controlled)
    const DEPOSIT_CENTS = 1_000_000; // $10,000 in cents

    const lineItems = resolvedCars.map((car) => {
      let imageUrls: string[] = [];
      if (car.image) {
        try {
          imageUrls = [
            car.image.startsWith('/')
              ? new URL(car.image, origin).toString()
              : car.image,
          ];
        } catch {
          // skip invalid URLs silently
        }
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Reservation Deposit: ${car.brand} ${car.model}`,
            images: imageUrls,
            description: `Non-refundable build slot reservation deposit for ${car.brand} ${car.model}. Spec: ${car.specs || 'Custom'}.`,
          },
          unit_amount: DEPOSIT_CENTS,
        },
        quantity: car.quantity,
      };
    });

    // ── Compact metadata (Stripe 500-char limit per value) ────────────────────
    // Store only IDs + quantities; prices are NOT persisted in metadata because
    // on success the server re-derives them from the catalog.
    const compactCars = resolvedCars.map((c) => ({
      id: c.id,
      b: c.brand,
      m: c.model,
      i: c.image,
      bs: c.bodySilhouette,
      s: c.specs,
      q: c.quantity,
      // NOTE: price (p) is intentionally omitted – re-derived server-side on success
    }));

    const carsJson = JSON.stringify(compactCars);
    if (carsJson.length > 500) {
      console.warn('Metadata carsJson exceeds Stripe 500 character limit:', carsJson.length);
    }

    // ── Create Stripe Checkout Session ────────────────────────────────────────
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      customer_email: email,
      metadata: {
        fullName,
        email,
        phone: phoneNumber || '',
        address,
        city,
        state: stateName || '',
        zipCode: postalCode,
        country: countryName || 'United States',
        carsJson,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing session_id parameter' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      id: session.id,
      status: session.status,
      paymentStatus: session.payment_status,
      metadata: session.metadata,
      customerDetails: session.customer_details,
    });
  } catch (error) {
    console.error('Error retrieving Stripe Checkout session:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
