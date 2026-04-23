import { Routes } from '@angular/router';
import { Home } from './faetures/home/pages/home/home';
import { AuthLoginComponent } from './faetures/auth-login/auth-login.component';
import { AuthRegisterComponent } from './faetures/auth-register/auth-register.component';
import { DefaultComponent } from './faetures/dashboard/default/default.component';
import { AdminLayout } from './faetures/theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './faetures/theme/layouts/guest-layout/guest-layout.component';

export const routes: Routes = [
 {
    path: '',
    component: AdminLayout,
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
