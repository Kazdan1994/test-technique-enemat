import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./themeConfig";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
