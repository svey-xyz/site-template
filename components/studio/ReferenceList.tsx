import client from '@/sanity/lib/client';
import groq from 'groq';
import React, { useEffect, useState } from 'react';

type doc = {
	_type: string
	_id: string
	title: string
}

export const ReferenceList = ({ documentId } : { documentId : string }) => {
	const [referencingDocs, setReferencingDocs] = useState<Array<doc>>();

	useEffect(() => {
		// GROQ query to fetch documents that reference the current document
		const query = groq`*[references($documentId)]{
      _id,
			_type,
      title
    }`;

		// Fetch referencing documents
		client.fetch(query, { documentId }).then((docs: Array<doc>) => {
			setReferencingDocs(docs);
		});
	}, [documentId]);

	return (
		<div className='main-padding my-8'>
			<div className='flex flex-col gap-2'>
				<h2 className='text-lg font-black'>Referenced In:</h2>

				{(referencingDocs && referencingDocs.length > 0) ? (
					<ul>
						{referencingDocs.map((doc) => {
							return (
								<li key={doc._id}>{doc.title}</li>
							)
						})}
					</ul>
				) : (
					<p>No documents reference this document.</p>
				)}
			</div>
		</div>
	);
};