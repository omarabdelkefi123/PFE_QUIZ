import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../service/Auth/auth-guard.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { EditTestEvaluationComponent } from './edit-test-evaluation/edit-test-evaluation.component';
import { EvaluationTestComponent } from './evaluation-test/evaluation-test.component';
import { PassTestComponent } from './pass-test/pass-test.component';
import { QuetionComponent } from './quetion/quetion.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'quetion', component: QuetionComponent },
  { path: 'add', component: AddQuestionComponent },
  { path: 'edit/:id', component: EditQuestionComponent},
  { path: 'test', component: TestComponent },
  { path: 'pass-test/:id', component: PassTestComponent ,canActivate: [AuthGuardService]},
  { path: 'test-evalution', component: EvaluationTestComponent },
  { path: 'test-evalution/edit/:id', component: EditTestEvaluationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
