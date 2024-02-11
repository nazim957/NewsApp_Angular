import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../model/login';
import { LoginResponse } from '../components/login/login.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
    public generateToken(loginData:Login): Observable<LoginResponse>
    { 
      // return this.http.post<LoginResponse>(`http://localhost:9090/api/v2/login`,loginData)
      return this.http.post<LoginResponse>(`https://authenticationservice-uab7.onrender.com/api/v2/login`,loginData)
  
    }
  
    //Login user: set token in LocalStorage so that if we close browser token will be there
    public loginUser(token: string)
    {
      localStorage.setItem('token',token)
     // this.loginStatusSubject.next(true)
      return true;
    }
  

    public isLockedIn(): boolean {
      const tokenStr = localStorage.getItem('token');
      return tokenStr !== undefined && tokenStr !== '' && tokenStr !== null;
    }
    
  
    //logout : remove token from local storage
    public logout()
    {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.clear();
      return true;
    }
  
    //get token
    public getToken()
    {
      return localStorage.getItem('token')
    }
  
    //set user detail creating to reduce server call
    public setUserName(userName:string)
    {
      localStorage.setItem('userName',userName)
    }

    public setEmail(email:string)
    {
      localStorage.setItem('email',email)
    }

       //set user role creating to reduce server call
       public setRole(role:string)
       {
         localStorage.setItem('role',role)
       }
  
    //get User
    public getUserName()
    {
      const userStr=localStorage.getItem("userName")
      if(userStr!=null)
      {
        return userStr;
      }
      //if no user then logout it
      else{
        this.logout()
        return null
      }
    }

    public getUserEmail()
    {
      const userStr=localStorage.getItem("email")
      if(userStr!=null)
      {
        return userStr;
      }
      //if no user then logout it
      else{
        this.logout()
        return null
      }
    }
  
    //get user role
    public getUserRole(): string | null {
      return localStorage.getItem('role'); // Return the role or null
    }
}
