import {
	CreateBreakdownSchemaType,
	CreatingLaboratorySchemaType
} from "./create-course-instances.ts"
import { describe, test, assert, expect } from "vitest"
import {
	isTotalBreakdownPercentageValid,
	isTotalPercentageValid
} from "./utils.ts"

const validBreakdownsPercentage: CreateBreakdownSchemaType[] = [
	{
		name: "Name",
		percentage: 0.6,
		allowsMultipleEntries: false
	},
	{
		name: "Name",
		percentage: 0.3,
		allowsMultipleEntries: false
	},
	{
		name: "Name",
		percentage: 0.1,
		allowsMultipleEntries: false
	}
]

const invalidBreakdownsPercentage: CreateBreakdownSchemaType[] = [
	{
		name: "Name",
		percentage: 0.6,
		allowsMultipleEntries: false
	},
	{
		name: "Name",
		percentage: 0.5,
		allowsMultipleEntries: false
	}
]

const laboratory: CreatingLaboratorySchemaType = {
	profesorName: "Profesor",
	percentage: 0.3,
	breakdowns: [
		{
			name: "Name",
			allowsMultipleEntries: false,
			percentage: 1
		}
	]
}

const breakdownWhenLaboratoryIsPresent: CreateBreakdownSchemaType[] = [
	{
		name: "Name",
		percentage: 0.6,
		allowsMultipleEntries: false
	},
	{
		name: "Name",
		percentage: 0.1,
		allowsMultipleEntries: false
	}
]

describe("isTotalBreakdownPercentageValid function", () => {
	test("should fail for empty empty array", () => {
		const { isValid, totalBreakdownPercentage } =
			isTotalBreakdownPercentageValid([])
		expect(isValid).toBe(false)
		expect(totalBreakdownPercentage).toBe(0)
	})
	test("should return true and 1 for valid breakdowns", () => {
		const { isValid, totalBreakdownPercentage } =
			isTotalBreakdownPercentageValid(validBreakdownsPercentage)
		expect(totalBreakdownPercentage).toBeCloseTo(1)
		assert(
			isValid,
			`The breakdown percentage is ${isValid ? "" : "not"} valid and the total percentage is ${totalBreakdownPercentage}`
		)
	})
	test("should return false for invalid breakdowns", () => {
		const { isValid, totalBreakdownPercentage } =
			isTotalBreakdownPercentageValid(invalidBreakdownsPercentage)
		expect(isValid).toBe(false)
		expect(totalBreakdownPercentage).not.toBe(1)
	})
})
describe("isTotalPercentageValid function", () => {
	test("should pass with valid breakdowns and laboratory", () => {
		expect(
			isTotalPercentageValid(breakdownWhenLaboratoryIsPresent, laboratory)
		).toBe(true)
	})
	test("should pass with valid breakdowns with no laboratory", () => {
		expect(isTotalPercentageValid(validBreakdownsPercentage, undefined)).toBe(
			true
		)
	})
	test("should fail for invalid breakdowns", () => {
		expect(isTotalPercentageValid(invalidBreakdownsPercentage, undefined)).toBe(
			false
		)
	})
	test("should fail for breakdowns totalPercentage === 1 and valid laboratory", () => {
		expect(isTotalPercentageValid(validBreakdownsPercentage, laboratory)).toBe(
			false
		)
	})
})
