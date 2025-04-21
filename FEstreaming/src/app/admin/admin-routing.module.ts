import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {UserListComponent} from './user-list/user-list.component';
import {AdminComponent} from './admin.component';
import {CreateMovieComponent} from './create-movie/create-movie.component';
import {CreateSerieComponent} from './create-serie/create-serie.component';
import {ListSerieComponent} from './list-serie/list-serie.component';
import {ListMoviesComponent} from './list-movies/list-movies.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path:'', component: AdminComponent} ,
  { path: 'dashboard', component: DashboardComponent },
  { path: 'users', component: UserListComponent },
  { path: 'createMovie', component: CreateMovieComponent },
  { path: 'createSerie', component: CreateSerieComponent },
  { path: 'series', component: ListSerieComponent },
  { path: 'movies', component: ListMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
