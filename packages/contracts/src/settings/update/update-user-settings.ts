import { CreateUserPreferencesSchema } from "../create/create-user-settings.ts"
import { z } from "zod"
import { validDto } from "../../utils.ts"

export const UpdateUserPreferencesSchema = CreateUserPreferencesSchema.extend({
	disablePet: z.boolean()
})

export type UpdateUserPreferencesSchemaType = z.infer<
	typeof UpdateUserPreferencesSchema
>

export const validUpdateDto: UpdateUserPreferencesSchemaType = {
	...validDto,
	disablePet: true
}
