import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  baseUrl= 'http://localhost:5000';
  constructor(private http: HttpClient) { }

  public getQuizzes(): Observable<any>{
    return this.http.get(`${this.baseUrl}/quiz/`);
  }

  public addQuiz(quiz){
    return this.http.post(`${this.baseUrl}/quiz/`, quiz);
  }

  public deleteQuiz(qid){
    return this.http.delete(`${this.baseUrl}/quiz/${qid}`);
  }

  public getQuiz(qid){
    return this.http.get(`${this.baseUrl}/quiz/${qid}`);
  }

  public updateQuiz(quiz){
    return this.http.put(`${this.baseUrl}/quiz/`, quiz);
  }

  public getQuizzesOfCategory(cid){
    return this.http.get(`${this.baseUrl}/quiz/category/${cid}`);
  }

  public getActiveQuizzes(){
    return this.http.get(`${this.baseUrl}/quiz/active/`);
  }
  public getActiveQuizzesOfCategory(cid){
    return this.http.get(`${this.baseUrl}/quiz/category/active/${cid}`);
  }
}
