import { CreateUserPreferencesSchema } from "../create/create-user-settings.ts"
import { z } from "zod"

export const UpdateUserPreferencesSchema = CreateUserPreferencesSchema.extend({
	disablePet: z.boolean()
})

export type UpdateUserPreferencesSchemaType = z.infer<
	typeof UpdateUserPreferencesSchema
>
