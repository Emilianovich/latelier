import { describe, expect, test } from "vitest"
import { validateSchema } from "../../utils.ts"
import { EmailSchema, invalidEmails, validEmail } from "./email.ts"

const dto = {
	email: validEmail
}

describe("EmailSchema validation", () => {
	test("should pass for valid email", () => {
		expect(validateSchema(EmailSchema, dto)).toBe(true)
	})
	test.each(invalidEmails)("should fail for $description", ({ email }) => {
		expect(
			validateSchema(EmailSchema, {
				email
			})
		).toBe(false)
	})
})
