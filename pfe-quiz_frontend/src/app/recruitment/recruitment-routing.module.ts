import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuetionComponent } from './quetion/quetion.component';

const routes: Routes = [
  { path: 'quetion', component: QuetionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruitmentRoutingModule { }
