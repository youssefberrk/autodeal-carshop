"use client";

import { useState } from "react";

interface PriceCeilingSliderProps {
	min: number;
	max: number;
	step?: number;
	initialValue?: number;
	value?: number;
	currency?: string;
	onPriceChange: (value: number) => void;
}

const PriceCeilingSlider: React.FC<PriceCeilingSliderProps> = ({
	min,
	max,
	step = 1000,
	initialValue,
	value: controlledValue,
	currency = "$",
	onPriceChange,
}) => {
	const initial = controlledValue ?? initialValue ?? min;
	const [value, setValue] = useState<number>(initial);

	const currentValue = controlledValue !== undefined ? controlledValue : value;

	// Calculate percentage for the custom track fill (0 - 100)
	const percentage = max > min ? ((currentValue - min) / (max - min)) * 100 : 0;

	return (
		<div className="w-full max-w-xs font-['Manrope']">
			<div className="flex justify-between items-end mb-4">
				<label className="text-[10px] uppercase tracking-[0.2em] text-[#dae6d8]/60 font-bold">
					Price Ceiling
				</label>
				<span className="text-xs font-bold text-[#00ff87] tracking-widest">
					{currency}
					{Math.round(currentValue).toLocaleString()}
				</span>
			</div>

			<div className="relative h-6 flex items-center">
				{/* Track Background */}
				<div className="absolute w-full h-0.5 bg-[#dae6d8]/10 rounded-full" />

				{/* Active Track Highlight */}
				<div
					className="absolute h-0.5 bg-[#00ff87] rounded-full shadow-[0_0_8px_rgba(0,255,135,0.4)]"
					style={{ width: `${percentage}%` }}
				/>

				{/* The Slider Input */}
				<input
					type="range"
					min={min}
					max={max}
					step={step}
					value={currentValue}
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

