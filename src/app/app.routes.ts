import { Routes } from '@angular/router';
import { Home } from './faetures/home/pages/home/home';
import { AuthLoginComponent } from './faetures/auth-login/auth-login.component';
import { AuthRegisterComponent } from './faetures/auth-register/auth-register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        component: AuthRegisterComponent
    },
     {
        path: 'login',
        component: AuthLoginComponent
    },
      {
        path: 'home',
        component: Home
    },
     {
        path: '**',
        redirectTo: 'login'
    },
    

];
