import { createRoot } from "react-dom/client";

import Routes from "./Routes";

import "./style.scss";

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<Routes />);
