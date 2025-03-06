import { Note } from "../../components/Note";
import { defineType } from "sanity";

export const note = defineType({
	type: 'string',
	name: 'note',
	title: 'Note',
	components: {
		input: Note,
		field: (props) => <>{ props.children } </>,
	},
})