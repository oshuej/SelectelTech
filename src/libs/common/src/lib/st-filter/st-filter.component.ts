import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterConfig } from './dto/filter-config';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
	selector: 'st-filter',
	templateUrl: './st-filter.component.html',
	styleUrls: ['./st-filter.component.css']
})
export class StFilter<T> {

	@Input()
	public filterConfig!: FilterConfig<T>;
	@Input()
	public searchInProgress!: boolean;

	@Output()
	public onFilterChanged: EventEmitter<T> = new EventEmitter<T>();

	constructor() {
	}

	public getErrorMessage(control: AbstractControl): string {
		return COMMON_ERRORS_HANDLERS[Object.keys((<ValidationErrors>control.errors))[0]](control);
	}

	public onSubmit(): void {
		this.onFilterChanged.emit(this.filterConfig.resultDto);
	}

}


// todo should be moved to the library in the future
export const COMMON_ERRORS_HANDLERS: { [p: string]: (control: AbstractControl) => string } = {
	minlength: (control) => `The minimum length is ${control.getError('minlength').requiredLength} Characters!`,
	pattern: (control) => `Only the following characters are allowed: ${control.getError('pattern').requiredPattern}`,
	required: () => 'Field is Required'
}
