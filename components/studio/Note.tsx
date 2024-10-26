import React from 'react';
import { Card, Text, Flex, Box, Inline, Heading, ThemeColorToneKey } from '@sanity/ui'
import { defineType, InputProps } from 'sanity';
import startCase from 'lodash/startCase'

export const Note = (args: InputProps) => {
	const { title, description, options } = args.schemaType

	const pathId = args.path[args.path?.length - 1] as any as string

	const displayTitle = startCase(pathId) === title ? null : title
	const icon = options?.icon
	const tone = options?.tone ?? 'primary'

	// bail if nothing was set
	if (!displayTitle && !description) return null
	const CustomIcon = icon as React.ElementType

	return (
		<Card padding={[3, 3, 4]} radius={2} shadow={1} tone={tone}>
			{displayTitle && (
				<Box marginBottom={description ? 2 : 0}>
					<Inline space={1}>
						{icon && <CustomIcon />}
						<Heading size={1}>{displayTitle}</Heading>
					</Inline>
				</Box>
			)}

			{ description && (
				<Flex align="center">
					<Box style={{ flexShrink: 0, lineHeight: 0 }}>
						{icon && !displayTitle && <CustomIcon style={{ fontSize: 24 }} />}
					</Box>
					<Box
						marginLeft={displayTitle ? 0 : 3}
						marginTop={!icon && displayTitle ? 1 : 0}
					>
						<Text size={[1, 1, 1]}>{description}</Text>
					</Box>
				</Flex>
			)}
		</Card>
	);
}

Note.displayName = 'Note'

// export default Note;