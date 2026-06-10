import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface DashboardStats {
    consultantDisponibles: number;
    missionOuvertes: number;
    positionnementsEncours: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/dashboard'
     

    getStats() {
        return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
    }

   

}