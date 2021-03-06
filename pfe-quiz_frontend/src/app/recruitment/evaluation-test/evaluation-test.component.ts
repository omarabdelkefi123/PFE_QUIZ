import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TestEvaluation } from 'src/app/models/recruitment/TestEvaluation';
import { User } from 'src/app/models/user/User';
import { StorageService } from 'src/app/service/Auth/storage.service';
import { TestEvaluationService } from 'src/app/service/recruitment/testevaluation.service copy';


@Component({
  selector: 'app-evaluation-test',
  templateUrl: './evaluation-test.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./evaluation-test.component.scss', '../../../assets/demo/badges.scss']
})
export class EvaluationTestComponent implements OnInit {

  deleteTestEvaluationDialog: boolean = false;

  deleteTestEvaluationsDialog: boolean = false;

  TestEvaluation;

  selectedTestEvaluations;

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  isTableHasData = true;

  testEvaluations: TestEvaluation[];
  userconnecte: User;

  constructor(private storageservice: StorageService,private router: Router, private messageService: MessageService,
    private confirmationService: ConfirmationService, private testEvaluationservice: TestEvaluationService,) {
      this.userconnecte = this.storageservice.getuserfromcookieorsession();
     }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.testEvaluationservice.getTestEvaluationsList()
      .subscribe(data => {
        console.log(data)
        this.testEvaluations = data;
      });
  }

  deleteSelectedTestEvaluations() {
    this.deleteTestEvaluationsDialog = true;
  }

  editTestEvaluation(TestEvaluation) {
    this.router.navigate(["recruitment/test-evalution/edit", TestEvaluation.id]);
  }
  viewTestEvaluation(TestEvaluation) {
    this.router.navigate(["recruitment/consult-test-evalution", TestEvaluation.id]);
  }



  deleteTestEvaluation(TestEvaluation) {
    this.deleteTestEvaluationDialog = true;
    this.TestEvaluation = { ...TestEvaluation };
  }



  confirmDeleteTestEvaluationsSelected() {
    this.deleteTestEvaluationsDialog = false;
    this.testEvaluations = this.testEvaluations.filter(val => !this.selectedTestEvaluations.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'TestEvaluations Deleted', life: 3000 });
    this.selectedTestEvaluations.forEach(TestEvaluation => {
      this.testEvaluationservice.deleteTestEvaluation(TestEvaluation.id)
        .subscribe(data => {
        });
    });
    this.selectedTestEvaluations = null;

  }

  confirmDeleteTestEvaluation() {
    this.deleteTestEvaluationDialog = false;
    this.testEvaluationservice.deleteTestEvaluation(this.TestEvaluation.id)
      .subscribe(data => {
        this.testEvaluations = this.testEvaluations.filter(val => val.id !== this.TestEvaluation.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'TestEvaluation Deleted', life: 3000 });
        this.TestEvaluation = {};
      });

  }

}
