import { authMiddleware } from "./middleware/authMiddleware";
import { chain } from "./middleware/chain";

import { i18nMiddleware } from "./middleware/i18nMiddleware";

export default chain([i18nMiddleware, authMiddleware]);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
