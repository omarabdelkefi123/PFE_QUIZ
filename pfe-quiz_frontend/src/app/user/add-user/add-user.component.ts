import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/user/role';
import { User } from 'src/app/models/user/User';
import { CountryService } from 'src/app/service/countryservice';
import { AdminService } from 'src/app/service/user/admin.service';
import { RoleService } from 'src/app/service/user/role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
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
  constructor(private router: Router, private administratorservice: AdminService, private roleservice: RoleService, private countryService: CountryService) {

    this.reloadData();
  }
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });
  }
  ngOnInit() {
  }
  addUser() {
    this.user.gender = this.selectedGender.value;
    this.user.city = this.selectedCity.value;
    const formData: FormData = new FormData();
    this.files.forEach(element => {
      formData.append('files', element);
    });
    formData.append('image', this.imagesss[0]);
    formData.append('admin', JSON.stringify(this.user));
    ;
    this.administratorservice.addadministrator(formData)
      .subscribe(data => {
        ;
        console.log(data);
        this.router.navigate(["/user/alluser"]);
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
