import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuetionComponent } from './quetion/quetion.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddQuestionComponent } from './add-question/add-question.component';
import { EditQuestionComponent } from './edit-question/edit-question.component';




@NgModule({
  declarations: [
    QuetionComponent,
    AddQuestionComponent,
    EditQuestionComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule,SharedModuleModule
  ]
})
export class RecruitmentModule { }
