import { Component, Input, OnInit } from '@angular/core';
import { IColumnConfig } from './dto/IColumnConfig';

@Component({
	selector: 'st-table',
	templateUrl: './st-table.component.html',
	styleUrls: ['./st-table.component.css']
})
export class StTable implements OnInit {

	@Input()
	public data!: any[];
	@Input()
	public columns!: Array<IColumnConfig>;

	constructor() { }

	ngOnInit(): void {
	}

}
