import { z } from "zod"
import { PasswordSchema } from "./password.ts"

export const PasswordChangeSchema = z
	.strictObject({
		password: PasswordSchema(),
		confirmPassword: PasswordSchema(
			"La confirmación de tu contraseña debe tener al menos un caracter"
		)
	})
	.superRefine((self, ctx) => {
		if (self.password !== self.confirmPassword) {
			ctx.addIssue({
				code: "custom",
				message: "La contraseña y su confirmación deben ser iguales",
				path: ["confirmPassword"]
			})
		}
	})

export type PasswordChangeSchemaType = z.infer<typeof PasswordChangeSchema>
