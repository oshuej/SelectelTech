import { Component, Input, OnInit } from '@angular/core';
import { IColumnDto } from '@libs/common';

@Component({
	selector: 'list-view',
	templateUrl: './list-view.component.html',
	styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {

	@Input()
	public data!: any[];
	@Input()
	public totalCount!: number;
	@Input()
	public columns!: Array<IColumnDto>;

	constructor() { }

	ngOnInit(): void {
	}

}
