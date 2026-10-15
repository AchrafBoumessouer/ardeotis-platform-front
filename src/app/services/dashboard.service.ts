import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface DashboardStats {
    consultants: ConsultantStats;
    missions: MissionStats;
    positionnements: PositionnementStats;
}

export interface ConsultantStats {
    AVAILABLE: number;
    ON_MISSION: number;
    UNAVAILABLE: number;
}

export interface MissionStats {
    ACTIVE: number;
    ARCHIVED: number;
}

export interface PositionnementStats {
    INTERET_EXPRIME: number;
    PRESENTE_AU_CLIENT: number;
    RETOUR_CLIENT_EN_ATTENTE: number;
    REFUSE: number;
    VALIDEE: number;
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/dashboard'
     

    getKPI() {
        return this.http.get<DashboardStats>(`${this.apiUrl}/stats`);
    }

   

}