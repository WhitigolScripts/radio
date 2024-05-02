import "./index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen.ts";
import { StrictMode } from "react";
import Providers from "@/components/providers/providers.tsx";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Providers>
				<RouterProvider router={router} />
			</Providers>
		</StrictMode>,
	);
}
