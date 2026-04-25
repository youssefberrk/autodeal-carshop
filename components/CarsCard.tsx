import { Cars } from "@/types/Cars";
import { ImageSlider } from "./ui/ImageSlider";

const CarsCard = ({ brand, bodySilhouette, price, carAlbum }: Cars) => {
	return (
		<div className="relative flex flex-col items-center  max-w-2xl">
			<div className="w-[75%]">
				<ImageSlider
					album={[carAlbum.photo1, carAlbum.photo2, carAlbum.photo3]}
				/>
			</div>
			<div className="flex flex-col items-start text-white">
				<h1 className="absolute left-22">{brand}</h1>
				<p>{bodySilhouette}</p>
				<p>{price}$</p>
			</div>
		</div>
	);
};

export default CarsCard;
