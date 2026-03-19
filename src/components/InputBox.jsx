const InputBox = ({ repoUrl, setRepoUrl, onGenerate }) => {
	return (
		<div>
			<style>{`
        .input-row {
          display: flex;
          gap: 10px;
          align-items: stretch;
        }
        .repo-input {
          flex: 1;
          min-width: 0;
          background: #18181b;
          border: 1.5px solid #27272a;
          border-radius: 6px;
          padding: 13px 18px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: #e4e4e7;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .repo-input::placeholder { color: #3f3f46; }
        .repo-input:focus {
          border-color: #f97316;
          box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
        }
        .gen-btn {
          padding: 13px 24px;
          border-radius: 6px;
          border: none;
          font-family: 'Instrument Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: all 0.15s;
          white-space: nowrap;
          flex-shrink: 0;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .input-row {
            flex-direction: column;
          }
          .gen-btn {
            width: 100%;
            padding: 13px;
            text-align: center;
          }
        }
      `}</style>

			<label
				style={{
					display: "block",
					fontSize: "11px",
					fontWeight: 600,
					letterSpacing: "0.08em",
					textTransform: "uppercase",
					color: "#52525b",
					marginBottom: "10px",
					fontFamily: "'Instrument Sans', sans-serif",
				}}
			>
				Repository URL
			</label>

			<div className="input-row">
				<input
					type="text"
					value={repoUrl}
					onChange={(e) => setRepoUrl(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && onGenerate()}
					placeholder="https://github.com/username/repository"
					className="repo-input"
				/>
				<button
					onClick={onGenerate}
					disabled={!repoUrl}
					className="gen-btn"
					style={{
						background: repoUrl ? "#f97316" : "#27272a",
						color: repoUrl ? "#fff" : "#52525b",
						cursor: repoUrl ? "pointer" : "not-allowed",
					}}
				>
					Generate README
				</button>
			</div>

			<p
				style={{
					fontSize: "12px",
					color: "#3f3f46",
					marginTop: "8px",
					fontFamily: "'Instrument Sans', sans-serif",
				}}
			>
				Supports public repositories only
			</p>
		</div>
	);
};

export default InputBox;
