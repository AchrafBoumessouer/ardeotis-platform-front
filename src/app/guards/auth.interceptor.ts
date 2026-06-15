import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";
import {MatSnackBar} from '@angular/material/snack-bar'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('token');
    const snackbar = inject(MatSnackBar);
    const router = inject(Router);
    
    if(token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned);
    }
    return next(req).pipe(
        catchError((error : HttpErrorResponse) => {
            let message = 'Une erreur est survenue';
            if(error.status === 0){
                message = 'Impossible de joindre le serveur'
            } else if(error.status === 401){
                localStorage.removeItem('token')
                router.navigate(['/login']);
            } else if(error.status === 403){
                message = "Vous n'avez pas le droit"
            } else if( error.status >= 400 && error.status < 500) {
                message = error.error?.message || 'Erreur lors de la reqsute '
            } else if(error.status >= 500){
                message = 'Erreur serveur veuillez réessayer'
            }

            snackbar.open(message, 'Fermer', {
                duration: 5000,
                horizontalPosition: 'right',
                verticalPosition: 'top'
            })
            return throwError(() => error);
        })
    );
}