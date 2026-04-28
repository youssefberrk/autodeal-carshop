import { Cars } from "@/types/Cars";
import { carsData } from "@/public/cars/CarsData";
import { ImageSlider } from "@/components/ui/ImageSlider";

interface Props {
	params: Promise<{ id: string }>;
}

const page = async ({ params }: Props) => {
	const { id } = await params;
	const car = carsData.find((c) => c.id === Number(id));

	if (!car) return <div>Car not Found</div>;
	const { brand, bodySilhouette, price, carAlbum } = car;

	return (
		<div className="relative flex flex-col items-center bg-blue-400 w-auto">
			<div className="w-[65%]">
				<ImageSlider
					album={[carAlbum.photo1, carAlbum.photo2, carAlbum.photo3]}
				/>
			</div>
			<div className="flex flex-col items-start text-white">
				<h1 className="absolute left-22">{brand}</h1>
				<p>{bodySilhouette}</p>
				<p>{price}$</p>
				<button>View Details</button>
				<button>Like</button>
			</div>
		</div>
	);
};

export default page;
