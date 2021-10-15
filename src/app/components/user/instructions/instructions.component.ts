import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  qid;
  quiz;

  constructor(private _route: ActivatedRoute,
    private _quizService: QuizService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this._quizService.getQuiz(this.qid).subscribe(
      data=>{
        this.quiz = data;
      },
      error=>{
        Swal.fire('Error','Some Error occured!', 'error');
      }
    )
  }

}
