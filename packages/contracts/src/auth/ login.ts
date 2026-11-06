import { z } from "zod"
import { EmailSchema } from "./email/email.ts"
import { PasswordSchema } from "./password/password.ts"

export const LoginSchema = z.strictObject({
	...EmailSchema.shape,
	password: PasswordSchema("La contraseña es requerida")
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
