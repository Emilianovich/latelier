import { z } from "zod"
import { isTotalPercentageValid } from "./utils.ts"

export const PercentageSchema = (addedStr: string) =>
	z
		.number()
		.gte(0, "El porcentaje no puede ser negativo")
		.lte(100, `${addedStr} no puede ser mayor a 100%`)
		.multipleOf(0.01, { message: "Máximo 2 decimales" })
		.transform((val) => val / 100)

export const CreateBreakdownSchema = z.object({
	name: z
		.string()
		.min(
			1,
			"El nombre de la subdivisión debería tener por lo menos un caracter"
		)
		.max(
			50,
			"El nombre de la subdivisión debería tener entre 1 a 50 caracteres"
		),
	percentage: PercentageSchema("El porcentaje total de la evaluación"),
	allowsMultipleEntries: z.boolean(
		"Es necesario especificar si esta subdivisión permite registrar más de una nota"
	)
})

export const CreateCourseInstanceBaseSchema = z
	.object({
		profesorName: z
			.string()
			.min(1, "El nombre del profesor debería tener por lo menos un caracter")
			.max(
				100,
				"El nombre del profesor debería tener entre 1 a 100 caracteres"
			),
		breakdowns: z.array(CreateBreakdownSchema)
	})
	.superRefine((self, ctx) => {
		if (!self.breakdowns.length) {
			ctx.addIssue({
				code: "custom",
				message: "Tienes que agregar por lo menos una evaluación",
				path: ["breakdowns"]
			})
		}
	})

const CreatingLaboratorySchema = CreateCourseInstanceBaseSchema.safeExtend({
	percentage: PercentageSchema("El porcentaje de laboratorio")
})

export type CreateBreakdownSchemaType = z.infer<typeof CreateBreakdownSchema>
export type CreatingLaboratorySchemaType = z.infer<
	typeof CreatingLaboratorySchema
>

export const CreateCourseInstanceSchema = z
	.object({
		isRegistered: z.boolean(
			"Es necesario especificar si ya tiene la materia registrada"
		),
		name: z
			.string()
			.min(1, "El nombre de la materia debería tener por lo menos un caracter")
			.max(
				100,
				"El nombre de la materia debería tener entre 1 a 100 caracteres"
			)
			.optional(),
		hasLaboratory: z.boolean(
			"Es necesario especificar si la materia tiene parte de laboratorio"
		),
		laboratory: CreatingLaboratorySchema.optional(),
		profesorName: z
			.string()
			.min(1, "El nombre del profesor debería tener por lo menos un caracter")
			.max(
				100,
				"El nombre del profesor debería tener entre 1 a 100 caracteres"
			),
		previousCourseId: z.string().optional(),
		breakdowns: z.array(CreateBreakdownSchema)
	})
	.superRefine((self, ctx) => {
		const {
			isRegistered,
			breakdowns,
			previousCourseId,
			laboratory,
			name,
			hasLaboratory
		} = self
		if (isRegistered && !previousCourseId) {
			ctx.addIssue({
				code: "custom",
				path: ["previousCourseId"],
				message: "Ya diste la materia, es necesario que facilites su id"
			})
		}
		if (isRegistered && name) {
			ctx.addIssue({
				code: "custom",
				path: ["name"],
				message: "Ya diste la materia, no es necesario que des el nombre"
			})
		}
		if (!isRegistered && !name) {
			ctx.addIssue({
				code: "custom",
				path: ["name"],
				message: "Es importante que facilites el nombre de la materia"
			})
		}
		if (!isRegistered && previousCourseId) {
			ctx.addIssue({
				code: "custom",
				path: ["previousCourseId"],
				message:
					"No tienes registrado esa materia, no es necesario que mandes un id"
			})
		}
		if (!breakdowns.length) {
			ctx.addIssue({
				code: "custom",
				path: ["breakdowns"],
				message: "No tienes registradas evaluaciones para esta materia"
			})
		}
		if (hasLaboratory && !laboratory) {
			ctx.addIssue({
				code: "custom",
				path: ["laboratory"],
				message:
					"Como la materia tiene parte de laboratorio, tiene que especificar sus detalles"
			})
		}
		if (!hasLaboratory && laboratory) {
			ctx.addIssue({
				code: "custom",
				path: ["laboratory"],
				message:
					"Como no especificó que la materia tiene parte de laboratorio, no tiene que especificar sus detalles"
			})
		}
		if (!isTotalPercentageValid(breakdowns, laboratory)) {
			ctx.addIssue({
				code: "custom",
				message: "El total de porcentajes tiene que ser igual a 100%"
			})
		}
	})

export type CreateCourseInstanceSchemaType = z.infer<
	typeof CreateCourseInstanceSchema
>
