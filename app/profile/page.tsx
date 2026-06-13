"use client";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { useCarStore } from "@/store/useCarStore";
import {
  Settings,
  ShoppingBasket,
  User,
  Heart,
  CreditCard,
  MapPin,
  Bell,
  Car,
  Trash2,
  UserPen,
} from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const { whishListCars, removeFromWhishList } = useCarStore();

  // If user is not authenticated, redirect to login page
  if (status === "unauthenticated") {
    redirect("/login");
  }

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0c160e] text-[#dae6d8] flex items-center justify-center font-['Manrope']">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ff87] mx-auto mb-4"></div>
          <p className="text-sm uppercase tracking-widest text-[#dae6d8]/60 font-bold">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // Mock data for purchased cars
  const purchasedCars = [
    {
      id: 3,
      model: "BMW i4 M50",
      brand: "BMW",
      price: 70000,
      image: "/cars/bmw/m5-1.jpg",
      badge: "New Arrival",
    },
    {
      id: 4,
      model: "Mercedes EQS 580",
      brand: "Mercedes",
      price: 95000,
      image: "/cars/mercedes/sclass-1.jpg",
      badge: "Eco-Friendly",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c160e] text-[#dae6d8] font-['Manrope'] pb-24 pt-20 relative overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(0,255,135,0.06),transparent_38%),radial-gradient(circle_at_82%_0%,rgba(148,163,184,0.04),transparent_32%)]" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <UserPen size={48} className="text-[#00ff87]" />
          <h1 className="text-5xl font-['Newsreader'] uppercase font-bold tracking-wide text-[#e5efe3]">
            Your Profile
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: User Info Card */}
          <div className="lg:col-span-4">
            <div className="bg-[#141e16]/80 backdrop-blur-md rounded-2xl p-8 border border-[#dae6d8]/10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col items-center">
                {session?.user?.image ? (
                  <div className="w-24 h-24 rounded-full mb-6 overflow-hidden border border-[#00ff87]/30 shadow-[0_0_20px_rgba(0,255,135,0.15)]">
                    <Image
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0c160e] to-[#141e16] mb-6 flex items-center justify-center border border-[#00ff87]/30 shadow-[0_0_20px_rgba(0,255,135,0.15)]">
                    <User size={36} className="text-[#00ff87]" />
                  </div>
                )}
                <h2 className="text-3xl font-['Newsreader'] italic font-bold text-[#e5efe3] mb-2">
                  {session?.user?.name || "User"}
                </h2>
                <p className="text-[#dae6d8]/50 text-sm mb-8">
                  {session?.user?.email}
                </p>

                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-[#dae6d8]/10">
                    <span className="text-[#dae6d8]/40 text-xs uppercase tracking-widest font-bold">
                      Member since
                    </span>
                    <span className="font-bold text-[#e5efe3] text-sm">
                      2024
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-[#dae6d8]/10">
                    <span className="text-[#dae6d8]/40 text-xs uppercase tracking-widest font-bold">
                      Status
                    </span>
                    <span className="bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full border border-red-500/20 text-red-400 hover:bg-red-500/5 py-4 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-bold active:scale-[0.98]"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Garage */}
          <div className="lg:col-span-8 space-y-12">
            {/* Profile Navigation */}
            <div className="bg-[#141e16]/80 backdrop-blur-md rounded-2xl p-8 border border-[#dae6d8]/10 shadow-2xl">
              <div className="flex flex-wrap gap-3 border-b border-[#dae6d8]/10 pb-6 mb-8">
                <Link
                  className="px-5 py-3 rounded-lg bg-[#00ff87] text-[#0c160e] font-bold flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                  href="/"
                >
                  <User size={14} />
                  Profile
                </Link>
                <Link
                  className="px-5 py-3 rounded-lg border border-[#dae6d8]/10 text-[#dae6d8]/60 hover:text-[#e5efe3] hover:bg-[#dae6d8]/5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all"
                  href="/settings"
                >
                  <Settings size={14} />
                  Settings
                </Link>
                <Link
                  className="px-5 py-3 rounded-lg border border-[#dae6d8]/10 text-[#dae6d8]/60 hover:text-[#e5efe3] hover:bg-[#dae6d8]/5 flex items-center gap-2 text-xs uppercase tracking-[0.15em] transition-all"
                  href="/orders"
                >
                  <ShoppingBasket size={14} />
                  Orders
                </Link>
              </div>

              {/* Profile Content */}
              <div>
                <h3 className="text-2xl font-['Newsreader'] italic font-bold mb-6 flex items-center gap-2 text-[#e5efe3]">
                  <User className="text-[#00ff87]" size={20} />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#141e16] p-6 rounded-xl border border-[#dae6d8]/5 hover:border-[#00ff87]/10 transition-all duration-300">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#e5efe3] uppercase tracking-wider">
                      <MapPin className="text-[#00ff87]" size={16} />
                      Address
                    </h4>
                    <p className="text-[#dae6d8]/40 text-sm">
                      No address saved yet
                    </p>
                    <button className="mt-4 text-[#00ff87] hover:text-emerald-300 text-xs uppercase tracking-wider font-bold transition-colors">
                      Add Address
                    </button>
                  </div>

                  <div className="bg-[#141e16] p-6 rounded-xl border border-[#dae6d8]/5 hover:border-[#00ff87]/10 transition-all duration-300">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#e5efe3] uppercase tracking-wider">
                      <CreditCard className="text-[#00ff87]" size={16} />
                      Payment Methods
                    </h4>
                    <p className="text-[#dae6d8]/40 text-sm">
                      No payment methods saved
                    </p>
                    <button className="mt-4 text-[#00ff87] hover:text-emerald-300 text-xs uppercase tracking-wider font-bold transition-colors">
                      Add Payment Method
                    </button>
                  </div>

                  <div className="bg-[#141e16] p-6 rounded-xl border border-[#dae6d8]/5 hover:border-[#00ff87]/10 transition-all duration-300">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#e5efe3] uppercase tracking-wider">
                      <Bell className="text-[#00ff87]" size={16} />
                      Notifications
                    </h4>
                    <p className="text-[#dae6d8]/40 text-sm">
                      Email notifications enabled
                    </p>
                    <button className="mt-4 text-[#00ff87] hover:text-emerald-300 text-xs uppercase tracking-wider font-bold transition-colors">
                      Manage Settings
                    </button>
                  </div>

                  <div className="bg-[#141e16] p-6 rounded-xl border border-[#dae6d8]/5 hover:border-[#00ff87]/10 transition-all duration-300">
                    <h4 className="text-sm font-bold mb-3 flex items-center gap-2 text-[#e5efe3] uppercase tracking-wider">
                      <Heart className="text-[#00ff87]" size={16} />
                      Wishlist
                    </h4>
                    <p className="text-[#dae6d8]/40 text-sm">
                      No items in your wishlist yet
                    </p>
                    <button className="mt-4 text-[#00ff87] hover:text-emerald-300 text-xs uppercase tracking-wider font-bold transition-colors">
                      Browse Cars
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Virtual Garage */}
            <div className="bg-[#141e16]/80 backdrop-blur-md rounded-2xl p-8 border border-[#dae6d8]/10 shadow-2xl">
              <h3 className="text-3xl font-['Newsreader'] italic font-bold mb-6 flex items-center gap-2 text-[#e5efe3]">
                <Car className="text-[#00ff87]" size={24} />
                Virtual Garage
              </h3>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-xs uppercase tracking-wider font-bold transition-all ${
                    activeTab === "profile"
                      ? "bg-[#00ff87] text-[#0c160e] shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                      : "border border-[#dae6d8]/10 text-[#dae6d8]/60 hover:text-[#e5efe3] hover:bg-[#dae6d8]/5"
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  <Heart size={14} />
                  Wishlist (
                  {whishListCars?.length > 0 ? whishListCars.length : 0})
                </button>
                <button
                  className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-xs uppercase tracking-wider font-bold transition-all ${
                    activeTab === "garage"
                      ? "bg-[#00ff87] text-[#0c160e] shadow-[0_0_20px_rgba(0,255,135,0.15)]"
                      : "border border-[#dae6d8]/10 text-[#dae6d8]/60 hover:text-[#e5efe3] hover:bg-[#dae6d8]/5"
                  }`}
                  onClick={() => setActiveTab("garage")}
                >
                  Purchased ({purchasedCars.length})
                </button>
              </div>

              {activeTab === "profile" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {whishListCars?.length > 0 ? (
                    whishListCars?.map((car) => (
                      <div
                        key={car.id}
                        className="bg-[#141e16] p-5 rounded-xl border border-[#dae6d8]/5 flex flex-col sm:flex-row gap-4 relative group hover:border-[#00ff87]/20 transition-all duration-300"
                      >
                        <div className="w-full sm:w-1/3">
                          <div className="bg-[#0c160e] rounded-lg overflow-hidden border border-[#dae6d8]/5 aspect-[4/3] relative">
                            <Image
                              src={car.image}
                              alt={car.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-['Newsreader'] italic font-bold text-xl mb-1 text-[#e5efe3]">
                            {car.model}
                          </h4>
                          <p className="text-[#dae6d8]/50 text-xs mb-3 uppercase tracking-wider">
                            {car.brand}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-[#00ff87] font-bold text-sm font-['Manrope']">
                              ${car.price.toLocaleString()}
                            </span>
                            {car.badge && (
                              <span className="absolute top-4 right-4 bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold">
                                {car.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromWhishList(car)}
                          className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/40 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-gray-700/50 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-[#dae6d8]/30">
                      <p className="text-sm uppercase tracking-wider">
                        No cars in your wishlist yet
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {purchasedCars.length > 0 ? (
                    purchasedCars.map((car) => (
                      <div
                        key={car.id}
                        className="bg-[#141e16] p-5 rounded-xl border border-[#dae6d8]/5 flex flex-col sm:flex-row gap-4 relative hover:border-[#00ff87]/20 transition-all duration-300"
                      >
                        <div className="w-full sm:w-1/3">
                          <div className="bg-[#0c160e] rounded-lg overflow-hidden border border-[#dae6d8]/5 aspect-[4/3] relative">
                            <Image
                              src={car.image}
                              alt={car.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-['Newsreader'] italic font-bold text-xl mb-1 text-[#e5efe3]">
                            {car.model}
                          </h4>
                          <p className="text-[#dae6d8]/50 text-xs mb-3 uppercase tracking-wider">
                            {car.brand}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-[#00ff87] font-bold text-sm font-['Manrope']">
                              ${car.price.toLocaleString()}
                            </span>
                            {car.badge && (
                              <span className="bg-[#00ff87]/10 text-[#00ff87] border border-[#00ff87]/20 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold">
                                {car.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12 text-[#dae6d8]/30">
                      <p className="text-sm uppercase tracking-wider">
                        No cars purchased yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
