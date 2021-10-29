import { Component, Input, OnInit } from '@angular/core';
import { ColumnDto } from '@libs/common';

@Component({
	selector: 'list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

	@Input()
	public data: any[] = [];
	@Input()
	public totalCount: number | undefined;
	@Input()
	public columns: ColumnDto[] = [];

	constructor() { }

	ngOnInit(): void {
	}

}
