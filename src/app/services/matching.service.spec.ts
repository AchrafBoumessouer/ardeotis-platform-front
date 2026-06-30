
import { TestBed } from '@angular/core/testing';
import {MatchService} from './matching.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('MatchingService',() => {
    let service:MatchService;
    let httpMock: HttpTestingController

    const api = 'http//localhost:8080/api/matching/missions';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[MatchService]
        })
    })

    service = TestBed.inject(MatchService);
    httpMock = TestBed.inject(HttpTestingController)
   

    afterEach(() => {
        httpMock.verify()
       
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should call match API',() =>{
      const id = '1'
      const mockResponse = {
        score: 95,
        competences : ['java', 'angular']
      }
      service.match(id).subscribe(res => {
        expect(res).toEqual(mockResponse)
      })
      const req = httpMock.expectOne(`${api}/${id}/matching`)
      expect(req.request.method).toBe('GET')

      req.flush(mockResponse)
    })

 

    
})