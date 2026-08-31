import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { carsData } from "@/public/cars/CarsData"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getValidImageSrc(img: any, carId?: number): string {
  if (carId !== undefined) {
    const foundCar = carsData.find((c) => c.id === Number(carId));
    if (foundCar) {
      if (foundCar.image) {
        return foundCar.image;
      }
      if (foundCar.carAlbum?.photo1) {
        return foundCar.carAlbum.photo1;
      }
    }
  }

  let resolved: string | undefined;

  if (typeof img === "string" && img.trim().length > 0 && img !== "/edited.png") {
    resolved = img.trim();
  } else if (typeof img === "object" && typeof img.src === "string" && img.src.trim().length > 0) {
    resolved = img.src.trim();
  }

  return resolved || "/edited.png";
}
