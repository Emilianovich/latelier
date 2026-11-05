import { expect, test } from "vitest"
import {
	CreateAcademicPeriodSchema,
	CreateAcademicPeriodSchemaType
} from "./create-academic-period.ts"
import { validateSchema } from "../utils.ts"

const validAcademicPeriod: CreateAcademicPeriodSchemaType = {
	name: "Str",
	startDate: "2019-02-22",
	endDate: "2019-02-24"
}

test("should create an academic period in a valid format", () => {
	expect(validateSchema(CreateAcademicPeriodSchema, validAcademicPeriod)).toBe(
		true
	)
})

test("shouldn't accept an academic period with an unknown field", () => {
	const academicPeriodWithUnknownField = {
		...validAcademicPeriod,
		difficultyLevel: "hard"
	}
	expect(
		validateSchema(CreateAcademicPeriodSchema, academicPeriodWithUnknownField)
	).toBe(false)
})

test("shouldn't accept an academic period with a name < 3", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		name: "st"
	}
	expect(validateSchema(CreateAcademicPeriodSchema, academicPeriod)).toBe(false)
})

test("shouldn't accept an academic period with a startDate > endDate", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		startDate: "2019-02-22",
		endDate: "2019-02-21"
	}
	expect(validateSchema(CreateAcademicPeriodSchema, academicPeriod)).toBe(false)
})

test("shouldn't accept an academic period with a startDate === endDate", () => {
	const academicPeriod = {
		...validAcademicPeriod,
		endDate: validAcademicPeriod.startDate
	}
	expect(validateSchema(CreateAcademicPeriodSchema, academicPeriod)).toBe(false)
})
