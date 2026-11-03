import { assert, describe, expect, test } from "vitest"
import {
	copyObject,
	getLastElementFromArray,
	getWordPluralForm,
	isArrayEmpty
} from "../utilities.ts"

const user = {
	name: "John",
	surname: "Doe",
	age: 25
}

describe("Plural or singular form of words", () => {
	const word = "lemon"
	const moreThanOne = 2
	const equalToOne = 1
	const equalToZero = 0
	test(`should return 'lemons' when passing ${moreThanOne} as amount and ${word}`, () => {
		expect(getWordPluralForm(moreThanOne, word)).toBe("lemons")
	})
	test(`should return 'lemons' when passing ${equalToZero} as amount and ${word}`, () => {
		expect(getWordPluralForm(equalToZero, word)).toBe("lemons")
	})
	test(`should return 'lemon' when passing ${equalToOne} as amount and ${word}`, () => {
		expect(getWordPluralForm(equalToOne, word)).toBe("lemon")
	})
})

describe("Get last element from array", () => {
	const users = [
		{
			...user
		},
		{
			...user,
			age: 26
		},
		{
			...user,
			age: 27
		}
	]
	const lastUser = users[users.length - 1]
	test(`should return user of age ${lastUser.age}`, () => {
		expect(getLastElementFromArray(users)).toStrictEqual(lastUser)
	})
})

describe("Check if array is empty", () => {
	const emptyArray: number[] = []
	const notEmptyArray = [1]
	test("should return true for empty array", () => {
		expect(isArrayEmpty(emptyArray)).toBe(true)
	})
	test("should return false for array not empty", () => {
		expect(isArrayEmpty(notEmptyArray)).toBe(false)
	})
})

describe("Check object inequality", () => {
	test("should not be object of equal reference", () => {
		const copyUser = copyObject(user)
		assert(
			copyUser !== user && expect(copyUser).toEqual(user),
			"user copy should not be equal to original user"
		)
	})
})
