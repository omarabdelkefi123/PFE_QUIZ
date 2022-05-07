import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/user/role';
import { User } from 'src/app/models/user/User';
import { CountryService } from 'src/app/service/countryservice';
import { AdminService } from 'src/app/service/user/admin.service';
import { RoleService } from 'src/app/service/user/role.service';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {

  roles: Role[];
  uploadedFiles: any[] = [];
  user: User = new User();
  imageError: string;
  cardImageBase64: string;
  isImageSaved: boolean;
  files: File[] = new Array<File>();
  selectedFiles: FileList;
  selectedImages: FileList;
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
  RoleSelectedValue: any;
  images: any;
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
  id: number;
  i: number;
 
  constructor(public datepipe: DatePipe,private route: ActivatedRoute, private router: Router, private administratorservice: AdminService, private roleservice: RoleService, private countryService: CountryService) {


  }
  date:Date ;
  data_inserimento;
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });

    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.administratorservice.getadministrator(this.id).subscribe(data => {
      this.user = data;
      //this.RoleSelectedValue = data.role.id;
      this.images = [];
      var binaryData = [];
      binaryData.push(this.user.imageprofile);
      this.user.imageprofile.bytes = 'data:image/jpg;base64,' + this.user.imageprofile.bytes;
      this.images.push(this.user.imageprofile);
      this.uploadedFiles =this.user.documents;
      this.selectedGender=this.sexe.filter(ele=>ele.value = this.user.gender)[0];
      this.selectedCity=this.villeGroups.filter(ele=>ele.value = this.user.city)[0];
      this.data_inserimento = new Date(this.user.dateofbirth);
    });
  }
  ngOnInit() {
    this.reloadData();
  }
  editUser() {
    this.user.gender = this.selectedGender.value;
    this.user.city = this.selectedCity.value;
    const formData: FormData = new FormData();
    this.files.forEach(element => {
      formData.append('files', element);
    });
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

  selectImage(event) {
    this.selectedImages = event;
    this.images.push(this.selectedImages.item(0));
  }
  selectFile(event) {
    this.selectedFiles = event;
    this.files.push(this.selectedFiles.item(0));
  }

  onUpload($event){

  }
}
