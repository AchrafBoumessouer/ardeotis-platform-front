
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

    it('should login an store token in localstorage',() =>{
        const mockResponse = { token: 'fake'};
        service.login('test@fmail.com','test').subscribe(res => {
            expect(res).toEqual(mockResponse);
            expect(localStorage.getItem('token')).toBe('fake')
        })
    const req = httpMock.expectOne(`${api}/login`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({
        email: 'test@fmail.com',
        password: 'test'
    })
    req.flush(mockResponse)
    })

     it('should reggister and store token on localstorage',() =>{
        const mockResponse = { token: 'fake'};
        service.register('test@gmail.com','test','achraf','bms').subscribe(res => {
            expect(res).toEqual(mockResponse)
            expect(localStorage.getItem('token')).toBe('token')
        })
    const req = httpMock.expectOne(`${api}/register`)
    expect(req.request.method).toBe('POST')
    expect(req.request.body).toEqual({
        email: 'test@fmail.com',
        password: 'test',
        firstName:'achraf',
        lastName:'bms'
    })
    req.flush(mockResponse)
    })

     it('should return null when token does not exist',() =>{
      
    expect(service.getToken).toBeNull()
    
    })

      it('should return true when user is authenticated',() =>{
      localStorage.setItem('token', 'token')
    expect(service.isAuthenticated).toBeTrue()
    
    })

    
})