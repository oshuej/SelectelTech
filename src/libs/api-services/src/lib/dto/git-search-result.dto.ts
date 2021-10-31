export interface IGitSearchResultDto<T> {
	total_count: number;
	incomplete_results: boolean;
	items: Array<T>;
}
