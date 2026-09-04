"use client";

import Image from "next/image";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Mail,
  Calendar,
  CreditCard,
  Truck,
  MapPin,
  ShieldCheck,
  Printer,
  Trash2,
  Gauge,
  Package,
  Sparkles,
  Clock,
} from "lucide-react";
import { Order } from "@/types/Order";
import { getValidImageSrc } from "@/lib/utils";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onRemoveOrder: (orderId: string) => void;
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onRemoveOrder,
}: OrderDetailModalProps) {
  if (!isOpen || !order) return null;

  const subtotal = order.cars.reduce(
    (sum, car) => sum + car.price * (car.quantity || 1),
    0,
  );
  const customConfig = Math.round(subtotal * 0.1);
  const deliveryFee = order.cars.length > 0 ? 1650 : 0;

  const handlePrint = () => {
    window.print();
  };

  const handleRemove = () => {
    if (
      confirm(
        `Are you sure you want to remove Order #${order.id}? This action will remove it from your allocation history.`,
      )
    ) {
      onRemoveOrder(order.id);
      onClose();
    }
  };

  const timelineSteps = [
    {
      title: "Allocation Reserved",
      desc: `Order #${order.id} placed`,
      date: order.createdAt,
      completed: true,
    },
    {
      title: "Payment Verified",
      desc: "Funds secured & price locked",
      date: order.createdAt,
      completed: order.paymentStatus === "paid",
    },
    {
      title: "Confirmation Email Sent",
      desc: `Dispatched to ${order.shippingAddress?.email || "customer"}`,
      date: order.createdAt,
      completed: true,
    },
    {
      title: "Global Concierge Dispatch",
      desc:
        order.orderStatus === "delivered"
          ? "Vehicle Delivered"
          : order.orderStatus === "shipped"
            ? "En route to delivery destination"
            : "Custom build in preparation",
      date: order.orderStatus === "delivered" ? "Completed" : "In Progress",
      completed: order.orderStatus === "delivered",
      active: order.orderStatus !== "delivered",
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Order details for #${order.id}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto luxury-scrollbar rounded-3xl border border-[#00ff87]/30 bg-gradient-to-b from-[#091f15] via-[#05140c] to-[#020a05] p-6 sm:p-8 text-[#e5efe3] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(0,255,135,0.15)] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Studio Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(0,255,135,0.15)_0%,transparent_70%)] blur-3xl"
        />

        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#dae6d8]/10 pb-5 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00ff87] font-['Orbitron'] shadow-[0_0_12px_rgba(0,255,135,0.15)]">
                <Sparkles size={12} aria-hidden="true" />
                Dossier #{order.id}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-['Orbitron'] ${
                  order.paymentStatus === "paid"
                    ? "border-[#00ff87]/30 bg-[#00ff87]/15 text-[#00ff87]"
                    : "border-amber-500/30 bg-amber-500/15 text-amber-400"
                }`}
              >
                <CheckCircle2 size={12} />
                Paid &amp; Allocated
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-300 font-['Orbitron']">
                <Mail size={12} />
                Email Sent
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-['Newsreader'] italic tracking-tight text-[#e5efe3]">
              Bespoke Order Specification
            </h2>
            <p className="text-xs text-[#dae6d8]/60 flex items-center gap-2 mt-1">
              <Calendar size={13} className="text-[#00ff87]" />
              Allocation Date: {order.createdAt}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#dae6d8]/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dossier modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Vehicles List */}
          <div className="space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#00ff87] font-bold font-['Orbitron'] flex items-center gap-2">
              <Package size={14} /> Allocated Vehicles ({order.cars.length})
            </h3>

            <div className="space-y-3">
              {order.cars.map((car) => {
                const quantity = car.quantity || 1;
                const lineTotal = car.price * quantity;

                return (
                  <div
                    key={car.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#dae6d8]/10 bg-[#040e08]/90 p-4 transition-all hover:border-[#00ff87]/30"
                  >
                    <div className="flex items-center gap-4">
                      <Link href={`/details/${car.id}`}>
                        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-[#dae6d8]/10 bg-[#020704] p-1">
                          <Image
                            src={getValidImageSrc(car.image)}
                            alt={`${car.brand} ${car.model}`}
                            fill
                            sizes="96px"
                            className="object-contain object-center"
                          />
                        </div>

                        <div>
                          <p className="text-[10px] uppercase font-bold tracking-widest text-[#00ff87] font-['Orbitron']">
                            {car.brand}
                          </p>
                          <h4 className="text-lg font-bold font-['Newsreader'] italic text-[#e5efe3]">
                            {car.model}
                          </h4>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#dae6d8]/70">
                            <span className="inline-flex items-center gap-1 rounded bg-[#00ff87]/10 px-2 py-0.5 text-[10px] font-bold text-[#00ff87]">
                              Qty: {quantity}
                            </span>
                            {car.bodySilhouette && (
                              <span className="inline-flex items-center gap-1 text-[11px]">
                                <Gauge size={12} className="text-[#00ff87]" />
                                {car.bodySilhouette}
                              </span>
                            )}
                            {car.color && (
                              <span className="inline-flex items-center gap-1 text-[11px]">
                                <span
                                  className="h-2.5 w-2.5 rounded-full border border-white/30"
                                  style={{ backgroundColor: car.color.hex }}
                                />
                                {car.color.id.replace(/-/g, " ")}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="text-right sm:text-right border-t sm:border-t-0 border-[#dae6d8]/10 pt-2 sm:pt-0">
                      <span className="text-[10px] uppercase tracking-wider text-[#dae6d8]/50 block">
                        Subtotal
                      </span>
                      <span className="text-base font-bold text-[#00ff87] tabular-nums">
                        ${lineTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid layout for Pricing & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Financial Summary */}
            <div className="rounded-2xl border border-[#dae6d8]/10 bg-[#040e08]/90 p-5 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#00ff87] font-bold font-['Orbitron'] flex items-center gap-2">
                <CreditCard size={14} /> Financial Summary
              </h3>

              <div className="space-y-2 text-xs text-[#dae6d8]/80 border-b border-[#dae6d8]/10 pb-3">
                <div className="flex justify-between">
                  <span className="text-[#dae6d8]/60">Subtotal MSRP</span>
                  <span className="font-semibold tabular-nums text-[#e5efe3]">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#dae6d8]/60">
                    Bespoke Custom Config
                  </span>
                  <span className="font-semibold tabular-nums text-[#e5efe3]">
                    ${customConfig.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#dae6d8]/60">
                    Global Delivery &amp; Concierge
                  </span>
                  <span className="font-semibold tabular-nums text-[#e5efe3]">
                    ${deliveryFee.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-1">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#00ff87] font-bold font-['Orbitron'] block">
                    Total Paid &amp; Allocated
                  </span>
                  <span className="text-2xl font-bold font-['Newsreader'] italic text-[#00ff87]">
                    ${order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-2.5 py-1 text-[10px] font-bold text-[#00ff87]">
                    <ShieldCheck size={12} /> Payment Verified
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping & Recipient Details */}
            <div className="rounded-2xl border border-[#dae6d8]/10 bg-[#040e08]/90 p-5 space-y-3">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#00ff87] font-bold font-['Orbitron'] flex items-center gap-2">
                <MapPin size={14} /> Delivery &amp; Recipient Info
              </h3>

              {order.shippingAddress ? (
                <div className="space-y-1.5 text-xs text-[#dae6d8]/80 leading-relaxed">
                  <p className="font-bold text-[#e5efe3] text-sm">
                    {order.shippingAddress.fullName}
                  </p>
                  <p className="flex items-center gap-2 text-[#dae6d8]/70">
                    <Mail size={12} className="text-[#00ff87]" />
                    {order.shippingAddress.email}
                  </p>
                  <p className="flex items-center gap-2 text-[#dae6d8]/70">
                    <Truck size={12} className="text-[#00ff87]" />
                    {order.shippingAddress.phone}
                  </p>
                  <div className="pt-2 border-t border-[#dae6d8]/10 text-[#dae6d8]/70">
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.zipCode}
                    </p>
                    <p className="font-semibold text-[#00ff87] mt-0.5">
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-[#dae6d8]/50 italic">
                  Standard Concierge Delivery Address
                </p>
              )}
            </div>
          </div>

          {/* Timeline Steps */}
          <div className="rounded-2xl border border-[#dae6d8]/10 bg-[#040e08]/90 p-5 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#00ff87] font-bold font-['Orbitron'] flex items-center gap-2">
              <Clock size={14} /> Concierge Status Timeline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              {timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl border p-3 text-xs space-y-1 transition-all ${
                    step.completed
                      ? "border-[#00ff87]/30 bg-[#00ff87]/10 text-[#e5efe3]"
                      : "border-[#dae6d8]/10 bg-[#020704]/60 text-[#dae6d8]/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-['Orbitron'] uppercase tracking-wider text-[#00ff87]">
                      Step {idx + 1}
                    </span>
                    {step.completed ? (
                      <CheckCircle2 size={14} className="text-[#00ff87]" />
                    ) : (
                      <Clock
                        size={14}
                        className="text-amber-400 animate-pulse"
                      />
                    )}
                  </div>
                  <p className="font-bold text-xs text-[#e5efe3] leading-snug">
                    {step.title}
                  </p>
                  <p className="text-[10px] text-[#dae6d8]/60 leading-normal">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#dae6d8]/10 pt-5 mt-6">
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-500/20 transition-all cursor-pointer"
          >
            <Trash2 size={14} /> Remove Order
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl border border-[#dae6d8]/20 bg-[#dae6d8]/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#dae6d8] hover:bg-[#dae6d8]/15 transition-colors cursor-pointer"
            >
              <Printer size={14} /> Print Dossier
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#00ff87]/40 bg-[#00ff87]/15 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#00ff87] hover:bg-[#00ff87]/25 transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,255,135,0.15)]"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
