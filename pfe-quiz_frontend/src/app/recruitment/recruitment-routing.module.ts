import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { PassTestComponent } from './pass-test/pass-test.component';
import { QuetionComponent } from './quetion/quetion.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'quetion', component: QuetionComponent },
  { path: 'add', component: AddQuestionComponent },
  { path: 'edit/:id', component: EditQuestionComponent},
  { path: 'test', component: TestComponent },
  { path: 'pass-test/:id', component: PassTestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
