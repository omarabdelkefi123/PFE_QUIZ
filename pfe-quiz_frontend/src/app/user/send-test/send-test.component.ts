import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Test } from 'src/app/models/recruitment/Test';
import { User } from 'src/app/models/user/User';
import { TestService } from 'src/app/service/recruitment/test.service';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-send-test',
  templateUrl: './send-test.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./send-test.component.scss', '../../../assets/demo/badges.scss']
})
export class SendTestComponent implements OnInit {

  user = new User();
  id: number;
  i: number;
  constructor(private messageService: MessageService, public datepipe: DatePipe, private route: ActivatedRoute, private testService: TestService,
    private router: Router, private administratorservice: UserService,) { }
  test: Test = new Test();
  dateExpiration;
  tests: Test[];

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.testService.gettestsList()
      .subscribe(data => {
        console.log(data)
        this.tests = data;
      });
    this.administratorservice.getuser(this.id).subscribe(data => {
      this.user = data;
    });
  }

  sendTest() {
    console.log(this.test);
    console.log(this.dateExpiration)
    /*this.testEvaluation.dateExpiration = this.dateExpiration;
    this.testEvaluation.test = this.test;
    this.testEvaluation.user = this.user;
    this.testEvaluationService.createTestEvaluation(this.testEvaluation).subscribe(data => {
      console.log(data);
    });*/
    this.testService.sendTestToStudent(this.user, this.test, this.dateExpiration).subscribe(data => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'test has been sent to ' + this.user.fullname, life: 3000 });
      this.router.navigate(["user/alluser"]);
    });
  }

}
