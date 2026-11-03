import { z } from "zod"

export const CreateAcademicPeriodSchema = z
	.strictObject({
		name: z.string().min(3, "El nombre debe tener por lo menos 3 caracteres"),
		startDate: z.iso
			.date("La fecha de inicio debe tener el formato YYYY-MM-DD")
			.transform((val) => val.toString()),
		endDate: z.iso
			.date("La fecha de finalización debe tener el formato YYYY-MM-DD")
			.transform((val) => val.toString())
	})
	.superRefine((self, ctx) => {
		const { startDate: startDateStr, endDate: endDateStr } = self
		const startDate = new Date(startDateStr).getTime()
		const endDate = new Date(endDateStr).getTime()
		if (startDate >= endDate) {
			ctx.addIssue({
				message:
					"La fecha de inicio no puede ser mayor o igual a la de finalización",
				path: ["startDate"],
				code: "custom"
			})
		}
	})

export type CreateAcademicPeriodSchemaType = z.infer<
	typeof CreateAcademicPeriodSchema
>
