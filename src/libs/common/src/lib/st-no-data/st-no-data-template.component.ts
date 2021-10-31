import { Component, Input } from '@angular/core';

@Component({
	selector: 'st-no-data',
	templateUrl: './st-no-data-template.component.html',
	styleUrls: ['./st-no-data-template.component.css']
})
export class StNoDataTemplate {

	@Input()
	public isLoading = false;

	constructor() { }

}
