'use client'

import React, { useState, useRef } from 'react';
import Form, { fieldArgs } from '@components.next-app/Form';
import { ContactInfo } from '@components.next-app/ContactInfo';
import { Contact_block, Settings } from '@next-app/sanity.types';

export const Contact = ({ data, className, siteData }: { data: Contact_block, className?: string, siteData?: Settings }
) => {
	const nameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const messageRef = useRef<HTMLInputElement>(null);

	const [message, setMessage] = useState<string | undefined>();
	const [error, setError] = useState<boolean | undefined>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const formData = {
				name: nameRef.current?.value || '',
				email: emailRef.current?.value || '',
				message: messageRef.current?.value || '',
			};

			let res = await fetch('/api/contact', {
				cache: 'no-store',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(formData)
			});
			const data = await res.json()

			if (!res.ok) {
				setMessage(data.error)
				setError(true)
				return
			}

		} catch (error) {
			setMessage('Error submitting message.')
			setError(true)
		}
	};

	const formFields: Array<fieldArgs> = [
		{
			label: 'Name',
			ref: nameRef
		},
		{
			label: 'Email',
			ref: emailRef
		},
		{
			label: 'Message',
			ref: messageRef
		}
	]

	const ContactLegend = (
		<div className='flex flex-col gap-3'>
			<h3>{ siteData?.title }</h3>
			{ siteData?.contact &&
				<ContactInfo contact={siteData.contact} />
			}
			<p>
				For any inquiries, please fill out this form:
			</p>

		</div>
	)

	return (
		<div className={`${className} flex flex-col`}>
			<Form submitFn={handleSubmit} fields={formFields} FormLegend={ContactLegend} submitText={data?.buttonText} message={message} />
		</div>
	);
};

export default Contact;