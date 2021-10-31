import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitPublicApiService } from '@libs/services';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { ColumnDto } from '@libs/common';

@Component({
	selector: 'git-repositories',
	templateUrl: './git-repositories.component.html',
	styleUrls: ['./git-repositories.component.css']
})
export class GitRepositoriesComponent implements OnInit, OnDestroy {

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
	];

	private destroy$ = new Subject<void>();

	constructor(private gitPublicApiService: GitPublicApiService) {
	}

	ngOnInit(): void {
		this.loadRepositories();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	private loadRepositories(): void {
		this.isLoading = true;
		this.gitPublicApiService.getRepositories(this.filterConfig.resultDto)
			.pipe(
				finalize(() => {
					this.isLoading = false;
					this.hasData = !!this.repositories && this.repositories.length > 0;
				}),
				catchError((error, caught) => {
					console.warn(error);
					// TODO ADD EROR HANDLER WITH MODAL
					return of(null);
				}),
				takeUntil(this.destroy$),
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
