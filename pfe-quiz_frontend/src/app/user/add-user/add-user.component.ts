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
  //Nom
  fullnameControl = new FormControl('', [
    Validators.required,
    Validators.nullValidator,
  ]);
  //date
  startDate = new Date(1970, 0, 1);
  startexp = new Date(2018, 0, 1);
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
  constructor(private router: Router,private administratorservice: AdminService,private roleservice: RoleService, private countryService: CountryService) {

    this.reloadData();
  }
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });
  }
  ngOnInit() {
  }

  onUpload(event) {
    console.log(event)
    for (const file of event.files) {
      this.uploadedFiles.push(file);
    }
  }
  onUploadImage(event){
    console.log(event)
  }
  addUser() {
    this.administratorservice.addadministrator(this.user)
      .subscribe(data => {
        debugger;
        console.log(data);
        this.router.navigate(["/alluser/administrator"]);
      },
        error => {
          debugger;
          console.log(error);
        }
      );
  }



}
