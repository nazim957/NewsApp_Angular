// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { of } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';
// //import Swal from 'sweetalert2';

// import { SignupComponent } from './signup.component';
// import { SignupService } from 'src/app/services/signup.service';
// import { ModeService } from 'src/app/services/mode.service';
// import { User } from 'src/app/model/user';
// import { FormsModule } from '@angular/forms';

// fdescribe('SignupComponent', () => {
//   let component: SignupComponent;
//   let fixture: ComponentFixture<SignupComponent>;
//   let signupServiceSpy: jasmine.SpyObj<SignupService>;
//   let snackBarSpy: jasmine.SpyObj<MatSnackBar>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     const signupSpy = jasmine.createSpyObj('SignupService', ['addUser']);
//     snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
//     const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       declarations: [SignupComponent],
//       imports: [
        
//         FormsModule,  
        
//       ],
//       providers: [
//         { provide: SignupService, useValue: signupSpy },
//         { provide: MatSnackBar, useValue: snackBarSpy },
//         { provide: Router, useValue: routerSpyObj },
//         ModeService,
//       ],
//     });

//     fixture = TestBed.createComponent(SignupComponent);
//     component = fixture.componentInstance;
//     signupServiceSpy = TestBed.inject(SignupService) as jasmine.SpyObj<SignupService>;
//     snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
//     routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
//   });

//   fit('should create', () => {
//     expect(component).toBeTruthy();
//   });

//  // ...

// fit('should call addUser on formSubmit', () => {
//   const userData: User = {
//     email: 'nazim@gmail.com',
//     userName: 'mohdnazim',
//     password: 'nazim@123',
//     phoneNumber: '9818',
//     securityQuestion: 'Test Question',
//     securityAnswer: 'Test Answer',
//     role: 'USER',
//   };

//   // Fix the return type to be of type 'User'
//   signupServiceSpy.addUser.and.returnValue(of(userData));
//   component.user = userData;

//   component.formSubmit();

//   expect(signupServiceSpy.addUser).toHaveBeenCalledWith(userData);
//   expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);

// });

// // ...

// // fit('should handle error when addUser fails', () => {
// //   const errorMessage = 'Error message';

// //   // Set up the spy to return an observable that throws an error
// //   signupServiceSpy.addUser.and.returnValue(throwError({ message: errorMessage }));

// //   // Trigger the formSubmit method
// //   component.formSubmit();

// //   // Manually detect changes to ensure asynchronous operations are completed
// //   fixture.detectChanges();

// //   // Expect the MatSnackBar service to be called with the error message
// //  // expect(snackBarSpy.open).toHaveBeenCalledWith(errorMessage, 'Error', { duration: 3000 });

// //   // You can also check other expectations based on your component's behavior

// //   // For example, you might want to check that the router.navigate method is not called
// //   expect(routerSpy.navigate).not.toHaveBeenCalled();
// // });


// });
