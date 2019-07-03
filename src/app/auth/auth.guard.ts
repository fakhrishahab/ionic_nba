import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    userData:null;

    constructor(
        private authService: AuthService, 
        private router: Router,
        private storage: Storage,
        ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean{
        this.storage.get('user_data')
            .then(val => this.userData = JSON.parse(val))
        if(this.authService.isLoggedIn) { 
            // this.router.navigate(['/home']);
            return true; 
        }

        this.authService.redirectUrl = url;

        this.router.navigate(['/login']);
        return false
    }
}