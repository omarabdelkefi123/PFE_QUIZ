import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user/User';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  static permission: string = " ";
  static user: string = "";
  constructor(public cookieService: CookieService) {
  }
  getFromCookieOrSession(key: string) {
    return sessionStorage.getItem(key) || this.cookieService.get(key);
  }
  getuserfromcookieorsession(): User {
    return JSON.parse(sessionStorage.getItem('user')) || this.cookieService.get('user');
  }
  getrolefromcookieorsession() {
    return JSON.parse(sessionStorage.getItem('role')) || this.cookieService.get('role');
  }
}
