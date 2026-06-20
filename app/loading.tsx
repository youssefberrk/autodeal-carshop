import React from "react";
import CarWheelLoader from "@/components/ui/CarWheelLoader";

export default function Loading() {
	return (
		<CarWheelLoader
			fullPage
			size={72}
			text="Configuring Showroom..."
		/>
	);
}
