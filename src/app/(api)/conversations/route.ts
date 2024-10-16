import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const before_at = searchParams.get("before_at");
	const after_at = searchParams.get("after_at");
	const where = [];
	const values = [];
	if (before_at) {
		where.push(`wa_conversations.last_chat_at < $${where.length + 1}`);
		values.push(new Date(before_at));
	}
	if (after_at) {
		where.push(`wa_conversations.last_chat_at > $${where.length + 1}`);
		values.push(new Date(after_at));
	}
	const { rows } = await db.query(
		`SELECT
			wa_conversations.id,
			wa_conversations.target as phone,
			wa_conversations.last_chat_at,
			COALESCE(wa_contacts.name, wa_contacts.push_name) as name
        FROM wa_conversations
		LEFT JOIN wa_contacts ON wa_contacts.phone_number = wa_conversations.target
        ${where.length == 0 ? "" : `WHERE ${where.join(" AND ")}`}
        ORDER BY last_chat_at DESC
        LIMIT 20`,
		values
	);
	return NextResponse.json(rows);
}
