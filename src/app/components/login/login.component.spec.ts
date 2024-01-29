import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
// import { ModeService } from 'src/app/services/mode.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loginServiceSpy: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    loginServiceSpy = jasmine.createSpyObj('LoginService', ['generateToken', 'loginUser', 'setUserName', 'setRole', 'setEmail', 'getUserRole']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        { provide: LoginService, useValue: loginServiceSpy },
        
      ],
    
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show snack bar for empty email', () => {
    component.loginData.email = '';
    component.formSubmit();
    expect(snackBarSpy.open).toHaveBeenCalledWith('User Name is Required !! ', '', { duration: 3000 });
  });

  // fit('should show snack bar for empty password', () => {
  //   component.loginData.password = '';
  //   component.formSubmit();
  //   expect(snackBarSpy.open).toHaveBeenCalledWith('Password is Required !! ', '', { duration: 3000 });
  // });

  // fit('should handle successful login', fakeAsync(() => {
  //   loginServiceSpy.generateToken.and.returnValue(of({
  //     message: 'Success',
  //     userName: 'testuser',
  //     role: 'USER',
  //     email: 'testuser@example.com',
  //     token: 'test-token',
  //   }));
  //   loginServiceSpy.getUserRole.and.returnValue('USER');

  //   component.formSubmit();
  //   tick();

  //   expect(loginServiceSpy.loginUser).toHaveBeenCalledWith('test-token');
  //   expect(loginServiceSpy.setUserName).toHaveBeenCalledWith('testuser');
  //   expect(loginServiceSpy.setRole).toHaveBeenCalledWith('USER');
  //   expect(loginServiceSpy.setEmail).toHaveBeenCalledWith('testuser@example.com');
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['user']);
  // }));

  // fit('should handle login failure', fakeAsync(() => {
  //   const errorMessage = 'Authentication failed';
  //   loginServiceSpy.generateToken.and.returnValue(throwError({ error: { message: errorMessage } }));

  //   component.formSubmit();
  //   tick();

  //   expect(snackBarSpy.open).toHaveBeenCalledWith(errorMessage, '', { duration: 3000 });
  //   // Add more expectations based on your component's behavior
  // }));
});
