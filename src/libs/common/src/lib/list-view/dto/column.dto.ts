export interface ColumnDto {
	header: string;
	ngModelName: string;
	sort: ColumnSortingType;
}

export type ColumnSortingType = 'ASC' | 'DESK' | false;
