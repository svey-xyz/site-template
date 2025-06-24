import { plural } from 'pluralize'
import slugify from 'slugify'

type displayDateSpecificity = "YYYY-MM-DD, HH:mm" | "YYYY-MM-DD" | "YYYY-MM" | "YYYY" | "YY-MM-DD" | "LL";

export const slugOptions = {
	replacement: '-',  // replace spaces with replacement character, defaults to `-`
	remove: undefined, // remove characters that match regex, defaults to `undefined`
	lower: true,      // convert to lower case, defaults to `false`
	strict: true,     // strip special characters except replacement, defaults to `false`
	locale: 'en',      // language code of the locale to use
	trim: true         // trim leading and trailing replacement chars, defaults to `true`
}

export const camelCaseToWords = (string: string) => {
	var words = string.match(/[A-Za-z][a-z]*/g) || [];

	return words.map(capitalize).join(" ");
}

export const pluralize = (string: string) => {
	return plural(string)
}

export const slugifyWithOptions = (string: string) => {
	if (!string) return
	return slugify(String(string), slugOptions)
}

export const capitalize = (word: string) => {
	return word.charAt(0).toUpperCase() + word.substring(1);
}