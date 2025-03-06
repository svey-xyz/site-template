"use client";

import { useCallback, FC} from "react";
import { diffSourcePlugin, codeBlockPlugin, BlockTypeSelect, BoldItalicUnderlineToggles, CreateLink, DiffSourceToggleWrapper, InsertTable, ListsToggle, MDXEditor, MDXEditorMethods, UndoRedo, headingsPlugin, linkDialogPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, quotePlugin, thematicBreakPlugin, toolbarPlugin, Separator, InsertCodeBlock, ChangeCodeMirrorLanguage, ConditionalContents, codeMirrorPlugin, ButtonOrDropdownButton} from "@mdxeditor/editor";
import { PatchEvent, StringInputProps, set, unset, useColorSchemeValue } from "sanity";

interface EditorProps extends StringInputProps {
	markdown?: string;
	editorRef?: React.MutableRefObject<MDXEditorMethods | null>;
}

export const InputMDX: FC<EditorProps> = (props) => {
	const { value, onChange, markdown, editorRef } = props;
	const sanityTheme = useColorSchemeValue()


	const handleChange = useCallback(
		(newValue: string) => {
			onChange(PatchEvent.from(newValue ? set(newValue) : unset()))
		},
		[onChange],
	)

	return (
		<MDXEditor
			className={`${sanityTheme == 'dark' && 'dark dark-editor dark-theme'}`}
			plugins={[
				// Example Plugin Usage
				headingsPlugin(),
				listsPlugin(),
				quotePlugin(),
				thematicBreakPlugin(),
				markdownShortcutPlugin(),
				linkPlugin(),
				linkDialogPlugin(),
				diffSourcePlugin(),
				codeBlockPlugin({ defaultCodeBlockLanguage: 'tsx' }),
				codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', tsx: 'TypeScript JSX', jsx: 'JavaScript JSX', css: 'CSS', properties: 'ENV' } }),
				toolbarPlugin({
					toolbarContents: () => (<>
						<DiffSourceToggleWrapper>
							<ConditionalContents
								options={[
									{ when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
									{
										fallback: () => (<>
											<UndoRedo />

											<Separator />
											<BoldItalicUnderlineToggles />
											<BlockTypeSelect />

											<Separator />
											<CreateLink />
											<ListsToggle />
										

											<Separator />
											<InsertTable />
											<InsertCodeBlock />
											<Separator />

										</>)
									}
								]}
							/>
						</DiffSourceToggleWrapper>


					</>)
				})

			]}
			markdown={value as string || ""}
			onChange={handleChange}
			ref={editorRef}
		/>
	);
}

export default InputMDX;