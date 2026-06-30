
import { TestBed } from '@angular/core/testing';
import {MissionService} from './mission.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('MissionService',() => {
    let service:MissionService;
    let httpMock: HttpTestingController

    const api = 'http//localhost:8080/auth';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[MissionService]
        })
    })

    service = TestBed.inject(MissionService);
    httpMock = TestBed.inject(HttpTestingController)
   

    afterEach(() => {
        httpMock.verify()
       
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should get all missions with pagination',() =>{
      const mockResponse = {
        content:[],
        totalElements: 0,
        totalPages: 0,
        size: 10,
        number: 0
      }
      service.getAllMissions(0,10).subscribe(res => {
        expect(res).toEqual(mockResponse as any)
      })

      const req = httpMock.expectOne(`${api}?page=0&size=10`)
      expect(req.request.method).toBe('GET')
      req.flush(mockResponse)
    })

     it('should get mission by id ',() =>{
        const mockResponse = { id: '1',title: 'Mission Java Angular'};
        service.getById('1').subscribe(res => {
            expect(res).toEqual(mockResponse as any)
        
        })
    const req = httpMock.expectOne(`${api}/1`)
    expect(req.request.method).toBe('GET')
    req.flush(mockResponse)
    })

    
})