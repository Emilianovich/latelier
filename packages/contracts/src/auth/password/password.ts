import { z } from "zod"

export const PasswordSchema = (
	msg: string | undefined = "Su contraseña debe tener al menos un caracter"
) => z.string().min(1, msg)
