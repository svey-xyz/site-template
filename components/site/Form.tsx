'use client'

import React, { useState, useRef } from 'react';
import { Button, Field, Fieldset, Input, Label, Legend } from '@headlessui/react'

export type fieldArgs = {
	label: string
	ref: React.RefObject<HTMLInputElement | null>
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
					<Legend className="">
							{ FormLegend }
					</Legend>
				}
				{ fields.map((field) => {
					return <FieldGenerator key={field.label} args={field} />
					})
				}
				<Button
					type="submit"
					className="w-fit px-8 py-2"
				>
					{ submitText }
				</Button>
				{ message && (
					<div className={`${error ? 'text-accent-failure' : 'text-accent-success'}`}>
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
			<Label className="block">{args.label}</Label>
			<Input className="p-2 w-full" name="username" ref={args.ref} required={args.required} />
		</Field>
	)
}

export default Form;