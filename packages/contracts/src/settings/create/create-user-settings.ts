import { z } from "zod"

export const CreateUserPreferencesSchema = z.strictObject({
	fontFamily: z.enum(
		[
			"Arima",
			"Amiko",
			"Playwrite VN",
			"Elsie",
			"Libertinus Math",
			"Nunito",
			"Gorditas",
			"Special Elite",
			"Short Stack",
			"Uncial Antiqua",
			"Saira Stencil",
			"Cherry Cream Soda",
			"Audiowide",
			"Cabin Sketch",
			"Chalkboard SE",
			"Fredoka",
			"Erzieherisch"
		],
		{
			error: "Seleccione una familia tipográfica permitida"
		}
	),

	theme: z.enum(["dark", "light", "high-contrast", "sepia"], {
		error:
			"Se requiere un tema válido ('dark', 'light', 'high-contrast', 'sepia')"
	}),

	petName: z.enum(["Spike", "Leon", "Tom", "Nita", "Mila"], {
		error: "'Spike', 'Leon', 'Tom', 'Nita' o 'Mila' son las mascotas permitidas"
	})
})

export type CreateUserPreferencesSchemaType = z.infer<
	typeof CreateUserPreferencesSchema
>
