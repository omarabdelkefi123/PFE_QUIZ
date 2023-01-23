import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppMainComponent } from './app.main.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'landing', component: LandingComponent },
            { path: 'signup', component: SignUpComponent },
            { path: 'login', component: LoginComponent },
            { path: 'login/:errorMessage', component: LoginComponent },
            { path: 'newPassword/:token', component: NewPasswordComponent },
            { path: 'forgetpassword', component: ForgetPasswordComponent },
            { path: 'error', component: ErrorComponent },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'access', component: AccessComponent },
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
                    { path: 'recruitment', loadChildren: () => import('./recruitment/recruitment.module').then(m => m.RecruitmentModule) },
                    { path: 'dashboard', component: DashboardComponent },
                ],
            },

            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
