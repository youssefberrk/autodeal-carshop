import { carsData } from "@/public/cars/CarsData";
import { CarSearchFilters } from "@/types/Concierge";

/**
 * Safely extract numeric horsepower from the specs string.
 * Example: "3.8L Twin-Turbo Flat-6, 640 HP" -> 640
 */
function extractHorsepower(specs: string): number | null {
  const match = specs.match(/(\d+)\s*HP/i);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Safely handle price comparison.
 * handles both number and "Price On Request" strings.
 */
function isPriceWithinRange(price: number | string, min?: number, max?: number): boolean {
  const numericPrice = typeof price === "number" ? price : null;

  if (numericPrice === null) {
    // If price is "Price On Request", it's not strictly within a numeric range
    // but we might want to include it if no range is specified.
    return min === undefined && max === undefined;
  }

  if (min !== undefined && numericPrice < min) return false;
  if (max !== undefined && numericPrice > max) return false;

  return true;
}

export function searchCars(filters: CarSearchFilters) {
  return carsData.filter((car) => {
    // Brand filter
    if (filters.brand && !car.brand.toLowerCase().includes(filters.brand.toLowerCase())) {
      return false;
    }

    // Body silhouette filter
    if (filters.bodySilhouette && car.bodySilhouette.toLowerCase() !== filters.bodySilhouette.toLowerCase()) {
      return false;
    }

    // Price filter
    if (!isPriceWithinRange(car.price, filters.minPrice, filters.maxPrice)) {
      return false;
    }

    // Horsepower filter
    if (filters.minHorsepower !== undefined) {
      const hp = extractHorsepower(car.specs || "");
      if (hp === null || hp < filters.minHorsepower) {
        return false;
      }
    }

    // Electric only filter
    if (filters.electricOnly && car.bodySilhouette.toLowerCase() !== "electric") {
      return false;
    }

    // Available only filter
    if (filters.availableOnly && (car.availability ?? 0) <= 0) {
      return false;
    }

    return true;
  }).map((car) => ({
    id: car.id,
    brand: car.brand,
    model: car.model,
    badge: car.badge,
    price: car.price,
    specs: car.specs,
    bodySilhouette: car.bodySilhouette,
    availability: car.availability,
    features: car.features?.map((feature) => `${feature.title}: ${feature.description}`) ?? [],
    colors: car.colors?.map((color) => color.id) ?? [],
  }));
}
