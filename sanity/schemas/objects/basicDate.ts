import { defineType, defineField } from "sanity";
import { FaCalendar } from 'react-icons/fa';

const datetimeOptions = {
	dateFormat: 'YYYY-MM-DD',
	timeFormat: 'HH:mm',
	timeStep: 15,
}

export const basicDate = defineType({
	name: 'basicDate',
	icon: FaCalendar,
	description: 'Date & time settings. Leave End Date blank for dates that do not cover a duration of time.',
	type: 'object',
	options: { collapsible: true, collapsed: true, columns: 2 },
	fields: [
		defineField({
			name: 'displayDateSpecificity',
			title: 'Display Date Specificity',
			type: 'string',
			description: 'The specificity of the date to be displayed.',
			options: {
				list: [
					{ title: 'YYYY-MM-DD, HH:mm', value:'YYYY-MM-DD, HH:mm' },
					{ title: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
					{ title: 'YYYY-MM', value: 'YYYY-MM' },
					{ title: 'YYYY', value: 'YYYY' },
				]
			},
			initialValue: 'YYYY-MM-DD, HH:mm',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'recurrence',
			title: 'Recurrence',
			type: 'string',
			description: 'Recurrence options for the date.',
			options: {
				list: [
					{ title: 'Never', value: '' },
					{ title: 'Daily', value: 'RRULE:FREQ=DAILY;INTERVAL=1' },
					{ title: 'Weekly', value: 'RRULE:FREQ=WEEKLY;INTERVAL=1' },
					{ title: 'Monthly', value: 'RRULE:FREQ=MONTHLY;INTERVAL=1' },
					{ title: 'Yearly', value: 'RRULE:FREQ=YEARLY;INTERVAL=1' },

				]
			},
			initialValue: '',
		}),
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'datetime',
			description: 'The primary date.',
			options: datetimeOptions,
		}),
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'datetime',
			description: 'Set only for dates that span a duration of time.',
			options: datetimeOptions,
			validation: (Rule) => Rule.min(Rule.valueOfField('startDate')).error('End Date cannot be before Start Date!')
		}),
	],
})