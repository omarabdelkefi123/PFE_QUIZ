import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  editSuggetionItem = false;
  editSuggetionItemIndex;
  questionFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  constructor(private router: Router, private questionservice: QuestionService,) { }

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
      .subscribe(data => { this.router.navigate(["/recruitment/quetion"]); });
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
    if (this.editSuggetionItem) {
      this.suggestions[this.editSuggetionItemIndex] = this.suggestion;
      this.editSuggetionItem = false;
    } else {
      this.suggestions.push(this.suggestion)
    }
    this.suggestionDialog = false;
    this.suggestion = new Suggestion();
    console.log(this.suggestions)
  }

  deleteSuggetion(i): void {
    this.suggestions.splice(i, 1);
  }
  editSuggetion(i): void {
    this.suggestion = this.suggestions[i];
    console.log("add suggestion");
    this.editSuggetionItemIndex = i;
    this.suggestionDialog = true;
    this.editSuggetionItem = true;
  }


}
