import { z } from "zod"
import { UpdateUserPreferencesSchema } from "../../settings/update/update-user-settings.ts"
import { EmailSchema } from "../../auth/email/email.ts"

export const UpdateUsersSchema = UpdateUserPreferencesSchema.safeExtend({
	name: z
		.string()
		.min(1, "Tu apodo debería tener por lo menos un caracter")
		.max(100, "Tu apodo debería tener entre 1 a 100 caracteres"),
	...EmailSchema.shape
}).strict()

export type UpdateUsersSchemaType = z.infer<typeof UpdateUsersSchema>
