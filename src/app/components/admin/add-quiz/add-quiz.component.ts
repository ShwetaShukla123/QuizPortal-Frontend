import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories=[];

  quizData = {
    title: '',
    description: '',
    maxmarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: ''
    }
  }
  constructor(private _category: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService) { }

  ngOnInit(): void {
    this._category.getCategories().subscribe(
      data=>{
        this.categories = data;
      },
      error=>{
        Swal.fire('Error!', 'Server Error', 'error');
      }
    )
  }

  addQuiz(){
    if(this.quizData.title==''){
      this._snack.open('Title cannot be null!', '', {
        duration: 3000
      });
      return;
    }
   this._quiz.addQuiz(this.quizData).subscribe(
      data=>{
        Swal.fire('Success','Quiz added', 'success');
        this.quizData = {
          title: '',
          description: '',
          maxmarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: ''
          }
        }
      },
      error=>{
        Swal.fire('Error', 'Some error occured', 'error');
      }
    )
  }

}
