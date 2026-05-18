import { Routes } from '@angular/router';
import { Home } from './faetures/home/pages/home/home';
import { AuthLoginComponent } from './faetures/auth-login/auth-login.component';
import { AuthRegisterComponent } from './faetures/auth-register/auth-register.component';
import { DefaultComponent } from './faetures/dashboard/default/default.component';
import { AdminLayout } from './faetures/theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './faetures/theme/layouts/guest-layout/guest-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { MissionComponent } from './faetures/dashboard/mission/mission.component';

export const routes: Routes = [
 {
    path: '',
    component: AdminLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        component: DefaultComponent
      },
       {
        path: 'dashboard/missions',
        component: MissionComponent
      },
      {
         path: 'home',
        component: Home
      }
     
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginComponent
      },
      {
        path: 'register',
        component: AuthRegisterComponent
      }
    ]
  },
  {
        path: 'register',
        redirectTo: '/dashboard/default',
  }

];
