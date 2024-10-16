import { configDotenv } from "dotenv";
import { z } from "zod";

configDotenv();

export default z
	.object({
		POSTGRES_DSN: z.string(),
	})
	.parse(process.env);
