import Main from "@/components/Main";
import { getSelfByUsername } from "@/services/auth-service";
import { redirect } from "next/navigation";
import Header from "./_components/header";
import Sidebar from "./_components/sidebar";

interface CreatorLayoutProps {
	params: { username: string };
	children: React.ReactNode;
}

async function CreatorLayout({ children, params }: CreatorLayoutProps) {
	const self = await getSelfByUsername(params.username);

	if (!self) redirect("/");

	return (
		<>
			<Header />
			<div className="flex h-full pt-14">
				<Sidebar />
				<Main>{children}</Main>
			</div>
		</>
	);
}

export default CreatorLayout;
