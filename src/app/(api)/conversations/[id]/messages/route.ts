import { db } from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams, pathname } = new URL(req.url);
	const conv_id = pathname.split("/")[2];
	const before_id = searchParams.get("before_id");
	const after_id = searchParams.get("after_id");
	const where = ["conv_id = $1"];
	const values: any[] = [conv_id];
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
	console.log(values);
	return NextResponse.json(rows);
}
