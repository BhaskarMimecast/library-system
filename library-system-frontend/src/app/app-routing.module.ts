import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorListComponent } from './author-list/author-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'create', component: AuthorComponent },
  { path: 'details', component: AuthorDetailsComponent },
  { path: 'author-all', component: AuthorListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}