import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car, Order, CarStore } from "@/types/Order";

export const useCarStore = create<CarStore>()(
	persist(
		(set) => ({
			allocatedCars: [],
			purchasedCars: [],
			wishlistCars: [],
			notifications: [],
			quant: 1,
			currentOrder: [],
			isPopUp: false,
			isPurchasedPopUp: false,

			addToAllocation: (car: Car) => {
				let wasAdded = false;

				set((state) => {
					const exists = state.allocatedCars.some((c) => c.id === car.id);

					if (exists) return state;

					wasAdded = true;

					return {
						isPurchasedPopUp: true,
						allocatedCars: [
							...state.allocatedCars,
							{
								...car,
								quantity: car.quantity || 1,
								color: car.color,
							},
						],
					};
				});

				if (wasAdded) {
					setTimeout(() => {
						set({ isPurchasedPopUp: false });
					}, 2000);
				}
			},

			removeFromAllocation: (carId: number) =>
				set((state) => ({
					allocatedCars: state.allocatedCars.filter((c) => c.id !== carId),
				})),

			addToPurchased: (car: Car) =>
				set((state) => ({
					purchasedCars: [...state.purchasedCars, car],
				})),

			addToWishlist: (car: Car) => {
				let exists = false;
				set((state) => {
					exists = state.wishlistCars.some((c) => c.id === car.id);
					if (exists) return state;

					return {
						wishlistCars: [...state.wishlistCars, car],
						isPopUp: true,
						notifications: [
							...state.notifications,
							{
								id: Math.random().toString(36).substring(2, 9),
								message: "Added successfully to your wish list",
								type: "add",
							},
						],
					};
				});

				if (!exists) {
					setTimeout(() => {
						set({ isPopUp: false });
					}, 2000);
				}
			},

			removeFromWishlist: (car: Car) =>
				set((state) => ({
					wishlistCars: state.wishlistCars.filter((c) => c.id !== car.id),
					notifications: [
						...state.notifications,
						{
							id: Math.random().toString(36).substring(2, 9),
							message: "Removed from your wish list",
							type: "remove",
						},
					],
				})),

			addNotification: (message: string, type: "add" | "remove") =>
				set((state) => ({
					notifications: [
						...state.notifications,
						{ id: Math.random().toString(36).substring(2, 9), message, type },
					],
				})),

			removeNotification: (id: string) =>
				set((state) => ({
					notifications: state.notifications.filter((n) => n.id !== id),
				})),

			setCurrentOrder: (order: Order) =>
				set((state) => {
					const currentOrders = Array.isArray(state.currentOrder)
						? state.currentOrder
						: state.currentOrder
							? [state.currentOrder as unknown as Order]
							: [];
					const exists = currentOrders.some((o) => o.id === order.id);
					if (exists) return state;
					return {
						currentOrder: [...currentOrders, order],
					};
				}),

			removeOrder: (orderId: string) =>
				set((state) => {
					const currentOrders = Array.isArray(state.currentOrder)
						? state.currentOrder
						: state.currentOrder
							? [state.currentOrder as unknown as Order]
							: [];
					return {
						currentOrder: currentOrders.filter((o) => o.id !== orderId),
					};
				}),

			clearAllocation: () =>
				set(() => ({
					allocatedCars: [],
				})),
			quantityChosen: (quantity: number, carId?: number) =>
				set((state) => {
					const updatedAllocatedCars =
						carId !== undefined
							? state.allocatedCars.map((c) =>
									c.id === carId ? { ...c, quantity } : c,
								)
							: state.allocatedCars;
					return {
						quant: quantity,
						allocatedCars: updatedAllocatedCars,
					};
				}),
			updateCarColor: (carId: number, color: { id: string; hex: string }) =>
				set((state) => ({
					allocatedCars: state.allocatedCars.map((c) =>
						c.id === carId ? { ...c, color } : c,
					),
				})),
		}),

		// PERSIST CONFIGURATION - saves to localStorage
		{
			name: "car-shop-storage", // name of the item in localStorage
			storage: createJSONStorage(() => localStorage), // use localStorage
			partialize: (state) => ({
				allocatedCars: state.allocatedCars,
				purchasedCars: state.purchasedCars,
				wishlistCars: state.wishlistCars,
				quant: state.quant,
				currentOrder: state.currentOrder,
			}),
		},
	),
);
