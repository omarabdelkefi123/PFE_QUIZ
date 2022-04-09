import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { AuthenticationService } from 'src/app/service/Auth/authentication.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  errorMessage: string;
  username :string; 
  reactiveForm: FormGroup;
  config: AppConfig;
  subscription: Subscription;
  msgs: Message[] = [];
  constructor(public configService: ConfigService,private fb: FormBuilder,private router: Router,private auth:AuthenticationService) { 
    this.reactiveForm = this.fb.group({
      username: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }
  resetPass(){
    this.router.navigate(['user/login/' + this.errorMessage]);
    this.auth.resetPassword(this.username).subscribe(
      (response) => {
        this.errorMessage = "un email a été envoyé, veuillez vérifier votre email s'il vous plaît"
      });
    }
}
