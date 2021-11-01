import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGitSearchResultDto } from './dto/git-search-result.dto';
import { GitRepositoriesFilterResultDto } from '../../../../../app/features/git-repositories/dto/git-repositories-filter-result.dto';
import { IGitRepositoriesSearchItemDto } from './dto/git-repositories-search-item.dto';
import { URL_CONSTANTS } from '../../../../../app/constants';
import { IPageInfoDto } from './dto/page-info.dto';

@Injectable({
	providedIn: 'root'
})
export class GitPublicApiService {

	constructor(private httpClient: HttpClient) {
	}

	public getRepositories(gitRepositoriesFilterResultDto: GitRepositoriesFilterResultDto,
	                       pageInfo: IPageInfoDto): Observable<IGitSearchResultDto<IGitRepositoriesSearchItemDto>> {
		let params: HttpParams = new HttpParams();
		params = params.append('q', this.getQueryFromFilterDto(gitRepositoriesFilterResultDto));
		params = params.append('type', 'Repositories');
		params = params.append('per_page', pageInfo.perPage);
		params = params.append('page', pageInfo.page);
		const headers: HttpHeaders = new HttpHeaders({ accept: 'application/vnd.github.v3+json' });
		return this.httpClient.get<IGitSearchResultDto<IGitRepositoriesSearchItemDto>>(URL_CONSTANTS.GIT_SEARCH.REPOSITORIES, { params, headers });
	}

	private getQueryFromFilterDto(dto: GitRepositoriesFilterResultDto): string {
		return `${dto.repoName} in:name ${!!dto.username && dto.username.length ? dto.username : ''}`;
	}
}
