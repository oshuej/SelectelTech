import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterWrapperComponent } from './filter-wrapper/filter-wrapper.component';
import { ListViewComponent } from './list-view/list-view.component';
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
		ListViewComponent,
		BasicPageLayoutComponent,
		NoDataComponent
	],
	declarations: [
		FilterWrapperComponent,
		ListViewComponent,
		BasicPageLayoutComponent,
		NoDataComponent
	]
})
export class CommonComponentsModule {}
