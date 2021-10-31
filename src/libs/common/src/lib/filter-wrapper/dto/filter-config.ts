
export interface IFilterConfig<T> {
	fields: Array<IFilterFieldsConfig>;
	applyFilterValidator: (filterConfig: IFilterConfig<T>) => boolean;
	resultDto: T;
}

export interface IFilterFieldsConfig {
	label: string;
	ngModelName: string;
}
