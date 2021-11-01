
export class FilterConfig<T> {
	fields!: Array<FilterConfigFieldsAllowedTypes<T>>;
	resultDto!: T;
}

export type FilterConfigFieldsAllowedTypes<T> = FilterTextFieldConfig<T>;

export abstract class FilterFieldConfig<T> {
	label: string;
	ngModelName: Extract<keyof T, string>;
	required: boolean;

	protected constructor(label: string, ngModelName: Extract<keyof T, string>, required?: boolean) {
		this.label = label;
		this.ngModelName = ngModelName;
		this.required = !!required;
	}

	public static init<T>(params: FilterFieldConfig<T>): FilterFieldConfig<T> {
		throw new Error(`${FilterFieldConfig.name}: init must be implemented in extended classes!`);
	}
}

export class FilterTextFieldConfig<T> extends FilterFieldConfig<T> {
	public minLength!: number;
	public maxLength!: number;
	public pattern!: string | RegExp;

	constructor(label: string, ngModelName: Extract<keyof T, string>, required?: boolean) {
		super(label, ngModelName, required);
	}

	public static init<T>(params: FilterFieldConfig<T> | FilterTextFieldConfig<T>): FilterTextFieldConfig<T> {
		const config: FilterTextFieldConfig<T> = new FilterTextFieldConfig<T>(
			params.label,
			params.ngModelName,
			params.required
		);
		config.minLength = (<FilterTextFieldConfig<T>> params).minLength || 0;
		config.maxLength = (<FilterTextFieldConfig<T>> params).maxLength || 40;
		config.pattern = (<FilterTextFieldConfig<T>> params).pattern || '';
		return config;
	}
}
