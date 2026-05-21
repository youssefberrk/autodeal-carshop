import { CarDetailsClientProps } from "@/components/CarDetailsClient";
import { useEffect, useState } from "react";

const PurchaesdCar = ({ car }: CarDetailsClientProps) => {
	// console.log(car);
	const [purchasedCars, setPurchasedCars] = useState([{car}]);
    if (purchasedCars.length > 1){
        setPurchasedCars((prev) => [...prev, {car}])
    }
    // useEffect(() => { ; }, [car]);

	
	console.log(purchasedCars);
	return <div></div>;
};

export default PurchaesdCar;
