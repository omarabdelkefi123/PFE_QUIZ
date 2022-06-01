import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuetionComponent } from './quetion/quetion.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { TestComponent } from './test/test.component';
import { PassTestComponent } from './pass-test/pass-test.component';
import { EvaluationTestComponent } from './evaluation-test/evaluation-test.component';
import { EditTestEvaluationComponent } from './edit-test-evaluation/edit-test-evaluation.component';
import { ViewTestEaluationComponent } from './view-test-ealuation/view-test-ealuation.component';




@NgModule({
  declarations: [
    QuetionComponent,
    AddQuestionComponent,
    EditQuestionComponent,
    TestComponent,
    PassTestComponent,
    PassTestComponent,EvaluationTestComponent, EditTestEvaluationComponent, ViewTestEaluationComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,SharedModuleModule
  ]
})
export class RecruitmentModule { }
