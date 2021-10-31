
export interface IGitSearchRequestErrorDto {
	documentation_url: string;
	errors: Array<IGitErrorDto>;
	message: string;
}

export interface IGitErrorDto {
	code: string;
	field: string;
	message: string;
	resource: string;
}
