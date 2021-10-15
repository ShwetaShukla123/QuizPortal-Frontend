import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:5000";
  constructor(private http: HttpClient) { }

  public addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/`, user)
  }
}
