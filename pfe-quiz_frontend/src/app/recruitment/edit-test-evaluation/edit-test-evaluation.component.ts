import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/recruitment/Question';
import { Suggestion } from 'src/app/models/recruitment/Suggestion';
import { Test } from 'src/app/models/recruitment/Test';
import { TestEvaluation } from 'src/app/models/recruitment/TestEvaluation';
import { TestEvaluationService } from 'src/app/service/recruitment/testevaluation.service copy';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TypeQuestionEnum } from 'src/app/models/recruitment/typeQuestionEnum';
@Component({
  selector: 'app-edit-test-evaluation',
  templateUrl: './edit-test-evaluation.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./edit-test-evaluation.component.scss', '../../../assets/demo/badges.scss']
})
export class EditTestEvaluationComponent implements OnInit {
  id: number;
  i: number;
  TestEvaluation = new TestEvaluation();
  valueKnob = 15;
  hideButton: boolean = true;
  constructor(private messageService: MessageService, private route: ActivatedRoute,
    private router: Router, private administratorservice: TestEvaluationService,) { }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.administratorservice.getTestEvaluation(this.id).subscribe(data => {
      this.TestEvaluation = data;

    });
  }
  correctChecked(suggetion: Suggestion) {
    return suggetion.correctAnswer === suggetion.checked;
  }

  getScoreQuetion(quetion: Question) {
    //let suggetions= quetion.suggestions.filter(val => val);
    let score = 0;
    let length = quetion.suggestions?.length;
    for (var j = 0; j < quetion.suggestions?.length; j++) {
      if (quetion.suggestions[j].correctAnswer === quetion.suggestions[j].checked) {
        score = score + 1;
      }
    }
    return (score / length) * 100;
  }
  getScoreResultQuetion(quetion) {
    quetion.scoreResult = ((this.getScoreQuetion(quetion) / 100) * quetion.score).toString();
    return (this.getScoreQuetion(quetion) / 100) * quetion.score;
  }
  editTestEvaluation() {
    this.TestEvaluation.test.scoreResult = (this.getScoreTest() + this.getInpuScore()).toString();
    this.administratorservice.updateTestEvaluation(this.TestEvaluation).subscribe(data => {
      console.log(this.TestEvaluation)
    });
  }


  /*****************test           */
  getSumScoreQuetions() {
    let score = 0;
    for (var j = 0; j < this.TestEvaluation.questionsAnswered?.length; j++) {
      score = +this.TestEvaluation.questionsAnswered[j].score + score;
    }
    console.log(score)
    return score;
  }
  getSumScoreAsweredQuetions() {
    let score = 0;
    for (var j = 0; j < this.TestEvaluation.questionsAnswered?.length; j++) {
      if (this.getScoreResultQuetion(this.TestEvaluation.questionsAnswered[j])) {
        //console.log(this.getScoreResultQuetion(this.TestEvaluation.questionsAnswered[j]))
        score = +this.getScoreResultQuetion(this.TestEvaluation.questionsAnswered[j]);
      }

    }
    return score;
  }
  inputScore;
  y;
  getScoreTest() {
    var x = this.getSumScoreAsweredQuetions();
    var y = this.getSumScoreQuetions();
    return (this.getSumScoreAsweredQuetions() / this.getSumScoreQuetions()) * 100;
  }
  public get typeQuestionEnum() {
    return TypeQuestionEnum;
  }
  addSoreQuetionInput(quetion: Question) {
    this.inputScore = (+quetion.scoreinput / this.getSumScoreQuetions()) * 100;
    this.hideButton = false;
  }
  getInpuScore() {
    console.log(this.inputScore)
    if (this.inputScore) {
      return this.inputScore;
    } else {
      return 0;
    }
  }
}
