import { describe, expect, test } from "vitest"
import {
	CreateUserPreferencesSchema,
	CreateUserPreferencesSchemaType
} from "./create-user-settings.ts"
import { validateSchema, validDto } from "../../utils.ts"

describe("Create User Preferences Schema", () => {
	test("should accept a valid schema", () => {
		expect(validateSchema(CreateUserPreferencesSchema, validDto)).toBe(true)
	})
	test("should reject a dto with an invalid font", () => {
		expect(
			validateSchema(CreateUserPreferencesSchema, {
				...validDto,
				fontFamily: "Arim"
			})
		).toBe(false)
	})
	test("should reject a dto with an invalid pet name", () => {
		expect(
			validateSchema(CreateUserPreferencesSchema, {
				...validDto,
				petName: "Spi"
			})
		).toBe(false)
	})
	test("should reject a dto with an invalid theme", () => {
		expect(
			validateSchema(CreateUserPreferencesSchema, {
				...validDto,
				theme: "dark-contrast"
			})
		).toBe(false)
	})
})
