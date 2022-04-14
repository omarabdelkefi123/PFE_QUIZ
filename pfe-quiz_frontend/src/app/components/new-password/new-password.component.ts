import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppConfig } from 'src/app/api/appconfig';
import { ConfigService } from 'src/app/service/app.config.service';
import { AuthenticationService } from 'src/app/service/Auth/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  isIconPasswordClicked: boolean = false;
  isIconPasswordClicked2: boolean = false;
  config: AppConfig;
  subscription: Subscription;
  reactiveForm: FormGroup;
  msgs: Message[] = [];
  password: string = "";
  newpassword: string = "";
  token: any;
  constructor(public configService: ConfigService, private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthenticationService, private router: Router) {
    this.reactiveForm = this.fb.group({
      password: ['', [Validators.required]],
      newpassword: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  public get typeInputPassword() {
    if (this.isIconPasswordClicked) {
      return 'text';
    }
    return 'password';
  }
  public get typeInputPassword2() {
    if (this.isIconPasswordClicked2) {
      return 'text';
    }
    return 'password';
  }
  confirmNewPassword() {
    debugger;
    this.authService.confirmNewPass(this.token, this.password).subscribe(
      data => {
        this.router.navigate(['/login']);
      }, error => {
        this.showErrorViaMessages('Error when changing the password');
      }
    );
  }
  showErrorViaMessages(msg) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: msg });
  }

}
