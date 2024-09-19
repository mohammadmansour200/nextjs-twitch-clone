import type { DefaultSession } from "next-auth";
import type { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
	interface User extends AdapterUser {
		userId: string | undefined;
		username: string | undefined;
		bio: string | undefined | null;
	}

	interface Session extends DefaultSession {
		user?: User;
	}
}
