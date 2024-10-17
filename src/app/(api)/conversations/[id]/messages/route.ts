import { db } from "@/lib/database";
import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: Request) {
	const { searchParams, pathname } = new URL(req.url);
	const conv_id = pathname.split("/")[2];
	const before_id = searchParams.get("before_id");
	const after_id = searchParams.get("after_id");
	const where = ["conv_id = $1"];
	const values: string[] = [conv_id];
	if (before_id) {
		where.push(`wa_messages.id < $${where.length + 1}`);
		values.push(before_id);
	}
	if (after_id) {
		where.push(`wa_messages.id > $${where.length + 1}`);
		values.push(after_id);
	}
	const { rows } = await db.query(
		`SELECT
            id,
            created_at,
            status,
            content,
            error
        FROM wa_messages
        WHERE ${where.join(" AND ")}
        ORDER BY id DESC
        LIMIT 20`,
		values
	);
	return NextResponse.json(rows);
}

export async function POST(req: Request) {
	const msg = await req.json();
	const { pathname } = new URL(req.url);
	const conv_id = pathname.split("/")[2];
	const { rows } = await db.query(
		`SELECT phone_number_id, token, target
        FROM wa_conversations
		JOIN wa_accounts ON wa_accounts.id = wa_conversations.phone_number_id
		WHERE wa_conversations.id = $1`,
		[conv_id]
	);
	const { phone_number_id, token, target } = rows[0];
	const resp = await fetch(
		`https://crm-server-f7nfrqxzcq-as.a.run.app/crm/whatsapp/${phone_number_id}/messages`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				messaging_product: "whatsapp",
				to: target,
				type: "text",
				text: {
					body: msg,
				},
			}),
		}
	);
	const result = await resp.json();
	return NextResponse.json(result);
}
