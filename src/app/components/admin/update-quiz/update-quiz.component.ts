import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  qid = 0;
  quizData;
  categories;

  constructor(private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _category: CategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.quizData = this._quiz.getQuiz(this.qid).subscribe(data=>{
      this.quizData = data;
      console.log(data);
    },
    error=>{
      console.log(error);
    }
    )

    this._category.getCategories().subscribe(data=>{
      this.categories = data;
    },
      error=>{
        console.log(error);
      }
    )
  }

  public updateQuiz(){
    this._quiz.updateQuiz(this.quizData).subscribe(
      data=>{
        Swal.fire('Success', 'Quiz updated', 'success').then((e)=>{
          this.router.navigateByUrl('/admin/quizzes');
        })
      },
      error=>{
        Swal.fire('Error!', 'Some error occured', 'error');
      }
    )
  }



}
