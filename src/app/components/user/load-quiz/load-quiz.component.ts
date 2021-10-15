import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {

  cid;
  quizzes;
  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _snack: MatSnackBar) { }

  ngOnInit(): void {
    this._route.params.subscribe((param)=>{
      this.cid = param.cid;
      if(this.cid == 0){
        console.log('load all');
        this._quiz.getActiveQuizzes().subscribe(
          data=>{
            this.quizzes = data;
            console.log(this.quizzes)
          },
          error=>{
            this._snack.open('Some error occured');
            
          }
        )
      }else{
        this._quiz.getActiveQuizzesOfCategory(this.cid).subscribe(
          data=>{
            this.quizzes = data;
          },
          error=>{
            this._snack.open('Some error occured');
          }
        )
      }
    })
    
  }



}
