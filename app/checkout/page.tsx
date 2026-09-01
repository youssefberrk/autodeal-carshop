"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Truck, ArrowRight } from 'lucide-react';
import CarWheelLoader from '@/components/ui/CarWheelLoader';

import { useCheckout } from './_hooks/useCheckout';
import OrderSummary from './_components/OrderSummary';
import CheckoutForm from './_components/CheckoutForm';
import OrderSuccessModal from './_components/OrderSuccessModal';

const CheckoutPage = () => {
  const router = useRouter();
  const {
    form,
    watchedShipping,
    activeCars,
    isGarageEmpty,
    pricing,
    displayCars,
    displayTotal,
    paymentMethod,
    setPaymentMethod,
    stripeError,
    isSubmitting,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
    createdOrderId,
    useMock,
    setUseMock,
    handleSubmit,
    removeFromAllocation,
  } = useCheckout();

  if (isGarageEmpty && !isSuccessModalOpen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#020805] via-[#010402] to-[#000201] text-[#dae6d8] font-['Manrope'] px-6 py-24 relative overflow-hidden">
        {/* Dynamic ambient backgrounds */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,135,0.03),transparent_50%)]" />
        
        <div className="max-w-md w-full text-center relative z-10 border border-[#dae6d8]/10 bg-[#091a11]/80 p-10 rounded-2xl backdrop-blur-md shadow-2xl">
          <div className="w-16 h-16 bg-[#00ff87]/10 rounded-full flex items-center justify-center text-[#00ff87] mx-auto mb-6 border border-[#00ff87]/20">
            <Truck size={28} />
          </div>
          <h2 className="text-3xl font-['Newsreader'] italic font-bold tracking-tight mb-4 text-[#e5efe3]">Your Garage is Empty</h2>
          <p className="text-sm text-[#dae6d8]/60 leading-relaxed mb-8">
            You haven&apos;t allocated any vehicles to your reservation slots yet. Browse our inventory of luxury and performance machines to secure your build slot.
          </p>
          
          <div className="flex flex-col gap-4">
            <Link 
              href="/shop" 
              className="w-full bg-[#00ff87] text-[#050e0a] py-4 rounded-lg flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,255,135,0.15)]"
            >
              Browse Inventory <ArrowRight size={14} />
            </Link>
            <button 
              onClick={() => setUseMock(true)}
              className="w-full py-4 border border-[#dae6d8]/10 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#dae6d8]/5 transition-all text-[#dae6d8]/80"
            >
              Preview with Mock Car
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020805] via-[#010402] to-[#000201] text-[#dae6d8] font-['Manrope'] pb-28 pt-24 relative overflow-hidden">
      {/* Dynamic Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,255,135,0.04),transparent_45%),radial-gradient(circle_at_85%_25%,rgba(16,185,129,0.02),transparent_40%),radial-gradient(circle_at_50%_75%,rgba(0,255,135,0.02),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(218,230,216,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(218,230,216,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 relative z-10">
        {/* Left Column: Summary */}
        <OrderSummary
          cars={activeCars}
          subtotal={pricing.subtotal}
          customConfiguration={pricing.customConfiguration}
          deliveryFee={pricing.deliveryFee}
          totalAllocation={pricing.totalAllocation}
          useMock={useMock}
          onUnlockSlot={removeFromAllocation}
          onExitMock={() => setUseMock(false)}
        />

        {/* Right Column: Checkout Form */}
        <CheckoutForm
          form={form}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          stripeError={stripeError}
          isSubmitting={isSubmitting}
          depositRequired={pricing.depositRequired}
          useMock={useMock}
          onExitMock={() => setUseMock(false)}
          handleSubmit={handleSubmit}
        />
      </main>

      {/* Processing Loader Overlay */}
      {isSubmitting && (
        <CarWheelLoader
          fullPage
          text="Securing your premium slot allocation..."
          size={80}
        />
      )}

      {/* Success Modal Overlay */}
      <OrderSuccessModal
        isOpen={isSuccessModalOpen}
        createdOrderId={createdOrderId}
        fullName={watchedShipping.fullName || ''}
        email={watchedShipping.email || ''}
        displayCars={displayCars}
        city={watchedShipping.city || ''}
        stateName={watchedShipping.stateName || ''}
        displayTotal={displayTotal}
        onClose={() => setIsSuccessModalOpen(false)}
        onViewOrderHistory={() => router.push('/orders')}
        onReturnToShowroom={() => router.push('/')}
      />
    </div>
  );
};

export default CheckoutPage;