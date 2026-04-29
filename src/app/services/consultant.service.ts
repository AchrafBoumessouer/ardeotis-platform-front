import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ConsultantResponseDto {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    available:boolean;
    status: ConsultantStatus;
    skills: string[];
}
export interface ConsultantRequestDto {
    
    firstName: string;
    lastName: string;
    email: string;
    available:boolean;
    status: ConsultantStatus;
    skills: string[];
}

export enum ConsultantStatus{
AVAILABLE,
ON_MISSION,
UNAVAILABLE
}

@Injectable({
    providedIn: 'root'
})
export class ConsultantService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/v1/consultants'
    
    getAll(): Observable<ConsultantResponseDto[]> {
     return this.http.get<ConsultantResponseDto[]>(this.apiUrl);
    }

    getById(id: string): Observable<ConsultantResponseDto> {
     return this.http.get<ConsultantResponseDto>(`${this.apiUrl}/${id}`);
    }

    create(request:ConsultantRequestDto): Observable<ConsultantRequestDto> {
     return this.http.post<ConsultantResponseDto>(this.apiUrl, request);
    }

     update(id:string,request:ConsultantRequestDto): Observable<ConsultantRequestDto> {
     return this.http.put<ConsultantResponseDto>(`${this.apiUrl}/${id}`, request);
    }

    delete(id: string): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}