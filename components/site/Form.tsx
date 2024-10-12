'use client'

import React, { useState, useRef } from 'react';
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'

export type fieldArgs = {
	label: string
	ref: React.RefObject<HTMLInputElement>
	required?: boolean
}

export type formArgs = {
	submitFn: React.FormEventHandler<HTMLFormElement>
	fields: Array<fieldArgs>
	submitText?: string 
	FormLegend?: React.ReactNode | React.ReactNode[]
	message?: string
	error?: boolean
}

export const Form = ({ submitFn, fields, submitText = 'Submit', FormLegend, message, error }: formArgs) => {

	return (
		<form onSubmit={submitFn} className='w-full'>
			<Fieldset className="flex flex-col w-full gap-6">
				{ FormLegend &&
					<Legend className="text-sm font-bold">
							{ FormLegend }
					</Legend>
				}
				{ fields.map((field) => {
					return <FieldGenerator key={field.label} args={field} />
					})
				}
				<Button
					type="submit"
					className="w-fit px-8 py-2 bg-accent-secondary hover:bg-accent transition-colors duration-300 text-bg"
				>
					{submitText }
				</Button>
				{ message && (
					<div className={`${error ? 'text-accent-failure' : 'text-accent-success'} font-bold drop-shadow`}>
						{ message }
					</div>
				)}
			</Fieldset>
		</form>
	);
};

const FieldGenerator = ({ args }: { args: fieldArgs }) => {
	return (
		<Field className='flex flex-col gap-2'>
			<Label className="block text-accent">{args.label}</Label>
			<Input className="p-2 w-full bg-bg outline-none border border-accent-secondary" name="username" ref={args.ref} required={args.required} />
		</Field>
	)
}

export default Form;