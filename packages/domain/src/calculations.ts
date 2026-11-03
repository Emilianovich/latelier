import {
	Course,
	CourseBreakdown,
	CourseBreakdownEntry,
	CourseInstance,
	GradeLetter
} from "./types.ts"

export const gradeToLetter = (grade: number): GradeLetter => {
	if (grade < 61) return "F"
	if (grade < 71) return "D"
	if (grade < 81) return "C"
	if (grade < 91) return "B"
	return "A"
}

export const roundNumber = ({
	number,
	amountOfDecimals
}: {
	number: number
	amountOfDecimals: number
}): number => {
	if (!Number.isInteger(amountOfDecimals) || amountOfDecimals < 0) {
		throw new RangeError("The amount must be a non-negative integer")
	}
	const shifted = Number(`${number}e${amountOfDecimals}`)
	const rounded = Math.round(shifted)
	return Number(`${rounded}e-${amountOfDecimals}`)
}

export function getValueOver100({
	rawScore,
	maxScore = 100
}: {
	rawScore: number
	maxScore?: number
}): number {
	if (maxScore <= 0)
		throw new RangeError("maxScore cannot be less or equal to zero")
	return (rawScore / maxScore) * 100
}

export function getEntriesAverageGrade(
	entries: CourseBreakdownEntry[]
): number {
	if (!entries.length) return 0
	const gradeAverage: number[] = []
	entries.forEach((entry) => {
		gradeAverage.push(getValueOver100(entry))
	})
	return (
		gradeAverage.reduce((currentVal, acc) => currentVal + acc, 0) /
		gradeAverage.length
	)
}
export function computeBreakdownContribution(breakdown: CourseBreakdown) {
	if (!breakdown.entries.length) {
		breakdown.contribution = 0
	}
	const entryAverage = getEntriesAverageGrade(breakdown.entries)
	breakdown.contribution = breakdown.percentage * (entryAverage / 100)
}

export function computeCourseInstanceFinalGrade(instance: CourseInstance) {
	instance.finalGrade = instance.breakdowns
		.map((currInstance) => currInstance.contribution)
		.reduce((currentContribution, acc) => currentContribution + acc, 0)
}
export function updateCourseInstanceFinalGrade(
	courseInstance: CourseInstance
): void {
	let labContribution = 0
	const { laboratory } = courseInstance
	if (laboratory) {
		const { breakdowns: labBreakdowns } = laboratory
		labBreakdowns.forEach((breakdown) => {
			computeBreakdownContribution(breakdown)
		})
		computeCourseInstanceFinalGrade(laboratory)
		const { finalGrade: labFinalGrade, percentage } = laboratory
		labContribution = labFinalGrade * percentage
	}
	courseInstance.breakdowns.forEach((breakdown) => {
		computeBreakdownContribution(breakdown)
	})
	computeCourseInstanceFinalGrade(courseInstance)
	courseInstance.finalGrade += labContribution
	courseInstance.finalGrade = roundNumber({
		number: courseInstance.finalGrade,
		amountOfDecimals: 4
	})
}

export function updateCourseAverageGrade(course: Course): void {
	course.courseInstances.forEach((instance) => {
		updateCourseInstanceFinalGrade(instance)
	})
	const { courseInstances } = course
	if (!courseInstances.length) {
		course.averageGrade = 0
		return
	}
	course.averageGrade = roundNumber({
		number:
			courseInstances
				.map((instance) => instance.finalGrade)
				.reduce((currentFinalGrade, acc) => currentFinalGrade + acc, 0) /
			courseInstances.length,
		amountOfDecimals: 4
	})
}
