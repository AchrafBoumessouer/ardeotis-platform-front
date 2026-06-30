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
export class MissionService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/v1/missions'
    
    getAllMissions(page: number, size: number): Observable<PageResponse<MissionResponseDto>> {
     return this.http.get<PageResponse<MissionResponseDto>>(this.apiUrl, { params: { page, size}});
    }

    getById(id: string): Observable<MissionResponseDto> {
     return this.http.get<MissionResponseDto>(`${this.apiUrl}/${id}`);
    }

    create(request:MissionRequestDto): Observable<MissionRequestDto> {
     return this.http.post<MissionResponseDto>(this.apiUrl, request);
    }

     update(id:string,request:MissionRequestDto): Observable<MissionRequestDto> {
     return this.http.put<MissionResponseDto>(`${this.apiUrl}/${id}`, request);
    }

    delete(id: string): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

     archive(id: string): Observable<void> {
     return this.http.put<void>(`${this.apiUrl}/${id}/archive`,{});
    }
}