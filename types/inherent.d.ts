export interface _inherentObjectData {
	_key?: string,
	_type: string,
}

export interface _inherentDocumentData {
	_updatedAt: string,
	_createdAt: string,
	_rev: string,
	_type: string,
	_id: string
}

export interface _referenceData {
	_type: "reference",
	_ref: string,
	_weak?: boolean
}