import { NonEmptyObject } from "./types.ts"

export const getWordPluralForm = (amount: number, word: string) => {
	return amount !== 1 ? `${word}s` : word
}
export function getLastElementFromArray<T>(array: T[]) {
	return array[array.length - 1]
}
export function isArrayEmpty<T>(array: T[]) {
	return array.length === 0
}
export function copyObject<T extends object>(object: T & NonEmptyObject<T>) {
	return { ...object }
}
