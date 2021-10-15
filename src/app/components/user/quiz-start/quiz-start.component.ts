import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-quiz-start',
  templateUrl: './quiz-start.component.html',
  styleUrls: ['./quiz-start.component.css']
})
export class QuizStartComponent implements OnInit {
  qid;
  questions;

  quizResult = {
    marksGained : 0,
    attempted : 0,
    correctAnswers : 0
  }
  isSubmit = false;
  timer: any;

  constructor(private locationst: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestions();
  }

  loadQuestions(){
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      data=>{
        this.questions = data;
        this.timer = this.questions.length*1.5*60;
        this.startTimer();
        this.questions.forEach(element => {
          element['userSelectedAnswer']=''
        });
        console.log(this.questions);
      },
      error=>{
        Swal.fire('Error', 'Error in loading questions!', 'error');
      }
    )
  }

  preventBackButton(){
    history.pushState(null, null, location.href);
    this.locationst.onPopState(()=>{
      history.pushState(null, null, location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit quiz?',
      showCancelButton: true,
      confirmButtonText: 'submit',
      icon: 'info',
    }).then((e)=>{
      if(e.isConfirmed){
        this.showResult();
      }
    })
  }
  showResult(){
    //calculation
    this.isSubmit = true;
    this._question.evalQuiz(this.questions).subscribe(
      data=>{
        this.quizResult = data;
      },
      error=>{
        alert(error);
      }
    )
  }

  startTimer(){
    let t = window.setInterval(
      ()=>{
        if(this.timer <= 0){
          this.showResult();
          clearInterval(t);
        }else{
          this.timer--;
        }
      }, 1000
    )
  }

  getFormattedTime(){
    let min = Math.floor(this.timer/60);
    let sec = this.timer - min*60;
    return `${min} min : ${sec} sec`;
  }

  printPage(){
    window.print();
  }

}
