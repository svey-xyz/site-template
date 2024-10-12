'use client';

import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const NewsletterForm = ({stacked, className}:{stacked?:boolean,className?:string}) => {
	const uuid = uuidv4();

	const [email, setEmail] = useState<string>('')
	const [error, setError] = useState<boolean>(false)

	const handleChange = (value: string) => {
		setEmail(value)
		setError(false)
	}

	const handleSubmit = () => {
		const check = !/^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(
			email
		);

		if (check) {
			setError(true)
		}
	}
	return (
		<form
			name='newsletter'
			method='post'
			className={`${ className } ${ stacked ? 'flex-col' : 'flex-row' } flex relative w-full gap-4`}>
			<label
				className=''
				htmlFor={`email-field-${uuid}`}
				hidden={true}
			>
				Email
			</label>
			<input
				id={`email-field-${uuid}`}
				type='email'
				name='email'
				required={true}
				className={`bg-bg py-1 px-3 w-full`}
				placeholder="Email"
				value={email}
				onChange={e => { handleChange(e.target.value); }}
			/>
			<button
				className='py-1 px-10'
				onClick={() => { handleSubmit(); }}
				type='submit'
			>
				Submit
			</button>
		</form>
	);
};

export default NewsletterForm;