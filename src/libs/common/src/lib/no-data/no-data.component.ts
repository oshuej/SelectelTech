import { Component, Input } from '@angular/core';

@Component({
	selector: 'no-data',
	templateUrl: './no-data.component.html',
	styleUrls: ['./no-data.component.css']
})
export class NoDataComponent {

	@Input()
	public isLoading = false;

	constructor() { }

}
