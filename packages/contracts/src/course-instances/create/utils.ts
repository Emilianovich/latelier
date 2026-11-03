import {
	CreateBreakdownSchemaType,
	CreatingLaboratorySchemaType
} from "./create-course-instances.ts"

const discrepancy = 1e-9
export const isTotalBreakdownPercentageValid = (
	breakdowns: CreateBreakdownSchemaType[]
) => {
	if (!breakdowns.length) return { isValid: false, totalBreakdownPercentage: 0 }
	const totalBreakdownPercentage = breakdowns
		.map((breakdown) => breakdown.percentage)
		.reduce((total, currentPercent) => total + currentPercent, 0)
	return {
		isValid: Math.abs(totalBreakdownPercentage - 1) < discrepancy,
		totalBreakdownPercentage
	}
}

export const isTotalPercentageValid = (
	breakdowns: CreateBreakdownSchemaType[],
	laboratory: CreatingLaboratorySchemaType | undefined
): boolean => {
	let totalLabPercentage = 0
	if (laboratory) {
		totalLabPercentage = laboratory.percentage
		const { isValid } = isTotalBreakdownPercentageValid(laboratory.breakdowns)
		if (!isValid) return false
	}
	const { totalBreakdownPercentage } =
		isTotalBreakdownPercentageValid(breakdowns)
	const totalPercentage = totalBreakdownPercentage + totalLabPercentage
	return Math.abs(totalPercentage - 1) < discrepancy
}
