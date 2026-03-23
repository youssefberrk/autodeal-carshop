export default function Logo() {
	return (
		<div className="flex items-center gap-2 hover:scale-105 transition">
			{/* Icon */}
			<svg
				width="28"
				height="28"
				viewBox="0 0 24 24"
				fill="none"
				className="text-green-400">
				<path
					d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
					fill="currentColor"
				/>
			</svg>

			{/* Text */}
			<h1 className="text-2xl font-bold tracking-wide">
				<span className="text-white">AUTO</span>
				<span className="text-green-400"> DEAL</span>
			</h1>
		</div>
	);
}
