import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface HistoriquePositionnement {
    id: number;
    ancienStatus: string;
    newStatus: string;
    dateChangement: string;
    commentatire: string;
}

@Injectable({
    providedIn: 'root'
})
export class PositionnementService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/positionnements'
    
  
     updateStatus(id: string,status:any): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}/${id}/status`,{status});
    }

    getHistoriquePositionnement(id: number) {
        return this.http.get<HistoriquePositionnement[]>(`${this.apiUrl}/positionnements/${id}/historique`);
    }
}