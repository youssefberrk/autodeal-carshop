import type { Metadata } from "next";
import { getCarById } from "@/lib/utils";
import CarDetailsClient from "@/components/CarDetailsClient";

interface Props {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params;
	const car = getCarById(id);

	if (!car) {
		return {
			title: "Car Not Found | AutoDeal",
			description: "The requested vehicle could not be found in our inventory.",
		};
	}

	const carName = `${car.brand} ${car.model || ""}`.trim();
	const formattedPrice = typeof car.price === "number" ? `$${car.price.toLocaleString()}` : car.price;
	const specDetail = car.specs || car.bodySilhouette || "Luxury Vehicle";
	const description = `${carName} — ${specDetail}. Price: ${formattedPrice}. Explore specifications, pricing, and vehicle details on AutoDeal.`;

	return {
		title: `AutoDeal | ${carName} `,
		description,
		openGraph: {
			title: `${carName} | AutoDeal`,
			description,
			images: car.image ? [{ url: car.image, alt: carName }] : [],
		},
		twitter: {
			card: "summary_large_image",
			title: `${carName} | AutoDeal`,
			description,
			images: car.image ? [car.image] : [],
		},
	};
}

const page = async ({ params }: Props) => {
	const { id } = await params;
	const car = getCarById(id);

	if (!car) return <div>Car not Found</div>;

	return <CarDetailsClient car={car} />;
};

export default page;

