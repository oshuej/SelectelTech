import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StFilter } from './st-filter/st-filter.component';
import { StTable } from './st-table/st-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { StBasicPageLayout } from './st-basic-page-layout/st-basic-page-layout.component';
import { StNoDataTemplate } from './st-no-data/st-no-data-template.component';

@NgModule({
	imports: [
		CommonModule,
		TableModule,
		InputTextModule,
		FormsModule,
	],
	exports: [
		StFilter,
		StTable,
		StBasicPageLayout,
		StNoDataTemplate
	],
	declarations: [
		StFilter,
		StTable,
		StBasicPageLayout,
		StNoDataTemplate
	]
})
export class CommonComponentsModule {}
