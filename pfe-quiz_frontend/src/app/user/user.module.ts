import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './list-user/list-user.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';




@NgModule({
  declarations: [
    ListUserComponent,
    AddUserComponent,
    EditUserComponent,
    ProfileUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModuleModule
  ]
})
export class UserModule { }
