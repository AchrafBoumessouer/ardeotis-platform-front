import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface MissionResponseDto {
    id:string;
    client: string;
    title: string;
    email: string;
    available:boolean;
    status: string;
    skills: string[];
    startDate: Date,
    endDate: Date,   
}
export interface MissionRequestDto {
    client: string;
    title: string;
    email: string;
    available:boolean;
    status: string;
    skills: string[];
    startDate: Date,
    endDate: Date, 
}
export interface PageResponse<T> {
    
    content: T [];
    totalElements: number;
    totalPages: number;
    size:number;
    number: number;
}


@Injectable({
    providedIn: 'root'
})
export class MatchService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/matching/missions'
    
  

     match(id: string): Observable<any> {
     return this.http.get<any>(`${this.apiUrl}/${id}/matching`);
    }
}