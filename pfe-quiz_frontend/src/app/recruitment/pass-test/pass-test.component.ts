import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/recruitment/Question';
import { Test } from 'src/app/models/recruitment/Test';
import { TestEvaluation } from 'src/app/models/recruitment/TestEvaluation';
import { TypeQuestionEnum } from 'src/app/models/recruitment/typeQuestionEnum';
import { User } from 'src/app/models/user/User';
import { StorageService } from 'src/app/service/Auth/storage.service';
import { TestService } from 'src/app/service/recruitment/test.service';
import { TestEvaluationService } from 'src/app/service/recruitment/testevaluation.service copy';

@Component({
  selector: 'app-pass-test',
  templateUrl: './pass-test.component.html',
  styleUrls: ['./pass-test.component.scss']
})
export class PassTestComponent implements OnInit {
  currentStep = 1;
  numberSteps = 4;

  id: number;
  i: number;
  test: Test = new Test();
  questions: Question[] = [];
  valCheck;

  testEvaluation: TestEvaluation = new TestEvaluation();
  userconnecte: User;
  public get typeQuestionEnum() {
    return TypeQuestionEnum;
  }
  constructor(private testEvalutionService: TestEvaluationService, private storageservice: StorageService, private route: ActivatedRoute, private router: Router, private testservice: TestService,) {
    this.userconnecte = this.storageservice.getuserfromcookieorsession();
  }

  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.testservice.gettest(this.id).subscribe(data => {
      this.test = data;
      this.questions = this.test.questions;
    });
  }
  goToNextStep() {
    this.currentStep = this.currentStep + 1;
    if (this.currentStep === this.questions.length + 1) {
      this.testEvaluation.user = this.userconnecte;

      this.testEvaluation.suggestionsAnswered = [];
      this.questions.forEach(quetion => {
        quetion.id = null;
        quetion.filter = false;
        quetion.suggestions.forEach(su => {
          su.id = null;
          this.testEvaluation.suggestionsAnswered.push(su);
        });

      });
      this.testEvaluation.questionsAnswered = this.questions;
      console.log(this.testEvaluation);
      this.testEvalutionService.createTestEvaluation(this.testEvaluation).subscribe(data => {
        console.log("after calling api success" + data)
      });

    }
  }

}
