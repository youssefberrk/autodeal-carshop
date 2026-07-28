import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import WelcomeNewsletter from '@/emails/WelcomeNewsletter';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY is not set. Skipping welcome email.');
      return NextResponse.json({ message: 'Subscription recorded (email skipped)' }, { status: 200 });
    }

    const { data, error } = await resend.emails.send({
      from: 'AutoDeal Motors <onboarding@resend.dev>',
      to: [email],
      subject: 'Welcome to the Inner Circle — AutoDeal',
      react: WelcomeNewsletter({ email }),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data, message: 'Welcome email sent' });
  } catch (error) {
    console.error('Error in subscribe-newsletter API:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}