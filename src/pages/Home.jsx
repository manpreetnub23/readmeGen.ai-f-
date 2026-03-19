import { useState } from "react";
import { generateReadme } from "../api/generate";
import InputBox from "../components/InputBox";
import ReadmePreview from "../components/ReadmePreview";
import Loader from "../components/Loader";

const Home = () => {
	const [repoUrl, setRepoUrl] = useState("");
	const [readme, setReadme] = useState("");
	const [loading, setLoading] = useState(false);

	const handleGenerate = async () => {
		if (!repoUrl) return;
		try {
			setLoading(true);
			const data = await generateReadme(repoUrl);
			setReadme(data.readme);
		} catch (err) {
			alert("Error generating README");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			style={{
				minHeight: "100vh",
				background: "#0e0e10",
				fontFamily: "'Instrument Sans', 'Helvetica Neue', sans-serif",
			}}
		>
			<style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@300;400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .fade-1 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.05s both; }
        .fade-2 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both; }
        .fade-3 { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both; }

        .glow-amber {
          position: fixed; pointer-events: none;
          width: 700px; height: 500px;
          top: -200px; left: -150px;
          background: radial-gradient(ellipse, rgba(251,146,60,0.07) 0%, transparent 70%);
        }
        .glow-teal {
          position: fixed; pointer-events: none;
          width: 600px; height: 400px;
          bottom: -100px; right: -100px;
          background: radial-gradient(ellipse, rgba(45,212,191,0.05) 0%, transparent 70%);
        }

        .nav-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 40px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .main-inner {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 40px 120px;
        }

        .hero-title {
          font-family: 'Instrument Serif', Georgia, serif;
          font-size: clamp(36px, 6vw, 68px);
          font-weight: 400;
          color: #fafafa;
          line-height: 1.04;
          letter-spacing: -0.025em;
          margin-bottom: 22px;
        }

        .hero-sub {
          font-size: 16px;
          color: #71717a;
          line-height: 1.75;
          max-width: 460px;
          font-weight: 400;
        }

        .badge {
          display: inline-flex; align-items: center; gap: 7px;
          border: 1px solid #2a2a2e;
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 500;
          color: #71717a;
          letter-spacing: 0.05em;
          background: #18181b;
          margin-bottom: 32px;
        }
        .badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #f97316;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        .divider { border: none; border-top: 1px solid #1f1f23; margin: 52px 0; }

        .nav-links { display: flex; gap: 28px; }
        .nav-link {
          font-size: 12px; color: #52525b;
          text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.15s;
        }
        .nav-link:hover { color: #a1a1aa; }

        @media (max-width: 640px) {
          .nav-inner { padding: 0 20px; }
          .nav-links { display: none; }
          .main-inner { padding: 48px 20px 80px; }
          .hero-title { font-size: clamp(32px, 9vw, 48px); }
          .hero-sub { font-size: 14px; }
          .divider { margin: 36px 0; }
        }

        @media (min-width: 641px) and (max-width: 900px) {
          .nav-inner { padding: 0 28px; }
          .main-inner { padding: 60px 28px 100px; }
        }
      `}</style>

			<div className="glow-amber" />
			<div className="glow-teal" />

			{/* Nav */}
			<nav
				style={{
					borderBottom: "1px solid #18181b",
					position: "sticky",
					top: 0,
					zIndex: 50,
					backdropFilter: "blur(12px)",
					background: "rgba(14,14,16,0.85)",
				}}
			>
				<div className="nav-inner">
					<div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<div
							style={{
								width: "20px",
								height: "20px",
								border: "1.5px solid #f97316",
								borderRadius: "4px",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
							}}
						>
							<div
								style={{
									width: "7px",
									height: "7px",
									background: "#f97316",
									borderRadius: "1px",
								}}
							/>
						</div>
						<span
							style={{
								fontSize: "14px",
								fontWeight: 600,
								color: "#fafafa",
								letterSpacing: "-0.01em",
							}}
						>
							readme.ai
						</span>
					</div>
					<div className="nav-links">
						<a className="nav-link" href="#">
							Docs
						</a>
						<a className="nav-link" href="#">
							GitHub
						</a>
					</div>
				</div>
			</nav>

			{/* Main */}
			<div className="main-inner">
				<div className="fade-1" style={{ marginBottom: "52px" }}>
					<div className="badge">
						<div className="badge-dot" />
						AI-powered documentation
					</div>
					<h1 className="hero-title">
						Ship better docs,
						<br />
						<em style={{ color: "#f97316" }}>ten times faster.</em>
					</h1>
					<p className="hero-sub">
						Paste any public GitHub repository URL and get a polished,
						publish-ready README — generated in seconds.
					</p>
				</div>

				<div className="fade-2">
					<InputBox
						repoUrl={repoUrl}
						setRepoUrl={setRepoUrl}
						onGenerate={handleGenerate}
					/>
				</div>

				{loading && (
					<div className="fade-3">
						<Loader />
					</div>
				)}

				{readme && !loading && (
					<div className="fade-3">
						<hr className="divider" />
						<ReadmePreview readme={readme} />
					</div>
				)}
			</div>

			<div
				style={{
					borderTop: "1px solid #18181b",
					padding: "20px 40px",
					textAlign: "center",
				}}
			>
				<span style={{ fontSize: "12px", color: "#3f3f46" }}>
					readme.ai — built for developers
				</span>
			</div>
		</div>
	);
};

export default Home;
