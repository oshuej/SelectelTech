import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ListViewComponent } from './list-view/list-view.component';

@NgModule({
	imports: [
		CommonModule,
	],
	exports: [FilterComponent, ListViewComponent],
	declarations: [FilterComponent, ListViewComponent]
})
export class CommonComponentsModule {}
