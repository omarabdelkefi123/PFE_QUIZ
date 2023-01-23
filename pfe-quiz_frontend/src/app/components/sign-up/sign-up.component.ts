import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/Auth/authentication.service';
import { Message } from 'primeng/api';
import { User } from 'src/app/models/user/User';
import { Role } from 'src/app/models/user/role';
import { UserService } from 'src/app/service/user/user.service';
import { RoleService } from 'src/app/service/user/role.service';
import { CountryService } from 'src/app/service/countryservice';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  roles: Role[];
  uploadedFiles: any[] = [];
  user: User = new User();
  imageError: string;
  cardImageBase64: string;
  isImageSaved: boolean;
  files: File[] = new Array<File>();
  selectedFiles: FileList;
  //Nom
  fullnameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //date
  startDate = new Date(1970, 0, 1);
  startexp = new Date(2018, 0, 1);
  selectedGender;
  selectedCity;
  //Function to testdate
  testDate(dateofb) {
    var timeDiff = Math.abs(Date.now() - dateofb);
    if (Math.floor((timeDiff / (1000 * 3600 * 24)) / 365) < 20) {
      return true;
    }
    else {
      return false;
    }
  }
  dateControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //lieu
  lieuControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //sexe
  sexe = [
    { value: 'Femme', viewValue: 'F' },
    { value: 'Homme', viewValue: 'H' },
  ];
  sexeControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //CIN
  cinControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  //username
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  //tel
  TelControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
    Validators.pattern('[0-9]{8}')
  ]);
  //Ville
  villeControl = new FormControl();
  villeGroups = [
    { value: 'Tunis', viewValue: 'Tunis' },
    { value: 'Sfax', viewValue: 'Sfax' },
    { value: 'Gabes', viewValue: 'Gabes' },
    { value: 'Gafsa', viewValue: 'Gafsa' },
    { value: 'Sousse', viewValue: 'Sousse' }
  ];
  roleFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  societyFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  constructor(private router: Router, private administratorservice: UserService, private roleservice: RoleService, private countryService: CountryService) {

    this.reloadData();
  }
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });
  }
  ngOnInit() {
  }
  addUser() {

    this.user.role = new Role();
    this.user.role.id = 2;
    this.user.gender = this.selectedGender.value;
    this.user.city = this.selectedCity.value;
    const formData: FormData = new FormData();
    this.files.forEach(element => {
      formData.append('files', element);
    });
    formData.append('image', this.imagesss[0]);
    formData.append('admin', JSON.stringify(this.user));
    this.administratorservice.adduser(formData)
      .subscribe(data => {
        ;
        console.log(data);
        this.router.navigate(["/login"]);
      },
        error => {
          ;
          console.log(error);
        }
      );
  }

  selectFile(event) {
    this.selectedFiles = event;
    this.files.push(this.selectedFiles.item(0));
  }
  selectedImages: FileList;
  imagesss: File[] = new Array<File>();
  selectImage(event) {
    this.selectedImages = event;
    this.imagesss.push(this.selectedImages.item(0));
  }


}
