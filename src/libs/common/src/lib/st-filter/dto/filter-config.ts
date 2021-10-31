
export interface IFilterConfig<T> {
	fields: Array<IFilterFieldsConfig<T>>;
	applyFilterValidator: (filterConfig: IFilterConfig<T>) => boolean;
	resultDto: T;
}

export interface IFilterFieldsConfig<T> {
	label: string;
	ngModelName: keyof T;
}
