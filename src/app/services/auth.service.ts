import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    private API = 'http://localhost:8080/auth';

    constructor(private http: HttpClient){}

    login(username: string, password: string){
        return  this.http.post<any>(`${this.API}/login`, {
            username,
            password
        }).pipe( tap( response => { localStorage.setItem('token', response.token);

        }));
    }

    getToken(): string | null {
     return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem('token');
    }

}