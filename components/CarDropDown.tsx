"use client";

import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight } from "lucide-react";
import { useCarStore } from "@/store/useCarStore";

interface CarDropDownProps {
	onClose: () => void;
}

export default function CarDropDown({ onClose }: CarDropDownProps) {
	const { allocatedCars, removeFromAllocation } = useCarStore();

	const totalPrice = allocatedCars.reduce((sum, car) => sum + car.price, 0);

	return (
		<div
			className="absolute right-0 mt-3 w-80 md:w-96 rounded-xl p-4 backdrop-blur-md z-50"
			style={{
				background: "rgba(6, 13, 16, 0.95)",
				border: "1px solid rgba(0, 255, 135, 0.2)",
			}}
		>
			{/* Header */}
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-white font-bold flex items-center gap-2">
					<ShoppingCart size={18} className="text-emerald-400" />
					My Garage
				</h3>
				<button onClick={onClose} className="text-gray-400 hover:text-white">
					<X size={20} />
				</button>
			</div>

			{/* Empty State */}
			{allocatedCars.length === 0 ? (
				<div className="text-center py-8">
					<p className="text-gray-400 mb-4">Your garage is empty</p>
					<Link
						href="/shop"
						className="text-emerald-400 hover:text-emerald-300 text-sm"
						onClick={onClose}
					>
						Browse Cars →
					</Link>
				</div>
			) : (
				<>
					{/* Cars List */}
					<div className="space-y-3 max-h-64 overflow-y-auto">
						{allocatedCars.map((car) => (
							<div
								key={car.id}
								className="flex items-center gap-3 p-2 bg-gray-800/50 rounded-lg"
							>
								<div className="w-16 h-12 relative rounded overflow-hidden">
									<Image
										src={car.image}
										alt={car.model}
										fill
										className="object-cover"
									/>
								</div>
								<div className="flex-1">
									<p className="text-white text-sm font-medium">{car.model}</p>
									<p className="text-emerald-400 text-xs">
										${car.price.toLocaleString()}
									</p>
								</div>
								<button
									onClick={() => removeFromAllocation(car.id)}
									className="text-gray-400 hover:text-red-400 p-1"
								>
									<X size={16} />
								</button>
							</div>
						))}
					</div>

					{/* Total & Checkout */}
					<div className="mt-4 pt-3 border-t border-gray-700">
						<div className="flex justify-between items-center mb-3">
							<span className="text-gray-400">Total:</span>
							<span className="text-white font-bold">
								${totalPrice.toLocaleString()}
							</span>
						</div>
						<Link
							href="/checkout"
							onClick={onClose}
							className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-lg transition-colors"
						>
							Confirm Purchase
							<ArrowRight size={16} />
						</Link>
					</div>
				</>
			)}
		</div>
	);
}