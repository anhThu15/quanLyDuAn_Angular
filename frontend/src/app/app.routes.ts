import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { SiginComponent } from './components/sigin/sigin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardDetailComponent } from './components/dashboard-detail/dashboard-detail.component';
import { GuardGuard } from './components/services/guard.guard';

export const routes: Routes = [
  {path:'', component: IndexComponent},
  {path:'login', component: LoginComponent},
  {path:'sigin', component: SiginComponent},
  {path:'dashboard', component: DashboardComponent,canActivate:[GuardGuard]},
  {path:'dashboard/:id', component: DashboardDetailComponent},
  {path:'**', component: NotfoundComponent}
];
