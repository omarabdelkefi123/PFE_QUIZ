import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Role } from 'src/app/models/user/role';
import { User } from 'src/app/models/user/User';
import { CountryService } from 'src/app/service/countryservice';
import { RoleService } from 'src/app/service/user/role.service';
import { FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Document as Alias } from 'src/app/models/user/document';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {

  roles: Role[];
  uploadedFiles: any[] = [];
  user = new User();
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
  documents: Alias[];
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
  urlServer: string = 'http://localhost:8080/';
  constructor(public datepipe: DatePipe, private route: ActivatedRoute,
    private router: Router, private administratorservice: UserService, private roleservice: RoleService, private countryService: CountryService) {


  }
  date: Date;
  data_inserimento;
  reloadData() {
    this.roleservice.getRolesList()
      .subscribe(data => { this.roles = data; });

    this.id = this.route.snapshot.params['id'];
    this.i = 0;
    this.administratorservice.getuser(this.id).subscribe(data => {
      this.user = data;
      //this.RoleSelectedValue = data.role.id;
      this.documents = this.user.documents;
      this.selectedGender = this.sexe.find(ele => ele.value === this.user.gender);

      this.selectedCity = this.villeGroups.filter(ele => ele.value === this.user.city)[0];
      this.user.dateofbirth = new Date(this.user.dateofbirth);
      this.user.documents.forEach(element => {
        const file: File = new File([element.bytes], element.name, {
          type: element.type
        });
        this.files.push(file);
      })
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
    this.administratorservice.updateuser(formData)
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
    this.selectedFiles = event.target.files;
    this.files.push(this.selectedFiles.item(0));
    console.log(this.selectedFiles.item(0))
    var document = new Alias();
    document.name = this.selectedFiles.item(0).name;
    document.bytes = this.selectedFiles.item(0).arrayBuffer;
    document.size = this.selectedFiles.item(0).size;
    this.documents.push(document)
  }

  deleteDocument(i): void {
    console.log("delete")
    this.files.splice(i, 1);
    this.documents.splice(i, 1);
  }
  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;
      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];
          if (img_height > max_height && img_width > max_width) {
            this.imageError =
              'Maximum dimentions allowed ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            const imgBase64Path = e.target.result;
            this.cardImageBase64 = imgBase64Path;
            this.isImageSaved = true;
            this.user.imageprofile = new Alias();
            this.user.imageprofile.bytes = this.cardImageBase64.substring(23);
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }
}
