import { featuredCars } from "@/types/CarsTypes";
import { ImageSlider } from "@/components/ui/ImageSlider";

const FeaturedCard = ({ album, model, info, price }: featuredCars) => {
	return (
		<div className="w-full max-w-xl">
			<div>
				<ImageSlider album={[album.photo1, album.photo2, album.photo3]} />
			</div>
			<div className="text-white">
				<h1>{model}</h1>
				<p>{info}</p>
				<p>{price}</p>
			</div>
		</div>
	);
};

export default FeaturedCard;
