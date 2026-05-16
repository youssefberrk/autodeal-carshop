export interface Car {
	id: number;
	brand: string;
	model: string;
	price: number;
	image: string;

	badge?: string;
	bodySilhouette?: string;
	specs?: string;
}

export interface Order {
	id: string;
	cars: Car[];
	totalAmount: number;
	paymentStatus: "pending" | "paid" | "failed";
	orderStatus: "processing" | "shipped" | "delivered";
	shippingAddress?: ShippingAddress;
	createdAt: string;
}

export interface ShippingAddress {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
}

export interface CarStore {
	allocatedCars: Car[];
	purchasedCars: Car[];
	currentOrder: Order | null;

	addToAllocation: (car: Car) => void;
	removeFromAllocation: (carId: number) => void;
	addToPurchased: (car: Car) => void;
	setCurrentOrder: (order: Order) => void;
	clearAllocation: () => void;
}
