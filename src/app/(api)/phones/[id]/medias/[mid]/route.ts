import { db } from "@/lib/database";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: Request) {
	const { pathname } = new URL(req.url);
	const paths = pathname.split("/");
	const phoneId = paths[2];
	const mediaId = paths[4];
	const { rows: accounts } = await db.query(
		`SELECT token
        FROM wa_accounts
        WHERE id = $1`,
		[phoneId]
	);
	const { token } = accounts[0];
	const resp = await fetch(`https://graph.facebook.com/v20.0/${mediaId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const media = (await resp.json()) as Media;
	console.log(
		`curl -v ${media.url} -H "Authorization: Bearer ${token}" -H "sec-fetch-mode: cors"`
	);
	const respImg = await fetch(media.url, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const blob = await respImg.blob();
	const stream = await blob.stream();
	return new NextResponse(stream, {
		headers: {
			"Content-Type": media.mime_type,
			ETag: media.sha256,
		},
	});
}
