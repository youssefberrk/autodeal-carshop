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
	Key,
	ShoppingCart,
	Calendar,
	CreditCard,
	MapPin,
	Bell,
	Car,
	Trash2,
} from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
	const { data: session, status } = useSession();
	const [activeTab, setActiveTab] = useState("profile");
	const {whishListCars, removeFromWhishList} = useCarStore();

	// If user is not authenticated, redirect to login page
	if (status === "unauthenticated") {
		redirect("/login");
	}
	console.log(status);
	// Show loading state while checking session
	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
					<p>Loading profile...</p>
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
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-8">Your Profile</h1>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* User Info Section */}
					<div className="lg:col-span-1">
						<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
							<div className="flex flex-col items-center">
								{session?.user?.image ? (
									<div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-2 border-emerald-500/30">
										<Image
											src={session.user.image}
											alt={session.user.name || "User"}
											width={96}
											height={96}
											className="object-cover w-full h-full"
										/>
									</div>
								) : (
									<div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 mb-4 flex items-center justify-center border-2 border-emerald-500/30">
										<User size={40} className="text-white" />
									</div>
								)}
								<h2 className="text-2xl font-bold mb-1">
									{session?.user?.name || "User"}
								</h2>
								<p className="text-gray-400 mb-6">{session?.user?.email}</p>

								<div className="w-full space-y-3">
									<div className="flex items-center justify-between py-2 border-b border-gray-700">
										<span className="text-gray-400">Member since</span>
										<span>2024</span>
									</div>
									<div className="flex items-center justify-between py-2 border-b border-gray-700">
										<span className="text-gray-400">Status</span>
										<span className="bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full text-xs">
											Active
										</span>
									</div>
								</div>
							</div>

							<div className="mt-8 space-y-4">
								<button
									onClick={() => signOut({ callbackUrl: "/" })}
									className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 font-medium">
									Sign Out
								</button>
							</div>
						</div>
					</div>

					<div className="lg:col-span-2">
						{/* Profile Navigation */}
						<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl mb-8">
							<div className="flex flex-wrap gap-2 border-b border-gray-700 pb-4 mb-6">
								<Link className="px-4 py-2 rounded-lg bg-emerald-600 text-white flex items-center gap-2"
								href="/"	>
									<User size={16} />
									Profile
								</Link>
								<Link className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 flex items-center gap-2 transition-colors"
								href="/settings">
									<Settings size={16} />
									Settings
								</Link>
								<Link
									className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50 flex items-center gap-2 transition-colors"
									href="/orders">
									<ShoppingBasket size={16} />
									Orders
								</Link>
							</div>

							{/* Profile Content */}
							<div className="mt-4">
								<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
									<User className="text-emerald-500" />
									Personal Information
								</h3>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-gray-700/30 p-5 rounded-xl border border-gray-700/50">
										<h4 className="text-lg font-bold mb-3 flex items-center gap-2">
											<MapPin className="text-emerald-500" />
											Address
										</h4>
										<p className="text-gray-400">No address saved yet</p>
										<button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
											Add Address
										</button>
									</div>

									<div className="bg-gray-700/30 p-5 rounded-xl border border-gray-700/50">
										<h4 className="text-lg font-bold mb-3 flex items-center gap-2">
											<CreditCard className="text-emerald-500" />
											Payment Methods
										</h4>
										<p className="text-gray-400">No payment methods saved</p>
										<button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
											Add Payment Method
										</button>
									</div>

									<div className="bg-gray-700/30 p-5 rounded-xl border border-gray-700/50">
										<h4 className="text-lg font-bold mb-3 flex items-center gap-2">
											<Bell className="text-emerald-500" />
											Notifications
										</h4>
										<p className="text-gray-400">Email notifications enabled</p>
										<button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
											Manage Settings
										</button>
									</div>

									<div className="bg-gray-700/30 p-5 rounded-xl border border-gray-700/50">
										<h4 className="text-lg font-bold mb-3 flex items-center gap-2">
											<Heart className="text-emerald-500" />
											Wishlist
										</h4>
										<p className="text-gray-400">
											No items in your wishlist yet
										</p>
										<button className="mt-3 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
											Browse Cars
										</button>
									</div>
								</div>
							</div>
						</div>

						
						

						{/* Virtual Garage */}
						<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl">
							<h3 className="text-xl font-bold mb-6 flex items-center gap-2">
								<Car className="text-emerald-500" />
								Virtual Garage
							</h3>

							<div className="flex flex-wrap gap-4 mb-6">
								<button
									className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
										activeTab === "profile"
											? "bg-emerald-600 text-white"
											: "text-gray-400 hover:text-white hover:bg-gray-700/50"
									}`}
									onClick={() => setActiveTab("profile")}>
									<Heart size={16} />
									Wishlist ({whishListCars?.length > 0 ? whishListCars.length: 0})
								</button>
								<button
									className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
										activeTab === "garage"
											? "bg-emerald-600 text-white"
											: "text-gray-400 hover:text-white hover:bg-gray-700/50"
									}`}
									onClick={() => setActiveTab("garage")}>
									Purchased ({purchasedCars.length})
								</button>
							</div>

							{activeTab === "profile" ? (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{whishListCars?.length > 0 ? (
										whishListCars?.map((car) => (
											<div
												key={car.id}
												className="bg-gray-700/30 p-4 rounded-xl border border-gray-700/50 flex flex-col sm:flex-row gap-4 relative group">
												<div className="w-full sm:w-1/3">
													<div className="bg-gray-600 rounded-lg overflow-hidden">
														<Image
															src={car.image}
															alt={car.model}
															width={300}
															height={200}
															className="w-full h-32 object-cover"
														/>
													</div>
												</div>
												<div className="flex-1">
													<h4 className="font-bold text-lg mb-1">
														{car.model}
													</h4>
													<p className="text-gray-400 text-sm mb-2">
														{car.brand}
													</p>
													<div className="flex justify-between items-center">
														<span className="text-emerald-400 font-bold">
															${car.price.toLocaleString()}
														</span>
														<span className="absolute top-4 right-2 bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full text-xs">
															{car.badge}
														</span>
													</div>
												</div>
												<button
													onClick={() => removeFromWhishList(car)}
													className="absolute bottom-3 right-3 p-2 rounded-lg bg-gray-800/80 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-gray-700/50 hover:border-red-500/30 transition-all duration-200 cursor-pointer"
													title="Remove from wishlist"
												>
													<Trash2 size={16} />
												</button>
											</div>
										))
									) : (
										<div className="col-span-2 text-center py-8 text-gray-500">
											<p>No cars in your wishlist yet</p>
										</div>
									)}
								</div>
							) : (
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									{purchasedCars.length > 0 ? (
										purchasedCars.map((car) => (
											<div
												key={car.id}
												className="bg-gray-700/30 p-4 rounded-xl border border-gray-700/50 flex flex-col sm:flex-row gap-4">
												<div className="w-full sm:w-1/3">
													<div className="bg-gray-600 rounded-lg overflow-hidden">
														<Image
															src={car.image}
															alt={car.model}
															width={300}
															height={200}
															className="w-full h-32 object-cover"
														/>
													</div>
												</div>
												<div className="flex-1">
													<h4 className="font-bold text-lg mb-1">
														{car.model}
													</h4>
													<p className="text-gray-400 text-sm mb-2">
														{car.brand}
													</p>
													<div className="flex justify-between items-center">
														<span className="text-emerald-400 font-bold">
															${car.price.toLocaleString()}
														</span>
														<span className="bg-emerald-900/30 text-emerald-400 px-2 py-1 rounded-full text-xs">
															{car.badge}
														</span>
													</div>
												</div>
											</div>
										))
									) : (
										<div className="col-span-2 text-center py-8 text-gray-500">
											<p>No cars purchased yet</p>
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
