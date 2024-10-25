"use client";

import { forwardRef, useCallback, FC} from "react";
import { BoldItalicUnderlineToggles, MDXEditor, MDXEditorMethods, UndoRedo, headingsPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin } from "@mdxeditor/editor";
import { PatchEvent, StringInputProps, set, unset } from "sanity";

interface EditorProps extends StringInputProps {
	markdown?: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export const InputMDX: FC<EditorProps> = (props) => {
	const { value, onChange, markdown, editorRef } = props;

	const handleChange = useCallback(
		(newValue: string) => {
			onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
		},
		[onChange],
	)

	return (
		<MDXEditor
			className=""
			plugins={[
				// Example Plugin Usage
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				toolbarPlugin({
					toolbarContents: () => (
						<>
							{' '}
							<UndoRedo />
							<BoldItalicUnderlineToggles />
						</>
					)
				})

			]}
			markdown={value as string || ""}
			onChange={handleChange}
			ref={editorRef}
		/>
	);
}

export default InputMDX;