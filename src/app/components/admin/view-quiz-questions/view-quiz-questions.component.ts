import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qid;
  title;
  questions = []; 

  constructor(private _questionService: QuestionService,
    private _route: ActivatedRoute,
    public _snack: MatSnackBar) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.title = this._route.snapshot.params.title;
    this._questionService.getQuestionsOfQuiz(this.qid).subscribe(
      data=>{
        console.log(data);
        this.questions = data;
      }
    )
  }

  delete(quesId){
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Do you want to delete this question?'
    }).then((result)=>{
      if(result.isConfirmed){
        this._questionService.deleteQuestion(quesId).subscribe(
          data=>{
            this._snack.open('Question deleted','', {
              duration: 3000
            });
            this.questions = this.questions.filter((q)=>q.quesId != quesId);
          },
          error=>{
            this._snack.open('Error in deleting question', '', {
              duration: 3000
            });
          }
        )
      }
    })
  }

}
