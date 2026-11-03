import { expect, test } from "vitest"
import {
	CreateAcademicPeriodSchema,
	CreateAcademicPeriodSchemaType
} from "./create-academic-period.ts"

const validAcademicPeriod: CreateAcademicPeriodSchemaType = {
	name: "Str",
	startDate: "2019-02-22",
	endDate: "2019-02-24"
}

const validateAcademicPeriod = (object: CreateAcademicPeriodSchemaType) =>
	CreateAcademicPeriodSchema.safeParse(object).success

test("should create an academic period in a valid format", () => {
	expect(validateAcademicPeriod(validAcademicPeriod)).toBe(true)
})

test("shouldn't accept an academic period with an unknown field", () => {
	const academicPeriodWithUnknownField = {
		...validAcademicPeriod,
		difficultyLevel: "hard"
	}
	expect(validateAcademicPeriod(academicPeriodWithUnknownField)).toBe(false)
})

test("shouldn't accept an academic period with a name < 3", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		name: "st"
	}
	expect(validateAcademicPeriod(academicPeriod)).toBe(false)
})

test("shouldn't accept an academic period with a startDate > endDate", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		startDate: "2019-02-22",
		endDate: "2019-02-21"
	}
	expect(validateAcademicPeriod(academicPeriod)).toBe(false)
})

test("shouldn't accept an academic period with a startDate === endDate", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		endDate: validAcademicPeriod.startDate
	}
	expect(validateAcademicPeriod(academicPeriod)).toBe(false)
})
