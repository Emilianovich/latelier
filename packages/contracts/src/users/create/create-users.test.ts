import { CreateUserSchema, validDto } from "./create-users.ts"
import { describe, expect, test } from "vitest"
import { validateSchema } from "../../utils.ts"

describe("CreateUserSchema", () => {
	test("should pass for valid dto", () => {
		expect(validateSchema(CreateUserSchema, validDto)).toBe(true)
	})
	test("should fail for empty username", () => {
		expect(
			validateSchema(CreateUserSchema, {
				...validDto,
				username: ""
			})
		)
	})
	test("should fail for username above 100 characters", () => {
		expect(
			validateSchema(CreateUserSchema, {
				...validDto,
				username: "a".repeat(101)
			})
		)
	})
	test("should fail for empty password", () => {
		expect(
			validateSchema(CreateUserSchema, {
				...validDto,
				password: ""
			})
		)
	})
	test("should fail when unknown key is present", () => {
		expect(
			validateSchema(CreateUserSchema, {
				...validDto,
				unknowKey: "my-key"
			})
		)
	})
})
