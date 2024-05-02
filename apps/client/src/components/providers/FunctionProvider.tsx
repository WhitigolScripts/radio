import { useEffect } from "react";
import { toast } from "sonner";

export default function FunctionProvider() {
	useEffect(() => {
		// Expose functions to the window object
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).toast = toast;
	}, []);

	return null;
}
