export interface IColumnConfig {
	header: string;
	ngModelName: string;
	sort: ColumnSortingType;
}

export type ColumnSortingType = 'ASC' | 'DESK' | false;
