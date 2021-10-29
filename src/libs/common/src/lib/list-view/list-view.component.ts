import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

	@Input()
	public testTitle: string | null = null;

	constructor() { }

	ngOnInit(): void {
	}

}
