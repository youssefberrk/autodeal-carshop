import { CreditCard, Building2, ShieldCheck, Info, AlertCircle, ArrowRight } from 'lucide-react';
import CarWheelLoader from '@/components/ui/CarWheelLoader';

interface PaymentMethodProps {
  method: 'credit_card' | 'wire_transfer';
  onMethodChange: (m: 'credit_card' | 'wire_transfer') => void;
  depositRequired: number;
  stripeError?: string;
  isSubmitting: boolean;
  useMock: boolean;
  onExitMock: () => void;
  fullName: string;
}

export default function PaymentMethod({
  method,
  onMethodChange,
  depositRequired,
  stripeError,
  isSubmitting,
  useMock,
  onExitMock,
  fullName,
}: PaymentMethodProps) {
  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] border border-[#00ff87]/25 rounded-xl shadow-[0_0_15px_rgba(0,255,135,0.1)]">
          <ShieldCheck size={22} />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-['Newsreader'] italic font-bold text-[#e5efe3]">
            Secure Payment
          </h3>
          <p className="text-[10px] text-[#dae6d8]/50 uppercase tracking-[0.2em] mt-0.5 font-semibold">
            Encrypting mechanical acquisitions
          </p>
        </div>
      </div>

      {/* Method selector */}
      <div className="flex gap-4 mb-8">
        {(['credit_card', 'wire_transfer'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onMethodChange(m)}
            className={`flex-1 flex flex-col items-center justify-center gap-3 py-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
              method === m
                ? 'bg-[#00ff87]/10 border-[#00ff87] shadow-[0_0_25px_rgba(0,255,135,0.15)]'
                : 'bg-[#05140d]/40 border-[#dae6d8]/10 hover:border-[#dae6d8]/30 hover:bg-[#05140d]/80'
            }`}
          >
            {m === 'credit_card' ? (
              <CreditCard size={20} className={method === m ? 'text-[#00ff87]' : 'text-[#dae6d8]/40'} />
            ) : (
              <Building2 size={20} className={method === m ? 'text-[#00ff87]' : 'text-[#dae6d8]/40'} />
            )}
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#e5efe3]">
              {m === 'credit_card' ? 'Credit Card' : 'Wire Transfer'}
            </span>
          </button>
        ))}
      </div>

      {/* Stripe error */}
      {stripeError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-xs tracking-wide mb-6 flex items-start gap-3 backdrop-blur-md">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>{stripeError}</p>
        </div>
      )}

      {/* Method-specific panel */}
      {method === 'credit_card' ? (
        <div className="bg-[#05160d]/90 p-7 border border-[#00ff87]/30 rounded-2xl space-y-4 shadow-[0_15px_30px_rgba(0,0,0,0.4),0_0_20px_rgba(0,255,135,0.04)] backdrop-blur-xl">
          <div className="flex justify-between items-center border-b border-[#dae6d8]/10 pb-4">
            <h4 className="text-xs uppercase tracking-widest font-bold text-[#e5efe3]">
              Stripe Secure Payment
            </h4>
            <span className="text-[9px] bg-[#00ff87]/15 text-[#00ff87] border border-[#00ff87]/30 px-3 py-1 rounded-full uppercase tracking-widest font-bold shadow-[0_0_10px_rgba(0,255,135,0.2)]">
              Test Mode
            </span>
          </div>
          <p className="text-[11px] text-[#dae6d8]/70 leading-relaxed">
            You will be securely redirected to Stripe Test Checkout to complete your payment. You can
            use standard Stripe test cards (e.g.{' '}
            <code className="text-[#00ff87] bg-black/40 border border-[#00ff87]/20 px-2 py-0.5 rounded font-mono">
              4242 4242 4242 4242
            </code>
            ) on the checkout page.
          </p>
          <div className="grid grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <span className="text-[#dae6d8]/50 block text-[9px] uppercase tracking-widest font-semibold">
                Transaction Type
              </span>
              <span className="font-bold text-[#e5efe3]">Reservation Deposit</span>
            </div>
            <div>
              <span className="text-[#dae6d8]/50 block text-[9px] uppercase tracking-widest font-semibold">
                Immediate Charge
              </span>
              <span className="font-bold text-[#00ff87] text-base">${depositRequired.toLocaleString()}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#05160d]/90 p-7 border border-[#dae6d8]/15 rounded-2xl space-y-4 shadow-xl backdrop-blur-xl">
          <h4 className="text-xs uppercase tracking-widest font-bold text-[#e5efe3]">
            Obsidian Wire Instructions
          </h4>
          <div className="grid grid-cols-2 gap-4 text-xs">
            {[
              ['Bank Name', 'Sovereign Prestige Bank'],
              ['Routing Number', '021000021'],
              ['Account Number', '8888-00911-305'],
              ['Reference Code', `OBS-${fullName.slice(0, 3).toUpperCase() || 'BUILD'}`],
            ].map(([label, value]) => (
              <div key={label}>
                <span className="text-[#dae6d8]/50 block text-[9px] uppercase tracking-widest font-semibold">
                  {label}
                </span>
                <span
                  className={`font-bold ${label === 'Reference Code' ? 'text-[#00ff87]' : 'text-[#e5efe3]'}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#dae6d8]/50 leading-relaxed pt-2 border-t border-[#dae6d8]/10">
            Please trigger the transfer within 24 hours. Your allocation slot is temporarily locked
            pending confirmation.
          </p>
        </div>
      )}

      {/* Legal note */}
      <div className="bg-[#00ff87]/5 border-l-2 border-[#00ff87] border-y border-r border-y-[#00ff87]/10 border-r-[#00ff87]/10 p-6 flex gap-4 mt-8 rounded-r-2xl backdrop-blur-md">
        <Info size={20} className="text-[#00ff87] shrink-0 mt-0.5" />
        <p className="text-[11px] text-[#dae6d8]/70 leading-relaxed">
          By selecting &apos;Secure Allocation&apos;, you agree to our terms of premium delivery and
          vehicle reservation. A ${depositRequired.toLocaleString()} non-refundable deposit will be
          charged to secure your build slot allocation.
        </p>
      </div>

      {/* Submit row */}
      <div className="mt-8 flex gap-4">
        {useMock && (
          <button
            type="button"
            onClick={onExitMock}
            className="px-6 border border-red-500/30 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500/10 transition-all active:scale-[0.98] cursor-pointer font-bold text-xs uppercase tracking-wider"
          >
            Exit Preview
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-[#00ff87] to-[#00df76] text-[#050e0a] py-5 rounded-xl flex items-center justify-center gap-3 text-xs uppercase tracking-[0.3em] font-bold hover:brightness-110 active:scale-[0.99] transition-all duration-300 shadow-[0_0_35px_rgba(0,255,135,0.25)] hover:shadow-[0_0_50px_rgba(0,255,135,0.4)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <CarWheelLoader size={16} color="#050e0a" />
              Locking Slot Allocation...
            </>
          ) : (
            <>
              Secure Allocation <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </section>
  );
}
