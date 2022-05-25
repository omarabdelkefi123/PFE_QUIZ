import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/models/recruitment/Question';
import { Test } from 'src/app/models/recruitment/Test';
import { TestService } from 'src/app/service/recruitment/test.service';

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
  constructor(private route: ActivatedRoute, private router: Router, private testservice: TestService,) { }

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
  }

}
