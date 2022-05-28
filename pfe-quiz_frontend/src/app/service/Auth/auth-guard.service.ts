import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { StorageService } from './storage.service';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private storageservice: StorageService,
    ) {
    }
    list: string[];
    result: boolean = false;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.result = false;
        const currentUser = this.authenticationService.currentUserValue;
        const requiresLogin = route.data.requiresLogin || false;
        if (currentUser && this.storageservice.getFromCookieOrSession("token")) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
