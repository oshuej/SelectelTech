import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GitRepositoriesComponent } from './features/git-repositories/git-repositories.component';
import { CommonComponentsModule } from '@libs/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		GitRepositoriesComponent,
	],
	imports: [
		BrowserModule,
		CommonComponentsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
