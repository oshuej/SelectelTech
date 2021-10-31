import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGitSearchResultDto } from './dto/git-search-result.dto';
import { GitRepositoriesFilterResultDto } from '../../../../../app/features/git-repositories/dto/git-repositories-filter-result.dto';
import { IGitRepositoriesSearchItemDto } from './dto/git-repositories-search-item.dto';
import { URL_CONSTANTS } from '../../../../../app/constants';

@Injectable({
	providedIn: 'root'
})
export class GitPublicApiService {

	constructor(private httpClient: HttpClient) {
	}

	public getRepositories(gitRepositoriesFilterResultDto: GitRepositoriesFilterResultDto): Observable<IGitSearchResultDto<IGitRepositoriesSearchItemDto>> {
		let params: HttpParams = new HttpParams();
		params = params.append('q', this.getQueryFromFilterDto(gitRepositoriesFilterResultDto));
		params = params.append('type', 'Repositories');
		params = params.append('per_page', '10');
		params = params.append('page', '1');
		return this.httpClient.get<IGitSearchResultDto<IGitRepositoriesSearchItemDto>>(URL_CONSTANTS.GIT_SEARCH.REPOSITORIES, { params });
	}

	private getQueryFromFilterDto(dto: GitRepositoriesFilterResultDto): string {
		return `${dto.repoName} in:name ${!!dto.username && dto.username.length ? dto.username : ''}`;
	}
}
