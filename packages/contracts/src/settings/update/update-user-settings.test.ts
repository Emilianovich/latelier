import {
	UpdateUserPreferencesSchema,
	UpdateUserPreferencesSchemaType
} from "./update-user-settings.ts"
import { describe, expect, test } from "vitest"
import { validateSchema, validDto } from "../../utils.ts"

const validUpdateDto: UpdateUserPreferencesSchemaType = {
	...validDto,
	disablePet: true
}

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
