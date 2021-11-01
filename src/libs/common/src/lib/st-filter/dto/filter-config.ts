
export interface IFilterConfig<T> {
	fields: Array<IFilterFieldConfig<T>>;
	resultDto: T;
	applyFilterValidator?: (filterConfig: IFilterConfig<T>) => boolean;
}

export interface IFilterFieldConfig<T> {
	label: string;
	ngModelName: keyof T;
	required?: boolean;
}
