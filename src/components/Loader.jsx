const Loader = () => {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: "18px",
				padding: "44px 0",
				flexWrap: "wrap",
			}}
		>
			<style>{`
        @keyframes bar-bounce {
          0%, 100% { transform: scaleY(0.4); opacity: 0.3; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
        .bar {
          width: 2.5px;
          border-radius: 2px;
          background: #f97316;
          transform-origin: bottom;
          animation: bar-bounce 1.1s ease-in-out infinite;
        }
      `}</style>

			<div
				style={{
					display: "flex",
					alignItems: "flex-end",
					gap: "3px",
					height: "28px",
					flexShrink: 0,
				}}
			>
				{[12, 20, 16, 26, 18, 26, 16, 20, 12].map((h, i) => (
					<div
						key={i}
						className="bar"
						style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
					/>
				))}
			</div>

			<div>
				<p
					style={{
						fontSize: "14px",
						fontWeight: 500,
						color: "#e4e4e7",
						marginBottom: "3px",
						fontFamily: "'Instrument Sans', sans-serif",
					}}
				>
					Analyzing repository
				</p>
				<p
					style={{
						fontSize: "12px",
						color: "#52525b",
						fontFamily: "'JetBrains Mono', monospace",
					}}
				>
					reading source files · generating docs...
				</p>
			</div>
		</div>
	);
};

export default Loader;
