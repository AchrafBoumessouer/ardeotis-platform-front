
import { TestBed } from '@angular/core/testing';
import { DashboardService, DashboardStats } from './dashboard.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('MatchingService',() => {
    let service:DashboardService;
    let httpMock: HttpTestingController

    const api = 'http//localhost:8080/api/dashboard';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[DashboardService]
        })
    })

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController)
   

    afterEach(() => {
        httpMock.verify()
       
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should get dashboard sats',() =>{
   const mockStats: DashboardStats = {
    EN_ATTENTE :5,
   } as any
   service.getKPI().subscribe(stats => {
    expect(stats).toEqual(mockStats)
       })
    const req = httpMock.expectOne(`${api}/stats`)
    expect(req.request.method).toBe('GET')
    req.flush(mockStats)
    
    })

 

    
})