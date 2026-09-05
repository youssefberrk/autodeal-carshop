"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, Car } from "lucide-react";
import { useCarStore } from "@/store/useCarStore";
import CarWheelLoader from "@/components/ui/CarWheelLoader";
import { Order } from "@/types/Order";
import OrderCard from "./_components/OrderCard";
import OrderDetailModal from "./_components/OrderDetailModal";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const { currentOrder, removeOrder } = useCarStore();
  const router = useRouter();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Redirect to login if unauthenticated
  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#050e0a] text-[#dae6d8] flex items-center justify-center font-['Manrope']">
        <CarWheelLoader text="Retrieving order history..." size={72} />
      </div>
    );
  }

  const userEmail = session?.user?.email?.toLowerCase();
  const rawOrders: Order[] = Array.isArray(currentOrder)
    ? currentOrder
    : currentOrder
      ? [currentOrder as unknown as Order]
      : [];

  const orders = rawOrders
    .filter(
      (order: Order) =>
        !order.shippingAddress?.email ||
        order.shippingAddress.email.toLowerCase() === userEmail,
    )
    .slice()
    .reverse();

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  const handleRemoveOrder = (orderId: string) => {
    removeOrder(orderId);
  };

  return (
    <div className="min-h-screen bg-[#050e0a] text-[#e5efe3] font-['Manrope'] py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Studio Background Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,135,0.06)_0%,transparent_70%)] blur-3xl"
      />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        {/* Header banner */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dae6d8]/10 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#00ff87] font-bold mb-2 flex items-center gap-2 font-['Orbitron']">
              <Sparkles size={13} aria-hidden="true" />
              Client Concierge Portal
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-['Newsreader'] italic font-bold tracking-tight text-[#e5efe3]">
              Bespoke Order Dossiers
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00ff87] bg-[#00ff87]/10 px-4 py-2 rounded-full border border-[#00ff87]/25 font-['Orbitron'] shadow-[0_0_15px_rgba(0,255,135,0.1)]">
              <ShieldCheck size={14} />
              {orders.length}{" "}
              {orders.length === 1 ? "Active Order" : "Active Orders"}
            </span>
          </div>
        </header>

        {/* Orders List or Empty Showroom State */}
        {orders.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-[#dae6d8]/10 bg-gradient-to-b from-[#091b12]/95 via-[#06140d]/90 to-[#030b07]/95 p-12 sm:p-16 text-center shadow-[0_20px_50px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,135,0.05)_0%,transparent_70%)]"
            />
            <div className="relative z-10 max-w-md mx-auto space-y-5">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-[#00ff87]/10 border border-[#00ff87]/30 flex items-center justify-center text-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.15)]">
                <Car size={36} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-['Newsreader'] italic text-[#e5efe3]">
                No Active Vehicle Allocations
              </h2>
              <p className="text-xs sm:text-sm text-[#dae6d8]/60 leading-relaxed">
                You have no active vehicle reservations. Explore our catalog of
                hypercars and luxury automobiles to configure your next
                allocation.
              </p>
              <button
                type="button"
                onClick={() => router.push("/shop")}
                className="inline-flex items-center gap-2 bg-[#00ff87] hover:bg-[#00e077] text-[#030b07] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-200 shadow-[0_0_25px_rgba(0,255,135,0.25)] active:scale-[0.98] cursor-pointer font-['Orbitron']"
              >
                <span>Explore Showcase</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
                onRemoveOrder={handleRemoveOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* Comprehensive Order Detail Dossier Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isDetailModalOpen}
        onClose={handleCloseModal}
        onRemoveOrder={handleRemoveOrder}
      />
    </div>
  );
};

export default OrdersPage;
