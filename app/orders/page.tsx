"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Package, Truck, CreditCard, Calendar, MapPin, Car } from "lucide-react";

const OrdersPage = () => {
	const { data: session, status } = useSession();
	
	// If user is not authenticated, redirect to login page
	if (status === "unauthenticated") {
		redirect('/login');
	}
	
	// Mock order data
	const orders = [
		{
			id: "ORD-001",
			date: "2024-05-10",
			status: "Delivered",
			total: "$85,000",
			car: "Tesla Model S Plaid",
			image: "/cars/tesla-model-s.jpg"
		},
		{
			id: "ORD-002",
			date: "2024-04-22",
			status: "Processing",
			total: "$125,000",
			car: "Porsche Taycan Turbo S",
			image: "/cars/porsche-taycan.jpg"
		},
		{
			id: "ORD-003",
			date: "2024-03-15",
			status: "Delivered",
			total: "$75,500",
			car: "BMW i4 M50",
			image: "/cars/bmw-i4.jpg"
		}
	];
	
	// Show loading state while checking session
	if (status === "loading") {
		return (
			<div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
					<p>Loading orders...</p>
				</div>
			</div>
		);
	}
	
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white">
			<div className="container mx-auto px-4 py-8">
				<h1 className="text-3xl md:text-4xl font-bold mb-8">Order History</h1>
				
				{orders.length === 0 ? (
					<div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-12 border border-gray-700/50 shadow-xl text-center">
						<div className="mx-auto w-16 h-16 rounded-full bg-emerald-900/30 flex items-center justify-center mb-6">
							<Package size={32} className="text-emerald-500" />
						</div>
						<h2 className="text-2xl font-bold mb-3">No Orders Yet</h2>
						<p className="text-gray-400 max-w-md mx-auto mb-6">
							You haven't placed any orders yet. When you do, they'll appear here.
						</p>
						<button className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-xl transition-colors font-medium">
							Browse Cars
						</button>
					</div>
				) : (
					<div className="space-y-6">
						{orders.map((order) => (
							<div key={order.id} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-emerald-500/30 transition-colors">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-700">
									<div>
										<div className="flex flex-wrap items-center gap-3 mb-2">
											<h3 className="text-xl font-bold">Order {order.id}</h3>
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${
												order.status === "Delivered" 
													? "bg-emerald-900/30 text-emerald-400" 
													: "bg-amber-900/30 text-amber-400"
											}`}>
												{order.status}
											</span>
										</div>
										<p className="text-gray-400 flex items-center gap-2">
											<Calendar size={16} />
											{order.date}
										</p>
									</div>
									<div className="text-right">
										<p className="text-2xl font-bold">{order.total}</p>
									</div>
								</div>
								
								<div className="pt-4">
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 rounded-lg bg-gray-700/50 flex items-center justify-center">
											<Car size={32} className="text-emerald-500" />
										</div>
										<div>
											<h4 className="font-bold text-lg">{order.car}</h4>
											<div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
												<span className="flex items-center gap-1">
													<Truck size={16} />
													Shipping: Free
												</span>
												<span className="flex items-center gap-1">
													<CreditCard size={16} />
													Credit Card
												</span>
												<span className="flex items-center gap-1">
													<MapPin size={16} />
													Delivered to your address
												</span>
											</div>
										</div>
									</div>
									
									<div className="flex flex-wrap gap-3 mt-6">
										<button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
											View Details
										</button>
										<button className="px-4 py-2 bg-emerald-900/30 hover:bg-emerald-800/50 text-emerald-400 rounded-lg transition-colors">
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