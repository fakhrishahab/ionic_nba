import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';

import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [GooglePlus]
})
export class LoginPage {
    message: string;

    constructor(
        public authService: AuthService, 
        public router: Router, 
        private storage: Storage,
        private googlePlus: GooglePlus,
        ) {
        // this.setMessage();
    }

    setMessage() {
        this.message = 'Logged '+ (this.authService.isLoggedIn ? 'in' : 'out');
    }

    login() {
        this.googlePlus.login({ })
            .then(res => {
                const { email, userId, displayName, idToken, imageUrl, accessToken } = res;
                // this.message = `Hi ,${res.displayName}`;
                
                this.authService.login().subscribe(() => {

                    let redirect = this.authService.redirectUrl ?
                    this.router.parseUrl(this.authService.redirectUrl) : '/home';

                    this.storage.set('user_data', JSON.stringify(
                        {
                            email: email,
                            userId: userId,
                            displayName: displayName,
                            imageUrl: imageUrl,
                            accessToken: accessToken
                        })
                    )
                    this.router.navigateByUrl(redirect)
                })
                
            })
            .catch(err => {
                this.message = 'Error login with code: '+err;
            })
    }

    logout() {
        alert('logout')
        this.authService.logout();
        this.setMessage();
    }
}