import { describe, expect, test } from "vitest"
import { validateSchema } from "../../utils.ts"
import { UpdateUsersSchema, UpdateUsersSchemaType } from "./update-users.ts"
import { validUpdateDto as validUserSettings } from "../../settings/update/update-user-settings.ts"
import { validEmail } from "../../auth/email/email.ts"

const usersDto: UpdateUsersSchemaType = {
	...validUserSettings,
	email: validEmail,
	name: "Axel Blaze"
}
describe("UpdateUsersSchema", () => {
	test("should fail for empty dto", () => {
		expect(validateSchema(UpdateUsersSchema, {})).toBeFalsy()
	})
	test("should pass for valid dto", () => {
		expect(validateSchema(UpdateUsersSchema, usersDto)).toBeTruthy()
	})
	test("should fail for invalid email", () => {
		const invalidEmailDto = { ...usersDto }
		invalidEmailDto.email = "bad-email"
		expect(validateSchema(UpdateUsersSchema, invalidEmailDto)).toBeFalsy()
	})
	test("should fail for invalid font family", () => {
		const invalidFontFamilyDto = { ...usersDto, fontFamily: "Blaze" }
		expect(validateSchema(UpdateUsersSchema, invalidFontFamilyDto)).toBeFalsy()
	})
	test("should fail for invalid theme", () => {
		const invalidThemeDto = { ...usersDto, theme: "Blaze" }
		expect(validateSchema(UpdateUsersSchema, invalidThemeDto)).toBeFalsy()
	})
	test("should fail for invalid pet name", () => {
		const invalidPetNameDto = { ...usersDto, petName: "Blaze" }
		expect(validateSchema(UpdateUsersSchema, invalidPetNameDto)).toBeFalsy()
	})
	test("should fail when unknown key is present", () => {
		const invalidKeyDto = { ...usersDto, unknownKey: "Blaze" }
		expect(validateSchema(UpdateUsersSchema, invalidKeyDto)).toBeFalsy()
	})
})
