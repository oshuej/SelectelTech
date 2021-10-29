export interface GithubSearchResultDto<T> {
	total_count: number;
	incomplete_results: boolean;
	items: Array<T>;
}
