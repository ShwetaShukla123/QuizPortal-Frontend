import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
public Editor = ClassicEditor;
  qid;
  question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  }
  constructor(private _route: ActivatedRoute,
    private _question: QuestionService) { }

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.question.quiz['qid'] = this.qid;
  }

  addQuestion(){
    if(this.question.content=='' || this.question.option1=='' || this.question.option2=='' || this.question.answer==''){
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      data=>{
        Swal.fire('Success', 'Question added', 'success');
        this.question = {
          quiz: {},
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: ''
        }
      },
      error=>{
        Swal.fire('Error', 'Some error occured', 'error');
      }
    )
  }

}
