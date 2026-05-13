"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ManufacturerDropdownProps {
	brands: string[];
	selectedBrand: string;
	onBrandChange: (brand: string) => void;
}

const ManufacturerDropdown = ({ brands, selectedBrand, onBrandChange }: ManufacturerDropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="dropdown-container" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="dropdown-trigger"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
			>
				<span className="dropdown-value">{selectedBrand}</span>
				<ChevronDown
					className={`dropdown-icon ${isOpen ? "is-open" : ""}`}
					size={16}
				/>
			</button>

			<div className={`dropdown-menu ${isOpen ? "is-open" : ""}`}>
				<div className="dropdown-list">
					{brands.map((brand) => (
						<button
							key={brand}
							onClick={() => {
								onBrandChange(brand);
								setIsOpen(false);
							}}
							className={`dropdown-item ${selectedBrand === brand ? "is-selected" : ""}`}
							role="option"
							aria-selected={selectedBrand === brand}
						>
							<span className="dropdown-item-text">{brand}</span>
							{selectedBrand === brand && (
								<svg className="check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
									<path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							)}
						</button>
					))}
				</div>
			</div>

			<style>{`
				.dropdown-container {
					position: relative;
					width: 100%;
				}

				.dropdown-trigger {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0.875rem 1rem;
					background: rgba(20, 30, 22, 0.8);
					border: 1px solid rgba(218, 230, 216, 0.1);
					border-radius: 0.75rem;
					color: #dae6d8;
					cursor: pointer;
					transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
				}

				.dropdown-trigger:hover {
					border-color: rgba(0, 255, 135, 0.3);
					background: rgba(20, 30, 22, 1);
				}

				.dropdown-value {
					font-family: 'Orbitron', sans-serif;
					font-size: 0.65rem;
					font-weight: 600;
					letter-spacing: 0.1em;
					text-transform: uppercase;
				}

				.dropdown-icon {
					color: rgba(218, 230, 216, 0.4);
					transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), color 0.3s ease;
				}

				.dropdown-icon.is-open {
					color: #00ff87;
					transform: rotate(180deg);
				}

				.dropdown-menu {
					position: absolute;
					top: calc(100% + 8px);
					left: 0;
					right: 0;
					background: rgba(12, 22, 14, 0.95);
					backdrop-filter: blur(20px);
					-webkit-backdrop-filter: blur(20px);
					border: 1px solid rgba(218, 230, 216, 0.08);
					border-radius: 0.75rem;
					overflow: hidden;
					opacity: 0;
					transform: translateY(-8px) scale(0.96);
					visibility: hidden;
					transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
					z-index: 100;
					box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
				}

				.dropdown-menu.is-open {
					opacity: 1;
					transform: translateY(0) scale(1);
					visibility: visible;
				}

				.dropdown-list {
					max-height: 280px;
					overflow-y: auto;
					padding: 0.5rem;
				}

				.dropdown-list::-webkit-scrollbar {
					width: 4px;
				}

				.dropdown-list::-webkit-scrollbar-track {
					background: rgba(218, 230, 216, 0.05);
				}

				.dropdown-list::-webkit-scrollbar-thumb {
					background: rgba(218, 230, 216, 0.2);
					border-radius: 4px;
				}

				.dropdown-item {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0.75rem 1rem;
					background: transparent;
					border: none;
					color: rgba(218, 230, 216, 0.5);
					cursor: pointer;
					transition: all 0.2s ease;
					border-radius: 0.5rem;
				}

				.dropdown-item:hover {
					background: rgba(218, 230, 216, 0.05);
					color: #dae6d8;
				}

				.dropdown-item.is-selected {
					background: rgba(0, 255, 135, 0.08);
					color: #00ff87;
				}

				.dropdown-item-text {
					font-family: 'Orbitron', sans-serif;
					font-size: 0.6rem;
					font-weight: 500;
					letter-spacing: 0.08em;
					text-transform: uppercase;
				}

				.check-icon {
					flex-shrink: 0;
				}

				@media (prefers-reduced-motion: reduce) {
					.dropdown-menu {
						transition: none;
						opacity: 1;
						transform: none;
						visibility: visible;
					}

					.dropdown-icon {
						transition: none;
					}
				}
			`}</style>
		</div>
	);
};

export default ManufacturerDropdown;