import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateMovieComponent } from './create-movie/create-movie.component';
import { CreateSerieComponent } from './create-serie/create-serie.component';

import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ListSerieComponent } from './list-serie/list-serie.component';


@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        UserListComponent,
        SidebarComponent,
        CreateMovieComponent,
        CreateSerieComponent,
        ListMoviesComponent,
        ListSerieComponent
    ],
    exports: [
        AdminComponent
    ],
    imports: [
      CommonModule,
      AdminRoutingModule,
      ReactiveFormsModule
    ]
})
export class AdminModule { }
