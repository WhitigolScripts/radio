import { Toaster } from "../ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import FunctionProvider from "./FunctionProvider";

export default function Providers(props: { children: React.ReactNode }) {
	return (
		<>
			<TooltipProvider>
				<Toaster />
				<FunctionProvider />
				<>{props.children}</>
			</TooltipProvider>
		</>
	);
}
