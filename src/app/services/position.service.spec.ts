
import { TestBed } from '@angular/core/testing';
import {PositionnementService} from './position.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('PositionService',() => {
    let service:PositionnementService;
    let httpMock: HttpTestingController

    const api = 'http//localhost:8080/auth';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[PositionnementService]
        })
    })

    service = TestBed.inject(PositionnementService);
    httpMock = TestBed.inject(HttpTestingController)
   

    afterEach(() => {
        httpMock.verify()
       
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    it('should update status',() =>{
     const id = '123'
     const status = 'ACCEPTE'
     const response = { success : true}
     service.updateStatus(id,status).subscribe(res => {
        expect(res).toEqual(response)
     })
     const req = httpMock.expectOne(`${api}/${id}/status`)
     expect(req.request.method).toBe('PUT')
     expect(req.request.body).toEqual({status})
     req.flush(response)
    })
    
    it('should get historique positionnement', () => {
        const id = 1
        const mockHistorique = [ { commentaire: 'Test  comm'} ] as any

        service.getHistoriquePositionnement(id).subscribe(res => {
            expect(res).toEqual(mockHistorique)
        })
        const req = httpMock.expectOne(`{api}/${id}/historique`)
        expect(req.request.method).toBe('GET')
        req.flush(mockHistorique)
    })

    it('should get positionnemnts', () => {
        const mockPositionnements = [
            {id: 1, status: 'EN_ATTENTE'},
            {id: 2, status: 'ACCEPTE'}
        ]
        service.getPositionnement().subscribe(res => {
            expect(res).toEqual(mockPositionnements)
        })
        const req = httpMock.expectOne(api)
        expect(req.request.method).toBe('GET')
        req.flush(mockPositionnements)
    })
   
})