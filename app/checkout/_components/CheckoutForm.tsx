import React from 'react';
import ShippingForm from './ShippingForm';
import PaymentMethod from './PaymentMethod';
import { ShippingFields } from '../_hooks/useCheckout';

interface CheckoutFormProps {
  shipping: ShippingFields;
  setField: <K extends keyof ShippingFields>(key: K, value: ShippingFields[K]) => void;
  paymentMethod: 'credit_card' | 'wire_transfer';
  setPaymentMethod: (m: 'credit_card' | 'wire_transfer') => void;
  errors: Record<string, string>;
  isSubmitting: boolean;
  depositRequired: number;
  useMock: boolean;
  onExitMock: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function CheckoutForm({
  shipping,
  setField,
  paymentMethod,
  setPaymentMethod,
  errors,
  isSubmitting,
  depositRequired,
  useMock,
  onExitMock,
  handleSubmit,
}: CheckoutFormProps) {
  return (
    <div className="lg:col-span-7 lg:pl-12 lg:border-l border-[#00ff87]/15">
      <div className="bg-[#081a11]/40 backdrop-blur-xl border border-[#dae6d8]/10 p-8 md:p-12 rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSubmit} className="space-y-12">
          <ShippingForm
            fields={shipping}
            errors={errors}
            onChange={setField}
          />
          <PaymentMethod
            method={paymentMethod}
            onMethodChange={setPaymentMethod}
            depositRequired={depositRequired}
            stripeError={errors.stripe}
            isSubmitting={isSubmitting}
            useMock={useMock}
            onExitMock={onExitMock}
            fullName={shipping.fullName}
          />
        </form>
      </div>
    </div>
  );
}
