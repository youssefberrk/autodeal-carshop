import { carsData } from "@/public/cars/CarsData";
import CarDetailsClient from "@/components/CarDetailsClient";

interface Props {
	params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
	const { id } = await params;
	const car = carsData.find((c) => c.id === Number(id));

	if (!car) return <div>Car not Found</div>;

	return <CarDetailsClient car={car} />;
};

export default page;
