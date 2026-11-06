import {
	PasswordChangeSchema,
	PasswordChangeSchemaType
} from "./change-password.ts"
import { describe, expect, test } from "vitest"
import { validateSchema } from "../../utils.ts"

const dto: PasswordChangeSchemaType = {
	password: "super-secure-password",
	confirmPassword: "super-secure-password"
}

describe("ChangePasswordSchema", () => {
	test("should pass for a valid dto", () => {
		expect(validateSchema(PasswordChangeSchema, dto)).toBeTruthy()
	})
	test("should not pass for dto with no matching password", () => {
		const invalidDto: PasswordChangeSchemaType = {
			...dto,
			confirmPassword: "super-secure"
		}
		expect(validateSchema(PasswordChangeSchema, invalidDto)).toBeFalsy()
	})
	test("should not pass for dto with empty transform password", () => {
		expect(
			validateSchema(PasswordChangeSchema, {
				...dto,
				confirmPassword: ""
			})
		).toBeFalsy()
	})
	test("should not pass with an unknown property", () => {
		expect(
			validateSchema(PasswordChangeSchema, {
				...dto,
				unknownProperty: "name"
			})
		).toBeFalsy()
	})
})
