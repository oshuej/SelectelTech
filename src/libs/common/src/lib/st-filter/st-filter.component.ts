import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFilterConfig } from '@libs/common';

@Component({
	selector: 'st-filter',
	templateUrl: './st-filter.component.html',
	styleUrls: ['./st-filter.component.css']
})
export class StFilter<T> {

	@Input()
	public filterConfig!: IFilterConfig<T>;

	@Output()
	public onFilterChanged: EventEmitter<T> = new EventEmitter<T>();

	constructor() {
	}

	public onApplyClicked(): void {
		if (!this.filterConfig.applyFilterValidator ||
			(!!this.filterConfig.applyFilterValidator && this.filterConfig.applyFilterValidator(this.filterConfig))) {
			this.onFilterChanged.emit(this.filterConfig.resultDto);
		}
	}

}
