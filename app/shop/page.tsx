import Image from "next/image";
import Gclass from "@/public/cars/shop-featured/g1.jpg";

const page = () => {

    const featuredCard = ({ photo, model, info, price}) => {
        return (
            <div>
                <div>
                    <Image
                    src={photo} />
                </div>
                <div>
                    <h1>{model}</h1>
                    <p>{info}</p>
                    <p>{price}</p>
                </div>
            </div>
        )

    }
	return (
		<div>
			<div className="relative flex items-center justify-center w-full">
				<Image src={Gclass} alt="G-class" fit className="w-full opacity-70" />
				<div className="absolute left-1 md:left-4 bottom-0 md:bottom-4 space-y-2 md:space-y-3.5 ">
					<h1 className="md:text-7xl text-xl newsreader font-bold text-gray-200">Luxury Cars</h1>
					<p className="text-green-300 body text-xs md:text-xl md:w-[70%]">
						Explore 100+ luxury cars, supercars and exotic cars for sale
						worldwide in one simple search
					</p>
				</div>
			</div>
            <div className="py-12 mx-12">
                <h1 className="text-center text-white md:text-5xl heading font-bold">Featured</h1>
            </div>
		</div>
	);
};

export default page;
