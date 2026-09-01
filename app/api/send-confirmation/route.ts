'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import OrderConfirmationEmail from '@/emails/OrderConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

const confirmationSchema = z.object({
  email: z.string().email({ message: 'Valid recipient email is required' }),
  fullName: z.string().min(1, { message: 'Full name is required' }),
  orderId: z.string().min(1, { message: 'Order ID is required' }),
  totalAmount: z.number().positive({ message: 'Total amount must be positive' }),
  cars: z.array(z.any()).min(1, { message: 'At least one vehicle must be included' }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = confirmationSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const firstErrorMessage =
        Object.values(fieldErrors)[0]?.[0] || 'Invalid confirmation data';
      return NextResponse.json(
        { error: firstErrorMessage, details: fieldErrors },
        { status: 400 }
      );
    }

    const { email, fullName, orderId, totalAmount, cars } = result.data;

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Skipping email send.');
      return NextResponse.json({ message: 'Email skipped (no API key)' }, { status: 200 });
    }

    const { data, error } = await resend.emails.send({
      from: 'AutoDeal Motors <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Obsidian Build Slot Allocation is Secured',
      react: OrderConfirmationEmail({
        fullName,
        orderId,
        totalAmount,
        cars,
      }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error in send-confirmation API:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
