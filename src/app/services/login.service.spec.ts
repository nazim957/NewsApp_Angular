import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Login } from '../model/login';
import { LoginService } from './login.service';
import { LoginResponse } from '../components/login/login.component';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });

    // Inject the service (which imports the HttpClient) and the Test Controller
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate token and return response', () => {
    const loginData: Login = {
      email: 'nazim@gmail.com',
      password: 'nazim@123',
    };

    const mockResponse: LoginResponse = {
      message: 'Login successful',
      userName: 'testuser',
      role: 'user',
      email: 'nazim@gmail.com',
      token: 'testtoken',
    };

    service.generateToken(loginData).subscribe((response: LoginResponse) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:9090/api/v2/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should set and get user details in local storage', () => {
    const userName = 'testuser';
    const userEmail = 'nazim@gmail.com';
    const userRole = 'user';

    service.setUserName(userName);
    service.setEmail(userEmail);
    service.setRole(userRole);

    expect(service.getUserName()).toEqual(userName);
    expect(service.getUserEmail()).toEqual(userEmail);
    expect(service.getUserRole()).toEqual(userRole);
  });

  it('should check if the user is logged in', () => {
    localStorage.setItem('token', 'testtoken');
    expect(service.isLockedIn()).toBe(true);

    localStorage.removeItem('token');
    expect(service.isLockedIn()).toBe(false);
  });

  it('should logout user and clear local storage', () => {
    localStorage.setItem('token', 'testtoken');
    localStorage.setItem('user', 'testuser');
    localStorage.setItem('userName', 'testuser');
    localStorage.setItem('email', 'nazim@gmail.com');
    localStorage.setItem('role', 'user');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
    expect(localStorage.getItem('email')).toBeNull();
    expect(localStorage.getItem('role')).toBeNull();
  });

  it('should get token from local storage', () => {
    localStorage.setItem('token', 'testtoken');
    expect(service.getToken()).toEqual('testtoken');
  });
});
