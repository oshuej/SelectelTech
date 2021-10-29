import { RouterModule, Routes } from '@angular/router';
import { GitRepositoriesComponent } from './features/git-repositories/git-repositories.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
	{ path: '', redirectTo: '/search', pathMatch: 'full' },
	{ path: 'search', component: GitRepositoriesComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }

