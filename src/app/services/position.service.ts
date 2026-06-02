import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class PositionnementService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/positionnements'
    
  

     updateStatus(id: string,object:any): Observable<any> {
     return this.http.put<any>(`${this.apiUrl}/${id}/statut`,object);
    }
}