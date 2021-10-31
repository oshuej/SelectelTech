import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterWrapperComponent } from './filter-wrapper/filter-wrapper.component';
import { ListViewComponent } from './list-view/list-view.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		TableModule,
		InputTextModule,
		FormsModule,
	],
	exports: [FilterWrapperComponent, ListViewComponent],
	declarations: [FilterWrapperComponent, ListViewComponent]
})
export class CommonComponentsModule {}
