import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupService } from './signup.service';
import { User } from '../model/user';
import { ForgotPassword } from '../model/forgot-password';

describe('SignupService', () => {
  let service: SignupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SignupService],
    });

    // Inject the service (which imports the HttpClient) and the Test Controller
    service = TestBed.inject(SignupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a POST request to register a user', () => {
    const user: User = {
      email: 'nazim@gmail.com',
      userName: 'mohdnazim',
      password: 'nazim@123',
      phoneNumber: '1234567890',
      securityQuestion: 'What is your favorite color?',
      securityAnswer: 'Blue',
      role: 'user',
    };

    service.addUser(user).subscribe();

    const req = httpMock.expectOne('http://localhost:9090/api/v1/register');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush({}); // Simulate a successful response
  });

  it('should make a PUT request to update password', () => {
    const email = 'test@example.com';
    const forgotData: ForgotPassword = {
      securityQuestion: 'What is your favorite color?',
      securityQuestionAnswer: 'Blue',
      newPassword: 'newpassword',
    };

    service.updatePassword(email, forgotData).subscribe();

    const req = httpMock.expectOne(`http://localhost:9090/api/v1/forgot/${email}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(forgotData);

    req.flush({}); // Simulate a successful response
  });
});
