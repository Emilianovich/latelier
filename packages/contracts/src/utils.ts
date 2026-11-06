import { z } from "zod"
import { CreateUserPreferencesSchemaType } from "./settings/create/create-user-settings.ts"
export const validateSchema = <T extends z.ZodObject>(schema: T, dto: object) =>
	schema.safeParse(dto).success

export const validDto: CreateUserPreferencesSchemaType = {
	fontFamily: "Arima",
	petName: "Spike",
	theme: "dark"
}
