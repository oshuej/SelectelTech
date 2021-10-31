
export interface IFilterConfig<T> {
	fields: Array<IFilterFieldsConfig<T>>;
	resultDto: T;
	applyFilterValidator?: (filterConfig: IFilterConfig<T>) => boolean;
}

export interface IFilterFieldsConfig<T> {
	label: string;
	ngModelName: keyof T;
}
