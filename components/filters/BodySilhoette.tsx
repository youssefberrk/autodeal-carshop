import { CarFront, Cable, Gauge, Car } from "lucide-react";

interface BodySilhouetteParams {
	bodySilhouette: string;
	onBsChange(bodySilhouette: string): void;
}

const BodySilhouette = ({
	bodySilhouette,
	onBsChange,
}: BodySilhouetteParams) => {
	const silhouettes = [
		{ name: "All", icon: null },
		{ name: "Coupe", icon: <CarFront size={20} /> },
		{ name: "Electric", icon: <Cable size={20} /> },
		{ name: "Performance", icon: <Gauge size={20} /> },
		{ name: "SUV", icon: <Car size={20} /> },
	];

	return (
		<div className="py-6 mx-4 w-full">
			<div className="flex flex-col items-start gap-4">
				<p className="text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/60 font-bold mb-2">
					Body Silhouette
				</p>
				<div className="flex flex-col gap-3 w-full">
					{silhouettes.map((s) => (
						<button
							key={s.name}
							className={`flex items-center gap-3 cursor-pointer transition-all duration-200 group ${
								bodySilhouette === s.name ||
								(s.name === "All" &&
									(bodySilhouette === "" || bodySilhouette === "All"))
									? "text-[#00ff87]"
									: "text-[#dae6d8]/60 hover:text-[#dae6d8]"
							}`}
							onClick={() => onBsChange(s.name)}>
							<div
								className={`p-2  transition-colors ${
									bodySilhouette === s.name ||
									(s.name === "All" &&
										(bodySilhouette === "" || bodySilhouette === "All"))
										? "bg-[#00ff87]/10"
										: ""
								}`}>
								{s.icon || (
									<div className="w-5 h-5 flex items-center justify-center text-[10px]">
										A
									</div>
								)}
							</div>
							<p className="uppercase tracking-[0.1em] text-xs">
								{s.name}
							</p>
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default BodySilhouette;
