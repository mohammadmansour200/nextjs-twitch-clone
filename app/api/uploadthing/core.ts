import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import type { Session } from "next-auth";
import { type FileRouter, createUploadthing } from "uploadthing/next";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();
const utapi = new UTApi();

export const ourFileRouter = {
	thumbnailUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
		.middleware(async () => {
			const { user } = (await auth()) as Session;

			return { user };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			const stream = await db.stream.findUnique({
				where: { userId: metadata.user?.userId },
			});

			//Delete previous thumbnail
			if (stream?.thumbnailUrl)
				await utapi.deleteFiles(stream?.thumbnailUrl?.split("/")[4]);

			await db.stream.update({
				where: { userId: metadata.user?.userId },
				data: {
					thumbnailUrl: file.url,
				},
			});

			return { fileUrl: file.url };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
