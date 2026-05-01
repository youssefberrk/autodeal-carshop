"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ManufacturerDropdownProps {
	brands: string[];
	selectedBrand: string;
	onBrandChange: (brand: string) => void;
}
const ManufacturerDropdown = ({ brands, selectedBrand, onBrandChange }: ManufacturerDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [selectedBrand, setSelectedBrand] = useState("BRANDS");
	// const [selectedBrand, setSelectedBrand] = useState("");

	return (
		<div className="w-full max-w-xs font-['Manrope']">
			<label className="block text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/60 mb-3 font-bold">
				Manufacturers
			</label>

			<div className="relative">
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="w-full flex items-center justify-between px-4 py-4 bg-[#141e16] border border-[#dae6d8]/10 rounded-none text-[#dae6d8] hover:border-[#00ff87]/30 transition-all duration-300 group">
					<span className="text-xs tracking-widest font-bold uppercase">
						{selectedBrand}
					</span>
					<ChevronDown
						className={`w-4 h-4 text-[#00ff87] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
					/>
				</button>

				{isOpen && (
					<div className="absolute z-50 w-full mt-1 bg-[#0c160e] border border-[#dae6d8]/10 shadow-[0px_24px_48px_rgba(0,0,0,0.5)] backdrop-blur-xl">
						<div className="py-1">
							{brands.map((brand) => (
								<button
									key={brand}
									onClick={() => {
										
										onBrandChange(brand);

										setIsOpen(false);
									}}
									className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest transition-colors duration-200 ${
										selectedBrand === brand
											? "text-[#00ff87] bg-[#00ff87]/5"
											: "text-[#dae6d8]/60 hover:text-[#dae6d8] hover:bg-[#dae6d8]/5"
									}`}>
									{brand}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ManufacturerDropdown;
