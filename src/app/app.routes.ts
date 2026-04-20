import { Routes } from '@angular/router';
import { Home } from './faetures/home/pages/home/home';
import { AuthLoginComponent } from './faetures/auth-login/auth-login.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLoginComponent
    }
];
