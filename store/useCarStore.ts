import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Car, Order, CarStore } from "@/types/Order";

export const useCarStore = create<CarStore>()(
	persist(
		(set) => ({
			allocatedCars: [],
			purchasedCars: [],
			whishListCars: [],
			notifications: [],
			quant: 1,
			currentOrder: null,
			isPopUp: false,
			isPurchasedPopUp: false,

			addToAllocation: (car: Car) =>{
				let exists = false;
				set((state) => {
					// Check if car already exists to avoid duplicates
					const exists = state.allocatedCars.find((c) => c.id === car.id);
					if (exists) return state;

					return {
						isPurchasedPopUp: true,
						allocatedCars: [...state.allocatedCars, { ...car, quantity: car.quantity || 1, color: car.color }],
					};
					
				})
			
				if (!exists) {
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

			addToWhishList: (car: Car) => {
				let exists = false;
				set((state) => {
					exists = state.whishListCars.some((c) => c.id === car.id);
					if (exists) return state;

					return {
						whishListCars: [...state.whishListCars, car],
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

			removeFromWhishList: (car: Car) =>
				set((state) => ({
					whishListCars: state.whishListCars.filter((c) => c.id !== car.id),
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
				set(() => ({
					currentOrder: order,
				})),

			clearAllocation: () =>
				set(() => ({
					allocatedCars: [],
				})),
			quantityChosen: (quantity: number, carId?: number) =>
				set((state) => {
					const updatedAllocatedCars = carId !== undefined
						? state.allocatedCars.map((c) =>
								c.id === carId ? { ...c, quantity } : c,
						  )
						: state.allocatedCars;
					return {
						quant: quantity,
						allocatedCars: updatedAllocatedCars,
					};
				}),
		}),

		// PERSIST CONFIGURATION - saves to localStorage
		{
			name: "car-shop-storage", // name of the item in localStorage
			storage: createJSONStorage(() => localStorage), // use localStorage
			partialize: (state) => ({
				allocatedCars: state.allocatedCars,
				purchasedCars: state.purchasedCars,
				whishListCars: state.whishListCars,
				quant: state.quant,
				currentOrder: state.currentOrder,
			}),
		},
	),
);
