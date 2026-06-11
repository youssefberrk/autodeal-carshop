'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import OrderConfirmationEmail from '@/emails/OrderConfirmation';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, fullName, orderId, totalAmount, cars } = body;

    if (!email) {
      return NextResponse.json({ error: 'Recipient email is required' }, { status: 400 });
    }

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
