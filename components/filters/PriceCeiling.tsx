"use client";

import React, { useEffect, useState } from "react";

interface PriceCeilingSliderProps {
	min?: number;
	max?: number;
	step?: number;
	initialValue?: number;

	currency?: string;
	onPriceChange: (value: number) => void;
}

const PriceCeilingSlider: React.FC<PriceCeilingSliderProps> = ({
	min = 60000,
	max = 350000,
	step = 1000,
	initialValue,

	currency = "$",
	onPriceChange,
}) => {
	const start = initialValue ?? min;
	const [value, setValue] = useState<number>(start);

	// Calculate percentage for the custom track fill (0 - 100)
	const percentage = ((value - min) / (max - min)) * 100;

	return (
		<div className="w-full max-w-xs font-['Manrope']">
			<div className="flex justify-between items-end mb-4">
				<label className="text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/60 font-bold">
					Price Floor
				</label>
				<span className="text-xs font-bold text-[#00ff87] tracking-widest">
					{currency}
					{Math.round(value).toLocaleString()}
				</span>
			</div>

			<div className="relative h-6 flex items-center">
				{/* Track Background */}
				<div className="absolute w-full h-[2px] bg-[#dae6d8]/10 rounded-full" />

				{/* Active Track Highlight */}
				<div
					className="absolute h-[2px] bg-[#00ff87] rounded-full shadow-[0_0_8px_rgba(0,255,135,0.4)]"
					style={{ width: `${percentage}%` }}
				/>

				{/* The Slider Input */}
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={value}
					onChange={(e) => {
						const v = parseInt(e.target.value, 10);
						setValue(v);
						onPriceChange(v);
					}}
					className="absolute w-full appearance-none bg-transparent cursor-pointer z-10
            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-[#00ff87]
            [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(0,255,135,0.6)]
            [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:duration-200
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:border-none
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[#00ff87]
            [&::-moz-range-thumb]:shadow-[0_0_12px_rgba(0,255,135,0.6)]"
				/>
			</div>

			<div className="flex justify-between mt-3">
				<span className="text-[9px] uppercase tracking-widest text-[#dae6d8]/40 font-medium">
					{currency}
					{Math.round(min).toLocaleString()}
				</span>
				<span className="text-[9px] uppercase tracking-widest text-[#dae6d8]/40 font-medium">
					{currency}
					{Math.round(max).toLocaleString()}+
				</span>
			</div>
		</div>
	);
};

export default PriceCeilingSlider;
