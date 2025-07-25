import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CandidatesApp from "./components/CandidatesApp";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<CandidatesApp />
	</StrictMode>
);
