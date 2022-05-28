import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ProfileUserComponent } from './profile-user/profile-user.component';
import { SendTestComponent } from './send-test/send-test.component';

const routes: Routes = [
  { path: 'alluser', component: ListUserComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: EditUserComponent },
  { path: 'send-test/:id', component: SendTestComponent },
  { path: 'profile/:id', component: ProfileUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
