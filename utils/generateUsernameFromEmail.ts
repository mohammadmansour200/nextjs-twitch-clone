// biome-ignore lint/style/useNodejsImportProtocol: Adding protocol throws webpack error
import { randomBytes } from "crypto";

export default function generateFromEmail(email: string): string {
	// Remove the part after @
	const nameParts = email.replace(/@.+/, "");

	// Replace all special characters like "@ . _ ";
	const name = nameParts.replace(/[&/\\#,+()$~%._@'":*?<>{}]/g, "");

	// Create and return unique username
	return name + Math.floor(getRandomInt(1000, 9000)).toString();
}

const getRandomInt = (min: number, max: number): number => {
	const randomBuffer = randomBytes(4); // 4 bytes to generate a 32-bit integer

	const randomInt = randomBuffer.readUInt32BE(0); // Convert bytes to an unsigned 32-bit integer

	return min + (randomInt % (max - min + 1));
};
