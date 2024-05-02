import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";

export default function LayoutNavbar() {
	return (
		<nav className="border-r w-52 md:w-72 p-4">
			<div className="flex flex-col space-y-2 text-sm h-full">
				<div className="p-2 bg-zinc-800 rounded-md">Law Enforcement RTO</div>
				<div className="p-2">Fire Rescue RTO</div>
				<div className="p-2">Tactical 1</div>
				<div className="p-2">Tactical 2</div>
				<div className="p-2">... + more</div>
				<Button className="flex flex-row items-center gap-1" size="xs">
					<span>Add</span>
					<IconPlus className="size-4" />
				</Button>
			</div>
		</nav>
	);
}
