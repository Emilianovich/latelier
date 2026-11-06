import { z } from "zod"

// TODO write tests
export const EmailSchema = z.object({
	email: z
		.email({
			pattern:
				/^(?!.*\.\.)(?!\.)(?!.*\.$)[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/,
			error: "Ingrese un correo electrónico válido"
		})
		.transform((val) => {
			if (val) return val.toLowerCase()
		})
})
export const invalidEmails = [
	{
		description: "email with no @",
		email: "me.com"
	},
	{
		description: "email with no .something after @",
		email: "me@hi"
	},
	{
		description: "email with nothing before @",
		email: "@gmail.com"
	}
]
export const validEmail = "user@gmail.com"
