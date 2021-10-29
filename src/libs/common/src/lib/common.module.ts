import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterWrapperComponent } from './filter-wrapper/filter-wrapper.component';
import { ListViewComponent } from './list-view/list-view.component';
import { TableModule } from 'primeng/table';

@NgModule({
	imports: [
		CommonModule,
		TableModule,
	],
	exports: [FilterWrapperComponent, ListViewComponent],
	declarations: [FilterWrapperComponent, ListViewComponent]
})
export class CommonComponentsModule {}
