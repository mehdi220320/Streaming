import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandpageComponent } from './landpage/landpage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: LandpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
  },


  { path: 'contact', component: ContactusComponent },
  { path: 'admin',
    canActivate: [authGuard],
    data: { role: 'admin' },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
