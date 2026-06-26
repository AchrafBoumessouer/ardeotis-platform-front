
import { TestBed } from '@angular/core/testing';
import {AuthService} from './auth.service'
import { HttpTestingController, HttpClientTestingModule} from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
describe('AuthService',() => {
    let service:AuthService;
    let httpMock: HttpTestingController

    const api = 'http//localhost:8080/auth';

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers:[AuthService]
        })
    })

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController)
    localStorage.clear()

    afterEach(() => {
        httpMock.verify()
        localStorage.clear()
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })
})