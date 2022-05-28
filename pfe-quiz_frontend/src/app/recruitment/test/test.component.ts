import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Test } from 'src/app/models/recruitment/Test';
import { TestService } from 'src/app/service/recruitment/test.service';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['./test.component.scss', '../../../assets/demo/badges.scss']
})
export class TestComponent implements OnInit {

    test: Test = new Test();
    deleteTestDialog: boolean = false;

    deleteTestsDialog: boolean = false;

    Test;

    selectedTests;

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    isTableHasData = true;
    filtersocieties: any;
    isalladmin = false;
    tests: Test[];
    filtertests: Test[] = [];
    expandedRows = {};

    constructor(private router: Router, private messageService: MessageService,
        private confirmationService: ConfirmationService, private testservice: TestService,

        private testService: TestService) { }

    ngOnInit() {
        this.reloadData();
    }

    reloadData() {
        this.testservice.gettestsList()
            .subscribe(data => {
                console.log(data)
                this.tests = data;
            });
    }
    addTest() {
        this.router.navigate(["recruitment/add"]);
    }


    deleteSelectedTests() {
        this.deleteTestsDialog = true;
    }
    editTest(Test) {
        this.router.navigate(["recruitment/edit", Test.id]);
    }


    deleteTest(Test) {
        this.deleteTestDialog = true;
        this.Test = { ...Test };
    }

    confirmDeleteTestsSelected() {
        this.deleteTestsDialog = false;
        this.tests = this.tests.filter(val => !this.selectedTests.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Tests Deleted', life: 3000 });
        this.selectedTests.forEach(Test => {
            this.testservice.deletetest(Test.id)
                .subscribe(data => {
                });
        });
        this.selectedTests = null;

    }

    confirmDeleteTest() {
        this.deleteTestDialog = false;
        this.testservice.deletetest(this.Test.id)
            .subscribe(data => {
                this.tests = this.tests.filter(val => val.id !== this.Test.id);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Test Deleted', life: 3000 });
                this.Test = {};
            });

    }

}
