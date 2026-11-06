import { z } from "zod"
import { PasswordSchema } from "../../auth/password/password.ts"
import { EmailSchema } from "../../auth/email/email.ts"

export const CreateUserSchema = z.strictObject({
	name: z
		.string()
		.min(1, "Tu apodo debería tener por lo menos un caracter")
		.max(100, "Tu apodo debería tener entre 1 a 100 caracteres"),
	...EmailSchema.shape,
	password: PasswordSchema()
})

export const validDto: CreateUserSchemaType = {
	name: "Ash Ketchum",
	password: "super-secure-password",
	email: "user@gmail.com"
}

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>
