import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ReadmePreview = ({ readme }) => {
	const [copied, setCopied] = useState(false);
	const [view, setView] = useState("preview");

	const handleCopy = () => {
		navigator.clipboard.writeText(readme);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleDownload = () => {
		const blob = new Blob([readme], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "README.md";
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
			<style>{`
        .thin-scroll { scrollbar-width: thin; scrollbar-color: #27272a transparent; }
        .thin-scroll::-webkit-scrollbar { width: 3px; height: 3px; }
        .thin-scroll::-webkit-scrollbar-track { background: transparent; }
        .thin-scroll::-webkit-scrollbar-thumb { background: #27272a; border-radius: 2px; }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .preview-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .file-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-bottom: 1px solid #1f1f23;
          background: #18181b;
          flex-wrap: wrap;
        }

        .file-bar-meta {
          margin-left: auto;
          font-size: 11px;
          color: #3f3f46;
          font-family: 'JetBrains Mono', monospace;
        }

        .tab-btn {
          padding: 5px 14px;
          border-radius: 5px;
          border: none;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Instrument Sans', sans-serif;
          text-transform: capitalize;
        }
        .action-btn {
          padding: 6px 14px;
          border-radius: 5px;
          border: 1.5px solid #27272a;
          background: transparent;
          color: #71717a;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Instrument Sans', sans-serif;
          white-space: nowrap;
        }
        .action-btn:hover { border-color: #3f3f46; color: #a1a1aa; }

        .md-body h1 { font-family: 'Instrument Serif', serif; font-size: 26px; font-weight: 400; color: #fafafa; border-bottom: 1px solid #1f1f23; padding-bottom: 12px; margin: 0 0 18px; }
        .md-body h2 { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 400; color: #f4f4f5; border-bottom: 1px solid #1f1f23; padding-bottom: 8px; margin: 32px 0 14px; }
        .md-body h3 { font-size: 14px; font-weight: 600; color: #e4e4e7; text-transform: uppercase; letter-spacing: 0.06em; margin: 24px 0 10px; }
        .md-body p  { font-size: 14px; color: #71717a; line-height: 1.8; margin: 0 0 14px; }
        .md-body ul, .md-body ol { padding-left: 20px; margin: 0 0 14px; }
        .md-body li { font-size: 14px; color: #71717a; line-height: 1.8; margin-bottom: 4px; }
        .md-body code { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #2dd4bf; background: rgba(45,212,191,0.08); padding: 2px 7px; border-radius: 4px; border: 1px solid rgba(45,212,191,0.15); }
        .md-body pre { background: #111113; border: 1px solid #27272a; border-radius: 8px; padding: 20px; overflow-x: auto; margin: 0 0 18px; scrollbar-width: none; }
        .md-body pre::-webkit-scrollbar { display: none; }
        .md-body pre code { background: none; border: none; padding: 0; font-size: 13px; color: #a1a1aa; }
        .md-body a { color: #f97316; text-decoration: none; border-bottom: 1px solid rgba(249,115,22,0.3); }
        .md-body strong { color: #e4e4e7; font-weight: 600; }
        .md-body blockquote { border-left: 2px solid #f97316; padding: 4px 0 4px 18px; margin: 16px 0; color: #52525b; }
        .md-body hr { border: none; border-top: 1px solid #1f1f23; margin: 28px 0; }

        .md-body table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
          display: table;
        }
        .md-body thead tr {
          background: #18181b;
        }
        .md-body th {
          color: #a1a1aa;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          padding: 10px 16px;
          border: 1px solid #27272a;
          text-align: left;
          font-weight: 600;
          white-space: nowrap;
        }
        .md-body td {
          color: #71717a;
          padding: 10px 16px;
          border: 1px solid #1f1f23;
          line-height: 1.6;
          vertical-align: top;
        }
        .md-body tbody tr:hover td {
          background: rgba(255,255,255,0.02);
        }
        .md-body tbody tr:last-child td {
          border-bottom: 1px solid #27272a;
        }

        @media (max-width: 480px) {
          .preview-header { flex-direction: column; align-items: flex-start; }
          .file-bar-meta { display: none; }
          .md-body h1 { font-size: 22px; }
          .md-body h2 { font-size: 18px; }
        }
      `}</style>

			{/* Header */}
			<div className="preview-header">
				<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
					<span
						style={{
							fontSize: "11px",
							fontWeight: 600,
							letterSpacing: "0.08em",
							textTransform: "uppercase",
							color: "#3f3f46",
						}}
					>
						Output
					</span>
					<span
						style={{
							fontFamily: "'JetBrains Mono', monospace",
							fontSize: "11px",
							color: "#2dd4bf",
							background: "rgba(45,212,191,0.08)",
							border: "1px solid rgba(45,212,191,0.15)",
							borderRadius: "4px",
							padding: "2px 10px",
						}}
					>
						README.md
					</span>
				</div>

				<div className="preview-actions">
					<div
						style={{
							display: "flex",
							background: "#18181b",
							border: "1px solid #27272a",
							borderRadius: "7px",
							padding: "3px",
							gap: "2px",
						}}
					>
						{["preview", "raw"].map((tab) => (
							<button
								key={tab}
								className="tab-btn"
								onClick={() => setView(tab)}
								style={{
									background: view === tab ? "#27272a" : "transparent",
									color: view === tab ? "#fafafa" : "#52525b",
								}}
							>
								{tab}
							</button>
						))}
					</div>

					<button
						className="action-btn"
						onClick={handleCopy}
						style={copied ? { borderColor: "#f97316", color: "#f97316" } : {}}
					>
						{copied ? "Copied!" : "Copy"}
					</button>

					<button className="action-btn" onClick={handleDownload}>
						Download
					</button>
				</div>
			</div>

			{/* Box */}
			<div
				style={{
					border: "1px solid #27272a",
					borderRadius: "10px",
					overflow: "hidden",
					background: "#111113",
				}}
			>
				<div className="file-bar">
					<div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
						{["#ff5f56", "#ffbd2e", "#27c93f"].map((c, i) => (
							<div
								key={i}
								style={{
									width: "10px",
									height: "10px",
									borderRadius: "50%",
									background: c,
									opacity: 0.7,
								}}
							/>
						))}
					</div>
					<span
						style={{
							marginLeft: "8px",
							fontSize: "12px",
							color: "#52525b",
							fontFamily: "'JetBrains Mono', monospace",
						}}
					>
						README.md
					</span>
					<span className="file-bar-meta">
						{readme.split("\n").length} lines · {readme.length} chars
					</span>
				</div>

				{view === "raw" ? (
					<pre
						className="thin-scroll"
						style={{
							margin: 0,
							padding: "28px 24px",
							maxHeight: "580px",
							overflowY: "auto",
							overflowX: "auto",
							fontSize: "13px",
							lineHeight: 1.8,
							color: "#71717a",
							fontFamily: "'JetBrains Mono', monospace",
							whiteSpace: "pre-wrap",
							wordBreak: "break-word",
							background: "#111113",
						}}
					>
						{readme}
					</pre>
				) : (
					<div
						className="thin-scroll md-body"
						style={{
							maxHeight: "580px",
							overflowY: "auto",
							padding: "28px 24px",
							fontFamily: "'Instrument Sans', sans-serif",
						}}
					>
						<ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
					</div>
				)}
			</div>

			<p
				style={{
					fontSize: "11px",
					color: "#2d2d30",
					textAlign: "right",
					marginTop: "10px",
				}}
			>
				Review carefully before publishing
			</p>
		</div>
	);
};

export default ReadmePreview;
