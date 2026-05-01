import React from "react";

interface BodySilhouetteParams {
	bodySilhouette: string;
	onBsChange(bodySilhouette: string): void;
}
const BodySilhouette = ({
	bodySilhouette,
	onBsChange,
}: BodySilhouetteParams) => {
	return (
		<div>
			
				<p>Body Silhouette</p>
				<button className="cursor-pionter" onClick={() => onBsChange("All")}>All</button>
				<button className="cursor-pionter" onClick={() => onBsChange("Coupe")}>Coupe</button>
				<button className="cursor-pionter" onClick={() => onBsChange("Electric")}>Electric</button>
				<button className="cursor-pionter" onClick={() => onBsChange("Performance")}>Performance</button>
				<button className="cursor-pionter" onClick={() => onBsChange("SUV")}>SUV</button>
			
		</div>
	);
};

export default BodySilhouette;
