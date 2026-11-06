import { describe, expect, test } from "vitest"
import { validateSchema } from "./utils.ts"
import { CreateBreakdownSchema } from "./course-instances/create"
import { z } from "zod"

const MockSchema = z.object({
	name: z.string(),
	age: z.int()
})

const dto: z.infer<typeof MockSchema> = {
	name: "John Doe",
	age: 7
}

describe("validateSchema function", () => {
	test("should return false for invalid object", () => {
		expect(validateSchema(CreateBreakdownSchema, dto)).toBe(false)
	})
	test("should return true for valid object", () => {
		expect(validateSchema(MockSchema, dto)).toBe(true)
	})
})
