import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GithubSearchResultDto } from './dto/github-search-result.dto';

@Injectable({
	providedIn: 'root'
})
export class GitPublicApiService {

	constructor(private httpClient: HttpClient) {
	}

	public getRepositories(): Observable<GithubSearchResultDto<any>> {
		let params: HttpParams = new HttpParams();
		params = params.append('q', 'org:oshuej');
		params = params.append('type', 'Repositories');
		params = params.append('per_page', '10');
		params = params.append('page', '1');
		return this.httpClient.get<GithubSearchResultDto<any>>('https://api.github.com/search/repositories', { params });
	}
}
