import { createRoot } from "react-dom/client";

import Application from "./Application";

import "./style.scss";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<Application />);
