import {
	UpdateUserPreferencesSchema,
	validUpdateDto
} from "./update-user-settings.ts"
import { describe, expect, test } from "vitest"
import { validateSchema } from "../../utils.ts"

describe("Update User Preferences Schema", () => {
	test("should accept a valid dto", () => {
		expect(validateSchema(UpdateUserPreferencesSchema, validUpdateDto)).toBe(
			true
		)
	})
	test("should fail on wrong data type for disablePet", () => {
		expect(
			validateSchema(UpdateUserPreferencesSchema, {
				...validUpdateDto,
				disablePet: "true"
			})
		).toBe(false)
	})
})
