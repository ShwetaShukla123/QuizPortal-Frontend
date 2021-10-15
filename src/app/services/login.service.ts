import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new BehaviorSubject<boolean>(false);

  baseUrl = "http://localhost:5000";
  constructor(private http: HttpClient, private router: Router) { }

  public login(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/current-user`);
  }

  public storeToken(token: string) {
    localStorage.setItem('token', token);
    this.getCurrentUser().subscribe(
      data => {
        this.storeUser(data)
        this.loginStatusSubject.next(true);
        //redirect to dashboard
        if (this.getUserRole() == 'ADMIN') {
          this.router.navigateByUrl('/admin');
        } else if (this.getUserRole() == 'USER') {
          this.router.navigateByUrl('/user/0');
        } else {
          this.logout();
        }
      }
    )

    return true;
  }

  public storeUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == null || token == undefined || token == '') {
      return false;
    } else
      return true;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getUser() {
    let userstr = localStorage.getItem('user');
    if (userstr) {
      return JSON.parse(userstr);
    } else {
      this.logout();
      return null;
    }
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public getUserRole() {
    return this.getUser().authorities[0].authority;
  }
}
