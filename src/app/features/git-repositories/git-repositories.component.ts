import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitPublicApiService, IGitSearchRequestErrorDto, IPageInfoDto } from '@libs/services';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import {
	IColumnConfig,
	FilterConfig,
	StConfigurableModalConfig,
	StConfigurableModalComponent,
	StConfigurableModalButtonConfig, FilterTextFieldConfig
} from '@libs/common';
import { GitRepositoriesFilterResultDto } from './dto/git-repositories-filter-result.dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'git-repositories',
	templateUrl: './git-repositories.component.html',
	styleUrls: ['./git-repositories.component.css'],
	providers: [DialogService]
})
export class GitRepositoriesComponent implements OnInit, OnDestroy {

	public repositories: Array<any> = [];
	public totalCount: number = 0;
	public isLoading = true;
	public hasData = false;

	public columns!: Array<IColumnConfig>;

	public filterConfig!: FilterConfig<GitRepositoriesFilterResultDto>;
	public pageInfo: IPageInfoDto = { page: 1, perPage: 10, firstElementOnPage: 0 };
	public rowsPerPageOptions: number[] = [this.pageInfo.perPage, this.pageInfo.perPage * 2, this.pageInfo.perPage * 3]

	private openedModal!: DynamicDialogRef;
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private gitPublicApiService: GitPublicApiService,
	            private dialogService: DialogService,
	            private router: Router,
	            private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.initColumns();
		this.initFilterConfig();
		this.loadRepositories();
	}

	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public onFilterChanged(): void {
		this.loadRepositories();
	}

	public paginate(pagination: IPagination): void {
		this.pageInfo.perPage = pagination.rows;
		this.pageInfo.page = pagination.page + 1; // +1 because paginator starts counting at 0, by github api at 1
		this.pageInfo.firstElementOnPage = pagination.first;
		this.loadRepositories();
	}

	private loadRepositories(): void {
		this.isLoading = true;
		this.setFilterResultDtoQueryToUrl();
		this.gitPublicApiService.getRepositories(this.filterConfig.resultDto, this.pageInfo)
			.pipe(
				finalize(() => {
					this.isLoading = false;
				}),
				catchError((error: HttpErrorResponse, caught) => {
					console.warn(error);
					this.openErrorModal(error);
					return of(null);
				}),
				takeUntil(this.destroy$),
			)
			.subscribe((data) => {
				if (!!data) {
					this.repositories = data.items;
					this.totalCount = data.total_count;
				} else {
					this.repositories = [];
					this.totalCount = 0;
				}
				this.hasData = !!this.repositories && this.repositories.length > 0;
			});
	}

	private openErrorModal(error: HttpErrorResponse): void {
		const modalConfig: StConfigurableModalConfig = new StConfigurableModalConfig();
		modalConfig.body = this.getModalBodyByError(error);
		modalConfig.buttons = this.getModalButtons();
		this.openedModal = this.dialogService.open(StConfigurableModalComponent, {
			header: 'Something went wrong',
			data: modalConfig,
			width: '40%',
			contentStyle: {"max-height": "500px", "overflow": "auto"},
			baseZIndex: 10000
		});
	}

	private initColumns(): void {
		this.columns = [
			{
				header: 'Repository name',
				ngModelName: 'name',
				sort: false
			},
			{
				header: 'Score',
				ngModelName: 'stargazers_count',
				sort: false
			}
		]
	}

	private initFilterConfig(): void {
		this.filterConfig = {
			fields: [
				FilterTextFieldConfig.init<GitRepositoriesFilterResultDto>(
					{ label: 'Username', ngModelName: 'username', required: false }
				),
				FilterTextFieldConfig.init<GitRepositoriesFilterResultDto>(
					{ label: 'Repository Name', ngModelName: 'repoName', required: true, minLength: 3 }
				)
			],
			resultDto: GitRepositoriesFilterResultDto.getDefaultDto()
		}
	}

	private getModalBodyByError(httpErrorResponse: HttpErrorResponse): string {
		return `
			<div>Error Info:</div>
			<div>
				<span>Status: ${httpErrorResponse.status}</span>
				<span>Message: ${(httpErrorResponse.error as IGitSearchRequestErrorDto).message}</span>
			</div>
		`;
	}

	private getModalButtons(): Array<StConfigurableModalButtonConfig> {
		return [
			StConfigurableModalButtonConfig.init({
				text: 'Ok',
				cssClass: 'submit-button',
				callback: () => this.closeModal()
			}),
			StConfigurableModalButtonConfig.init({
				text: 'Ok, Try Again',
				cssClass: 'submit-button',
				callback: () => {
					this.closeModal();
					this.loadRepositories();
				}
			})
		];
	}

	private closeModal(): void {
		this.openedModal.close();
	}

	private setFilterResultDtoQueryToUrl(): void {
		const queryParamsFromFilter: Partial<GitRepositoriesFilterResultDto> = new GitRepositoriesFilterResultDto();
		this.filterConfig.fields.forEach((field) => {
			if (!!this.filterConfig.resultDto[field.ngModelName] && this.filterConfig.resultDto[field.ngModelName]?.length) {
				queryParamsFromFilter[field.ngModelName] = this.filterConfig.resultDto[field.ngModelName];
			}
		});
		this.router.navigate(['.'], {
			relativeTo: this.activatedRoute, queryParams: queryParamsFromFilter
		});
	}
}

interface IPagination {
	first: number;
	page: number;
	pageCount: number;
	rows: number;
}
