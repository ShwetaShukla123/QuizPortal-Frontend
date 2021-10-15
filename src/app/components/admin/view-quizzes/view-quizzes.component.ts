import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[];
  constructor(private quiz: QuizService) { }

  ngOnInit(): void {
    this.quiz.getQuizzes().subscribe(
      data=>{
        this.quizzes = data;
      },
      error=>{
        Swal.fire('Error!!', 'Server Error','error');
      }
    )
  }
  deleteQuiz(qid){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.quiz.deleteQuiz(qid).subscribe(
          data=>{
            this.quizzes = this.quizzes.filter((quiz)=> quiz.qid != qid);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          }
        )
      }
    })
  }

}
