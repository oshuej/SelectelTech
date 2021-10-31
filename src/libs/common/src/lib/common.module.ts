import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterWrapperComponent } from './filter-wrapper/filter-wrapper.component';
import { StTable } from './st-table/st-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { BasicPageLayoutComponent } from './basic-page-layout/basic-page-layout.component';
import { NoDataComponent } from './no-data/no-data.component';

@NgModule({
	imports: [
		CommonModule,
		TableModule,
		InputTextModule,
		FormsModule,
	],
	exports: [
		FilterWrapperComponent,
		StTable,
		BasicPageLayoutComponent,
		NoDataComponent
	],
	declarations: [
		FilterWrapperComponent,
		StTable,
		BasicPageLayoutComponent,
		NoDataComponent
	]
})
export class CommonComponentsModule {}
