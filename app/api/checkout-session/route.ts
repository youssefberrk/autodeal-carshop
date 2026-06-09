import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Car } from '@/types/Order';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn('STRIPE_SECRET_KEY is not set in environment variables');
}
const stripe = new Stripe(stripeSecretKey || '');

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      cars,
      fullName,
      email,
      address,
      city,
      postalCode,
      stateName,
      countryName,
      phoneNumber,
    } = body;

    // Validate request data
    if (!cars || !Array.isArray(cars) || cars.length === 0) {
      return NextResponse.json({ error: 'Allocated cars are required' }, { status: 400 });
    }
    if (!fullName || !email || !address || !city || !postalCode) {
      return NextResponse.json({ error: 'Missing required delivery details' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Map cars to Stripe line items (deposit of $10,000 per vehicle)
    const lineItems = cars.map((car: Car) => {
      // Form absolute image URL for Stripe checkout page
      let imageUrls: string[] = [];
      if (car.image) {
        try {
          // If image is relative, make it absolute
          if (car.image.startsWith('/')) {
            imageUrls = [new URL(car.image, origin).toString()];
          } else if (car.image.startsWith('http')) {
            imageUrls = [car.image];
          }
        } catch (e) {
          console.error('Error parsing car image URL:', e);
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
          unit_amount: 1000000, // $10,000 in cents
        },
        quantity: car.quantity || 1,
      };
    });

    // Compact the cars object for metadata to save space (Stripe limit is 500 chars per value)
    const compactCars = cars.map((c: Car) => ({
      id: c.id,
      b: c.brand,
      m: c.model,
      p: c.price,
      i: c.image || '',
      bs: c.bodySilhouette || '',
      s: c.specs || '',
      q: c.quantity || 1,
    }));

    const carsJson = JSON.stringify(compactCars);
    if (carsJson.length > 500) {
      // If still too long, we might need a different approach, but for now we'll log it
      console.warn('Metadata carsJson exceeds Stripe 500 character limit:', carsJson.length);
    }

    // Create Stripe Checkout Session
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
        carsJson: carsJson,
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
