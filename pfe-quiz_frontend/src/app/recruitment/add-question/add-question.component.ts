import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Question } from 'src/app/models/recruitment/Question';
import { Suggestion } from 'src/app/models/recruitment/Suggestion';
import { TypeQuestionEnum } from 'src/app/models/recruitment/typeQuestionEnum';
import { QuestionService } from 'src/app/service/recruitment/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  question: Question = new Question();
  suggestions: Suggestion[] = [];
  suggestion: Suggestion;
  suggestionDialog: boolean;
  questionFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  constructor(private questionservice: QuestionService,) { }

  ngOnInit(): void {

  }
  public get typeQuestionEnum() {
    return TypeQuestionEnum;
  }
  public onInputResponseChange() {
    console.log(this.question);
  }
  public addQuetion() {
    console.log(this.question);
    this.question.suggestions = this.suggestions;
    this.questionservice.createquestion(this.question)
      .subscribe(data => { console.log(data) });
  }
  public addSuggetion() {
    this.suggestion = new Suggestion();
    console.log("add suggestion")
    this.suggestionDialog = true;

  }
  hideDialog() {
    this.suggestionDialog = false;
  }
  saveSuggestion() {
    this.suggestions.push(this.suggestion)
    this.suggestionDialog = false;
    this.suggestion = new Suggestion();
    console.log(this.suggestions)
  }

}
