import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilterConfig } from '@libs/common';

@Component({
	selector: 'filter-wrapper',
	templateUrl: './filter-wrapper.component.html',
	styleUrls: ['./filter-wrapper.component.css']
})
export class FilterWrapperComponent<T> {

	@Input()
	public filterConfig!: IFilterConfig<T>;

	@Output()
	public onFilterChanged: EventEmitter<T> = new EventEmitter<T>();

	constructor() {
	}

	public onApplyClicked(): void {
		if (!!this.filterConfig.applyFilterValidator && this.filterConfig.applyFilterValidator(this.filterConfig)) {
			this.onFilterChanged.emit(this.filterConfig.resultDto);
		}
	}

}
