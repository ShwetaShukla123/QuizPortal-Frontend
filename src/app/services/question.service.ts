import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = "http://localhost:5000";
  constructor(private _http: HttpClient) { }

  public getQuestionsOfQuiz(qid): Observable<any>{
    return this._http.get(`${this.baseUrl}/question/quiz/all/${qid}`);
  }

  public getQuestionsOfQuizForTest(qid): Observable<any>{
    return this._http.get(`${this.baseUrl}/question/quiz/${qid}`);
  }

  public addQuestion(question){
    return this._http.post(`${this.baseUrl}/question/`, question);
  }

  public deleteQuestion(questionId){
    return this._http.delete(`${this.baseUrl}/question/${questionId}`);
  }

  public evalQuiz(questions): Observable<any>{
    return this._http.post(`${this.baseUrl}/question/eval-quiz/`, questions);
  }
}
