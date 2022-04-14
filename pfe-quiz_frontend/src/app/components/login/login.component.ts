import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/Auth/authentication.service';
import { Message } from 'primeng/api';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  isIconPasswordClicked: boolean = false;
  password: string;
  config: AppConfig;
  subscription: Subscription;
  hide: boolean = true;
  reactiveForm: FormGroup;
  username: string;
  remember: boolean = false;
  errorMessage: string;
  msgs: Message[] = [];
  constructor(private fb: FormBuilder, public configService: ConfigService, private router: Router, private auth: AuthenticationService) {
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: ['']
    });
  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }

  login() {
    console.log( this.remember)
    this.auth.login(this.username, this.password, this.remember).subscribe(
      data => {
        if (data) {
          this.router.navigate(['alluser']);
        }
        else {
          this.errorMessage = 'Username or password is incorrect';
          this.showErrorViaMessages(this.errorMessage);
        }
      },
      error => {
        this.errorMessage = 'Username or password is incorrect';
        this.showErrorViaMessages(this.errorMessage);
      }
    );
  }
  public get typeInputPassword() {
    if (this.isIconPasswordClicked) {
      return 'text';
    }
    return 'password';
  }
  showErrorViaMessages(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
