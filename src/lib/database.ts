import { Pool } from "pg";
import env from "./env";

export const db = new Pool({ connectionString: env.POSTGRES_DSN });
