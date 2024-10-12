import { article_Address, object_Date } from '@/types';
import moment from 'moment-timezone';
import { plural } from 'pluralize'
import { ReactNode } from 'react';
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

export const breakAdditionSign = (text: string) => {
	return text.replace(' + ', '+\n')
}

export const readableAddress = (address: article_Address): string | undefined => {

	const a = (address.unit && address.number) ? `${address.number}.${address.unit}` : address.number ? `${address.number}` : null
	const b = (address.street) ? `${address.street}` : null

	return (a && b) ? `${a} ${b}` : a ? a : b ? b : ''
}

export function readableDate(data?: object_Date, overrideDisplayDateSpecificity?: displayDateSpecificity, endDate?: boolean): ReactNode {
	if (!data) return;

	const startDateText = data.startDate ? moment(data.startDate).tz('America/Toronto').format(overrideDisplayDateSpecificity ?? data.displayDateSpecificity) : ''

	const endDateText = data.endDate ? moment(data.endDate).tz('America/Toronto').format(overrideDisplayDateSpecificity ?? data.displayDateSpecificity) : ''

	const displayEndDate = endDateText && endDate
	return (
		<div>
		<span className= "block" >
		{ startDateText } { displayEndDate ? ':' : '' }
	</span>
	{
		displayEndDate &&
		<span className="block" >
			{ endDateText }
			</span>
	}
	</div>
	);
}