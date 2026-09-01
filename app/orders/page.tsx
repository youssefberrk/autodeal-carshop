"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Package,
  Truck,
  CreditCard,
  Calendar,
  MapPin,
  Car,
} from "lucide-react";
import { useCarStore } from "@/store/useCarStore";
import CarWheelLoader from "@/components/ui/CarWheelLoader";
import { Order } from "@/types/Order";

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const { currentOrder } = useCarStore();
  const router = useRouter();

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
  const orders = rawOrders.filter(
    (order: Order) =>
      !order.shippingAddress?.email ||
      order.shippingAddress.email.toLowerCase() === userEmail,
  );

  return (
    <div className="min-h-screen bg-[#050e0a] text-white font-['Manrope']">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Order History</h1>

        {orders.length === 0 ? (
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-12 border border-gray-700/50 shadow-xl text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
              <Package size={32} className="text-emerald-500" />
            </div>
            <h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
            <p className="text-gray-400 max-w-md mx-auto mb-6">
              You haven&apos;t placed any orders yet. When you do, they&apos;ll
              appear here.
            </p>
            <button
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl transition-colors font-medium"
              onClick={() => router.push("/shop")}
            >
              Browse Cars
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-emerald-500/30 transition-colors"
              >
                {/* Header info */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-700">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-100">
                        Order {order.id}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          order.orderStatus === "delivered"
                            ? "bg-emerald-900/30 text-emerald-400"
                            : "bg-amber-900/30 text-amber-400"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                    <p className="text-gray-400 flex items-center gap-2 text-sm">
                      <Calendar size={14} />
                      {order.createdAt}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#00ff87]">
                      ${order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Content info */}
                <div className="pt-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-gray-900 border border-gray-700/30 relative overflow-hidden flex items-center justify-center shrink-0">
                      {order.cars[0]?.image ? (
                        <Image
                          src={order.cars[0].image}
                          alt={`${order.cars[0].brand} ${order.cars[0].model}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <Car size={32} className="text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-200">
                        {order.cars
                          .map(
                            (car) =>
                              `${car.brand} ${car.model}${
                                car.quantity && car.quantity > 1
                                  ? ` (x${car.quantity})`
                                  : ""
                              }`,
                          )
                          .join(", ")}
                      </h4>
                      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <Truck size={14} />
                          Shipping: Free
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CreditCard size={14} />
                          Secure Allocation
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={14} />
                          {order.shippingAddress?.city ||
                            "Delivered to address"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700/50 text-gray-300 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors active:scale-[0.98]">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors active:scale-[0.98]">
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
