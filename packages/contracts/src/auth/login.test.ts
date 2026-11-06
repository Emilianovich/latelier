import { LoginSchema, LoginSchemaType } from "./ login.ts"
import { describe, expect, test } from "vitest"
import { validateSchema } from "../utils.ts"

const validLoginDto: LoginSchemaType = {
	email: "user@gmail.com",
	password: "password"
}

describe("LoginSchema", () => {
	test("should pass with valid dto", () => {
		expect(validateSchema(LoginSchema, validLoginDto)).toBeTruthy()
	})
	test("should fail if email is invalid", () => {
		const invalidEmailDto: LoginSchemaType = {
			...validLoginDto,
			email: "email-address"
		}
		expect(validateSchema(LoginSchema, invalidEmailDto)).toBeFalsy()
	})
	test("should fail if password is empty", () => {
		const emptyPasswordDto: LoginSchemaType = {
			...validLoginDto,
			password: ""
		}
		expect(validateSchema(LoginSchema, emptyPasswordDto)).toBeFalsy()
	})
	test("should fail when unknown property is present", () => {
		expect(
			validateSchema(LoginSchema, {
				...validLoginDto,
				key: "val"
			})
		).toBeFalsy()
	})
})
