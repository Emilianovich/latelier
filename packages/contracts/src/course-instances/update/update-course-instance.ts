import { z } from "zod"
import { CreateBreakdownSchema, PercentageSchema } from "../create"
import { isTotalPercentageValid } from "../create/utils.ts"

const CourseBreakdownEntrySchema = z
	.object({
		name: z
			.string()
			.min(1, "El nombre de la nota debería tener por lo menos un caracter")
			.max(30, "El nombre de la nota debería tener entre 1 a 30 caracteres")
			.optional(),
		rawScore: z.number().gte(0, "La nota obtenida no puede ser menor que 0"),
		maxScore: z.number().gt(0, "La nota total no puede ser menor o igual que 0")
	})
	.superRefine((self, ctx) => {
		const { rawScore, maxScore } = self
		if (maxScore === 0) {
			ctx.addIssue({
				code: "custom",
				path: ["maxScore"],
				message: "La nota máxima no puede ser igual que 0"
			})
		}
		if (rawScore > maxScore) {
			ctx.addIssue({
				code: "custom",
				path: ["rawScore"],
				message: "La nota obtenida no puede ser mayor a la nota total"
			})
		}
	})

const UpdateCourseBreakdownSchema = CreateBreakdownSchema.safeExtend({
	entries: z.array(CourseBreakdownEntrySchema)
}).superRefine((self, ctx) => {
	const { entries, allowsMultipleEntries } = self
	if (!allowsMultipleEntries && entries.length > 1) {
		ctx.addIssue({
			code: "custom",
			path: ["entries"],
			message: "Esta evaluación solo admite una nota"
		})
	}
})

const CourseInstanceBaseSchema = z
	.object({
		profesorName: z
			.string()
			.min(1, "El nombre del profesor debería tener por lo menos un caracter")
			.max(
				100,
				"El nombre del profesor debería tener entre 1 a 100 caracteres"
			),
		breakdowns: z.array(UpdateCourseBreakdownSchema)
	})
	.superRefine((self, ctx) => {
		const { breakdowns } = self
		if (!breakdowns.length) {
			ctx.addIssue({
				code: "custom",
				path: ["breakdowns"],
				message: "Tienes que tener por lo menos una evaluación"
			})
		}
	})

const LaboratorySchema = CourseInstanceBaseSchema.safeExtend({
	percentage: PercentageSchema("El porcentaje de laboratorio")
})

export const UpdateCourseInstanceSchema = CourseInstanceBaseSchema.safeExtend({
	laboratory: LaboratorySchema.optional()
}).superRefine((self, ctx) => {
	const { profesorName, laboratory, breakdowns } = self
	if (!profesorName && !breakdowns && !laboratory) {
		ctx.addIssue({
			code: "custom",
			message: "No se puede enviar un objeto de actualización vacío"
		})
	}
	if (!isTotalPercentageValid(breakdowns, laboratory)) {
		ctx.addIssue({
			code: "custom",
			message: "El total de porcentajes tiene que ser igual a 100%"
		})
	}
})
export type UpdateCourseInstanceSchemaType = z.infer<
	typeof UpdateCourseInstanceSchema
>
export type CourseBreakdownSchemaType = z.infer<
	typeof UpdateCourseBreakdownSchema
>
