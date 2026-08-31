import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Car } from '@/types/Order';

interface OrderSuccessModalProps {
  isOpen: boolean;
  createdOrderId: string;
  fullName: string;
  email: string;
  displayCars: Car[];
  city: string;
  stateName: string;
  displayTotal: number;
  onClose: () => void;
  onViewOrderHistory: () => void;
  onReturnToShowroom: () => void;
}

export default function OrderSuccessModal({
  isOpen,
  createdOrderId,
  fullName,
  email,
  displayCars,
  city,
  stateName,
  displayTotal,
  onClose,
  onViewOrderHistory,
  onReturnToShowroom,
}: OrderSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl animate-in font-['Manrope'] p-6">
      <div className="max-w-xl w-full border border-[#00ff87]/30 bg-[#050e0a]/95 p-10 rounded-2xl shadow-[0_0_80px_rgba(0,255,135,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-[#00ff87] to-teal-500" />
        
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#00ff87]/10 border border-[#00ff87]/30 rounded-full flex items-center justify-center text-[#00ff87] mb-6">
            <CheckCircle2 size={32} />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-['Newsreader'] italic font-bold tracking-tight mb-2 text-[#e5efe3]">
            Reservation Secured
          </h2>
          <p className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-6">
            Allocation Slot ID: {createdOrderId}
          </p>
          
          <p className="text-sm text-[#dae6d8]/60 leading-relaxed mb-8 max-w-md">
            Congratulations, {fullName}. Your allocation has been secured with premium delivery services. A confirmation email and vehicle configuration specs have been dispatched to <span className="text-[#e5efe3] font-bold">{email}</span>.
          </p>

          {/* Order breakdown */}
          <div className="w-full bg-[#091a11] border border-[#dae6d8]/5 p-6 rounded-xl text-left space-y-4 mb-8">
            <div className="border-b border-[#dae6d8]/5 pb-3">
              <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Vehicles Locked</span>
              <div className="space-y-1">
                {displayCars.map((car, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <p className="text-sm font-bold text-[#e5efe3]">{car.brand} {car.model}</p>
                    <p className="text-[10px] text-[#00ff87] font-bold">
                      {(car.quantity || 1) > 1 ? `x${car.quantity}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Delivery Destination</span>
                <p className="text-xs font-bold text-[#e5efe3] truncate">{city}, {stateName || "USA"}</p>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest text-[#dae6d8]/40 mb-1">Total Guarantee</span>
                <p className="text-xs font-bold text-[#00ff87]">${displayTotal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => {
                onClose();
                onViewOrderHistory();
              }}
              className="flex-1 bg-[#dae6d8]/10 border border-[#dae6d8]/10 text-[#dae6d8] py-4 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#dae6d8]/15 active:scale-[0.98] transition-all"
            >
              View Order History
            </button>
            <button 
              onClick={() => {
                onClose();
                onReturnToShowroom();
              }}
              className="flex-1 bg-[#00ff87] text-[#050e0a] py-4 rounded-lg text-xs uppercase tracking-[0.2em] font-bold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,255,135,0.2)]"
            >
              Return to Showroom
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
