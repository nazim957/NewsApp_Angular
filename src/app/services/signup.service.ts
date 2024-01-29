import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ForgotPassword } from '../model/forgot-password';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`http://localhost:9090/api/v1/register`,user)
  }

  public updatePassword(email:string, forgotData:ForgotPassword): Observable<string> {
    return this.http.put<string>(`http://localhost:9090/api/v1/forgot/${email}`, forgotData)
  }
}
