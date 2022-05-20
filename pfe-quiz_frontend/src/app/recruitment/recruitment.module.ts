import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuetionComponent } from './quetion/quetion.component';
import { RecruitmentRoutingModule } from './recruitment-routing.module';



@NgModule({
  declarations: [
    QuetionComponent
  ],
  imports: [
    CommonModule,
    RecruitmentRoutingModule
  ]
})
export class RecruitmentModule { }
