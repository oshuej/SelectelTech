import { Component, OnDestroy, OnInit } from '@angular/core';
import { GitPublicApiService, IGitSearchRequestErrorDto } from '@libs/services';
import { catchError, finalize, takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import {
	IColumnConfig,
	IFilterConfig,
	StConfigurableModalConfig,
	StConfigurableModalComponent,
	StConfigurableModalButtonConfig
} from '@libs/common';
import { GitRepositoriesFilterResultDto } from './dto/git-repositories-filter-result.dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';

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

	public filterConfig!: IFilterConfig<GitRepositoriesFilterResultDto>;

	private openedModal!: DynamicDialogRef;
	private destroy$: Subject<void> = new Subject<void>();

	constructor(private gitPublicApiService: GitPublicApiService,
	            private dialogService: DialogService) {
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

	private loadRepositories(): void {
		this.isLoading = true;
		this.gitPublicApiService.getRepositories(this.filterConfig.resultDto)
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

	private applyFilterValidator = (filterConfig: IFilterConfig<GitRepositoriesFilterResultDto>): boolean => {
		return !!filterConfig.resultDto.repoName && filterConfig.resultDto.repoName.length > 2;
	}

	private initFilterConfig(): void {
		this.filterConfig = {
			fields: [
				{ label: 'Username', ngModelName: 'username', required: false },
				{ label: 'Repository Name', ngModelName: 'repoName', required: true }
			],
			resultDto: GitRepositoriesFilterResultDto.getDefaultDto(),
			applyFilterValidator: this.applyFilterValidator
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
}
