import { Outlet } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import LayoutNavbar from "@/components/pages/layout/Navbar";
import LayoutHeader from "@/components/pages/layout/Header";

export const Route = createFileRoute("/_layout")({
	component: Layout,
});

function Layout() {
	return (
		<div className="flex flex-col h-screen">
			<LayoutHeader />
			<div className="flex flex-row flex-1">
				<LayoutNavbar />
				<main className="flex-1 p-4">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
