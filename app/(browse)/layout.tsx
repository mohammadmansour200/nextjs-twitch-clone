import Main from "@/components/Main";
import { Suspense } from "react";
import Header from "./_components/header";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";

function BrowseLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<div className="flex h-full pt-14">
				<Suspense fallback={<SidebarSkeleton />}>
					<Sidebar />
				</Suspense>
				<Main>{children}</Main>
			</div>
		</>
	);
}

export default BrowseLayout;
