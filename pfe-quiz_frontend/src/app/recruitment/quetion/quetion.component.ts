import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Question } from 'src/app/models/recruitment/Question';
import { Test } from 'src/app/models/recruitment/Test';
import { QuestionService } from 'src/app/service/recruitment/question.service';
import { TestService } from 'src/app/service/recruitment/test.service';
@Component({
    selector: 'app-quetion',
    templateUrl: './quetion.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./quetion.component.scss', '../../../assets/demo/badges.scss']
})
export class QuetionComponent implements OnInit {


    test: Test = new Test();
    deleteQuestionDialog: boolean = false;

    deleteQuestionsDialog: boolean = false;

    createTestDialog: boolean = false;

    Question;

    selectedQuestions;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    isTableHasData = true;
    filtersocieties: any;
    isalladmin = false;
    quetions: Question[];
    filterquetions: Question[] = [];
    expandedRows = {};

    constructor(private router: Router, private messageService: MessageService,
        private confirmationService: ConfirmationService, private quetionservice: QuestionService,

        private testService: TestService) { }

    ngOnInit() {
        this.reloadData();
    }

    reloadData() {
        this.quetionservice.getquestionsList()
            .subscribe(data => {
                console.log(data)
                this.quetions = data;
            });
    }
    addQuestion() {
        this.router.navigate(["recruitment/add"]);
    }


    deleteSelectedQuestions() {
        this.deleteQuestionsDialog = true;
    }

    createSelectedTests() {
        this.createTestDialog = true;
    }
    editQuestion(Question) {
        this.router.navigate(["recruitment/edit", Question.id]);
    }


    deleteQuestion(Question) {
        this.deleteQuestionDialog = true;
        this.Question = { ...Question };
    }

    confirmDeleteQuestionsSelected() {
        this.deleteQuestionsDialog = false;
        this.quetions = this.quetions.filter(val => !this.selectedQuestions.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Questions Deleted', life: 3000 });
        this.selectedQuestions.forEach(Question => {
            this.quetionservice.deletequestion(Question.id)
                .subscribe(data => {
                });
        });
        this.selectedQuestions = null;

    }
    confirmCreationTestsSelected() {
        this.deleteQuestionsDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Test Created', life: 3000 });
        this.test.questions = this.selectedQuestions;
        this.testService.createtest(this.test).subscribe(data => {
            console.log(data)
        });
        console.log("test will be created under quetions :" + this.selectedQuestions)
        this.selectedQuestions = null;
    }


    confirmDeleteQuestion() {
        this.deleteQuestionDialog = false;
        this.quetionservice.deletequestion(this.Question.id)
            .subscribe(data => {
                this.quetions = this.quetions.filter(val => val.id !== this.Question.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Question Deleted', life: 3000 });
                this.Question = {};
            });

    }
}
