"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Truck,
  CreditCard,
  Calendar,
  MapPin,
  CheckCircle2,
  Mail,
  ArrowRight,
  Trash2,
  Eye,
  Sparkles,
} from "lucide-react";
import { Order } from "@/types/Order";
import { getValidImageSrc } from "@/lib/utils";

interface OrderCardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
  onRemoveOrder: (orderId: string) => void;
}

export default function OrderCard({
  order,
  onViewDetails,
  onRemoveOrder,
}: OrderCardProps) {
  const userEmail = order.shippingAddress?.email;
  const city = order.shippingAddress?.city;
  const country = order.shippingAddress?.country;

  const handleRemove = () => {
    if (
      confirm(
        `Are you sure you want to mark Order #${order.id} as checked and remove it from your allocation list?`,
      )
    ) {
      onRemoveOrder(order.id);
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-[#dae6d8]/10 bg-gradient-to-b from-[#091b12]/95 via-[#06140d]/90 to-[#030b07]/95 p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_40px_-10px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-300 hover:border-[#00ff87]/30 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8),0_0_30px_rgba(0,255,135,0.1)]">
      {/* Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(0,255,135,0.08)_0%,transparent_70%)] blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-50"
      />

      {/* Top Bar: Badges & ID */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#dae6d8]/10">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff87] font-['Orbitron'] shadow-[0_0_10px_rgba(0,255,135,0.1)]">
              <Sparkles size={11} aria-hidden="true" />
              Dossier #{order.id}
            </span>

            {/* Payment Status Badge */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-['Orbitron'] ${
                order.paymentStatus === "paid"
                  ? "border-[#00ff87]/30 bg-[#00ff87]/15 text-[#00ff87]"
                  : "border-amber-500/30 bg-amber-500/15 text-amber-400"
              }`}
            >
              <CheckCircle2 size={12} />
              {order.paymentStatus === "paid"
                ? "Paid & Allocated"
                : order.paymentStatus}
            </span>

            {/* Confirmation Email Sent Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 font-['Orbitron']">
              <Mail size={12} />
              Confirmation Email Sent
            </span>
          </div>

          <p className="text-xs text-[#dae6d8]/60 flex items-center gap-2 font-medium">
            <Calendar size={13} className="text-[#00ff87]" />
            Placed on:{" "}
            <strong className="text-[#e5efe3]">{order.createdAt}</strong>
          </p>
        </div>

        {/* Price total */}
        <div className="md:text-right">
          <span className="text-[9px] uppercase tracking-widest text-[#00ff87] font-bold block font-['Orbitron'] mb-0.5">
            Total Paid
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-['Newsreader'] italic tracking-tight text-[#00ff87] drop-shadow-[0_0_15px_rgba(0,255,135,0.2)]">
            ${order.totalAmount.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Allocated Vehicles Thumbnails */}
      <div className="relative z-10 py-5 border-b border-[#dae6d8]/10">
        <div className="flex flex-wrap items-center gap-4">
          {order.cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center gap-3 rounded-2xl border border-[#dae6d8]/10 bg-[#040e08]/80 p-2.5 transition-all hover:border-[#00ff87]/30"
            >
              <Link href={`/details/${car.id}`}>
                <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-[#dae6d8]/10 bg-[#020704] p-1">
                  <Image
                    src={getValidImageSrc(car.image)}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    sizes="80px"
                    className="object-contain object-center"
                  />
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#00ff87] font-['Orbitron']">
                    {car.brand}
                  </p>
                  <h4 className="text-sm font-bold font-['Newsreader'] italic text-[#e5efe3]">
                    {car.model}
                  </h4>

                  <div className="flex items-center gap-2 text-[10px] text-[#dae6d8]/70 mt-0.5">
                    <span>Qty: {car.quantity || 1}</span>
                    {car.color && (
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full border border-white/30"
                          style={{ backgroundColor: car.color.hex }}
                        />
                        {car.color.id.replace(/-/g, " ")}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Brief details & Action toolbar */}
      <div className="relative z-10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs text-[#dae6d8]/70">
          <span className="flex items-center gap-1.5">
            <Truck size={14} className="text-[#00ff87]" />
            Concierge Delivery: Free
          </span>
          <span className="flex items-center gap-1.5">
            <CreditCard size={14} className="text-[#00ff87]" />
            Payment Secured
          </span>
          {city && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#00ff87]" />
              {city}
              {country ? `, ${country}` : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-red-400 hover:border-red-500/40 hover:bg-red-500/15 transition-all active:scale-[0.97] cursor-pointer"
          >
            <Trash2 size={13} />
            Check &amp; Remove
          </button>

          <button
            type="button"
            onClick={() => onViewDetails(order)}
            className="flex items-center gap-1.5 rounded-xl border border-[#00ff87]/30 bg-[#00ff87]/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#e5efe3] hover:border-[#00ff87] hover:bg-[#00ff87]/20 hover:text-[#00ff87] transition-all active:scale-[0.97] cursor-pointer shadow-[0_0_12px_rgba(0,255,135,0.1)]"
          >
            <Eye size={13} />
            View Details
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </article>
  );
}
