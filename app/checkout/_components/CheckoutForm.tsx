import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';
import { ShippingFormData } from '../_schemas/checkoutSchema';

interface CheckoutFormProps {
  form: UseFormReturn<ShippingFormData>;
  paymentMethod: 'credit_card' | 'wire_transfer';
  setPaymentMethod: (m: 'credit_card' | 'wire_transfer') => void;
  stripeError?: string;
  isSubmitting: boolean;
  depositRequired: number;
  useMock: boolean;
  onExitMock: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function CheckoutForm({
  form,
  paymentMethod,
  setPaymentMethod,
  stripeError,
  isSubmitting,
  depositRequired,
  useMock,
  onExitMock,
  handleSubmit,
}: CheckoutFormProps) {
  const fullName = form.watch('fullName') || '';

  return (
    <div className="lg:col-span-7 lg:pl-12 lg:border-l border-[#00ff87]/15">
      <div className="bg-[#081a11]/40 backdrop-blur-xl border border-[#dae6d8]/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSubmit} className="space-y-12" noValidate>
          <ShippingForm form={form} />
          <PaymentMethod
            method={paymentMethod}
            onMethodChange={setPaymentMethod}
            depositRequired={depositRequired}
            stripeError={stripeError}
            isSubmitting={isSubmitting}
            useMock={useMock}
            onExitMock={onExitMock}
            fullName={fullName}
          />
        </form>
      </div>
    </div>
  );
}
