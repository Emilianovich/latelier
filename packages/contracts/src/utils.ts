import { z } from "zod"
export const validateSchema = <T extends z.ZodObject>(schema: T, dto: object) =>
	schema.safeParse(dto).success
