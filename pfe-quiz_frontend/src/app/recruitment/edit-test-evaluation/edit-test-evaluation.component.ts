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
    console.log("question suggetion result " + quetion.scoreResult)
    return (this.getScoreQuetion(quetion) / 100) * quetion.score;
  }
  editTestEvaluation() {
    this.TestEvaluation.test.scoreResult = (this.getScoreTest()).toString();
    this.administratorservice.updateTestEvaluation(this.TestEvaluation).subscribe(data => {
      
    });
  }


  /*****************test           */
  getSumScoreQuetions() {
    let score = 0;
    for (var j = 0; j < this.TestEvaluation.questionsAnswered?.length; j++) {
      score = +this.TestEvaluation.questionsAnswered[j].score + score;
    }
    return score;
  }
  
  getScoreTest() {
    var x = this.getSumScoreAsweredQuetions();
    var y = this.getSumScoreQuetions();
    return (this.getSumScoreAsweredQuetions() / this.getSumScoreQuetions()) * 100;
  }
  getSumScoreAsweredQuetions() {
    let score = 0;
    for (var j = 0; j < this.TestEvaluation.questionsAnswered?.length; j++) {
      score = +this.TestEvaluation.questionsAnswered[j].scoreResult + score;
    }
    return score;
  }
  public get typeQuestionEnum() {
    return TypeQuestionEnum;
  }
  addSoreQuetionInput(quetion: Question) {
    quetion.scoreResult = quetion.scoreinput;
    console.log("question input result " + quetion.scoreResult)
  }
 /* getInpuScore() {
    console.log(this.inputScore)
    if (this.inputScore) {
      return this.inputScore;
    } else {
      return 0;
    }
  }*/
}
