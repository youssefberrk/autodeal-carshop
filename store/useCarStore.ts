import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Car, Order, CarStore } from '@/types/Order';

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
     
      allocatedCars: [],
      purchasedCars: [],
      currentOrder: null,

     
      addToAllocation: (car: Car) => 
        set((state) => {
          // Check if car already exists to avoid duplicates
          const exists = state.allocatedCars.find((c) => c.id === car.id);
          if (exists) return state;
          
          return {
            allocatedCars: [...state.allocatedCars, car],
          };
        }),

     
      removeFromAllocation: (carId: number) =>
        set((state) => ({
          allocatedCars: state.allocatedCars.filter((c) => c.id !== carId),
        })),

     
      addToPurchased: (car: Car) =>
        set((state) => ({
          purchasedCars: [...state.purchasedCars, car],
        })),

    
      setCurrentOrder: (order: Order) =>
        set(() => ({
          currentOrder: order,
        })),

    
      clearAllocation: () =>
        set(() => ({
          allocatedCars: [],
        })),
    }),
    
    // PERSIST CONFIGURATION - saves to localStorage
    {
      name: 'car-shop-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);