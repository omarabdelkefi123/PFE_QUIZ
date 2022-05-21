import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { QuetionComponent } from './quetion/quetion.component';

const routes: Routes = [
  { path: 'quetion', component: QuetionComponent },
  { path: 'add', component: AddQuestionComponent },
  { path: 'edit/:id', component: EditQuestionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
