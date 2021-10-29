import { Component, OnInit } from '@angular/core';
import { GitPublicApiService } from '@libs/services';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { ColumnDto } from '@libs/common';

@Component({
	selector: 'git-repositories',
	templateUrl: './git-repositories.component.html',
	styleUrls: ['./git-repositories.component.css']
})
export class GitRepositoriesComponent implements OnInit {

	public repositories: Array<any> = [];
	public totalCount: number = 0;
	public isLoading = true;
	public hasData = false;

	public columns: ColumnDto[] = [
		{
			header: 'Repository name',
			ngModelName: 'name',
			sort: false
		},
		{
			header: 'Score',
			ngModelName: 'score',
			sort: false
		}
	]

	constructor(private gitPublicApiService: GitPublicApiService) {
	}

	ngOnInit(): void {
		this.loadRepositories();
	}

	private loadRepositories(): void {
		this.isLoading = true;
		this.gitPublicApiService.getRepositories()
			.pipe(
				finalize(() => {
					this.isLoading = false;
					this.hasData = !!this.repositories && this.repositories.length > 0;
				}),
				catchError((error, caught) => {
					console.warn(error);
					// TODO ADD EROR HANDLER WITH MODAL
					return of(null);
				})
			).subscribe((data) => {
				if (!!data) {
					this.repositories = data.items;
					this.totalCount = data.total_count;
				} else {
					this.repositories = [];
					this.totalCount = 0;
				}
			});
	}
}
