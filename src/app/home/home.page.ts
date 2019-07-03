import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [GooglePlus]
})
export class HomePage {

  message: string;
  playerlist: any;
  allPlayerList: any = [];
  isLoaderShow: any;
  page: string = '0';
  showLoading: boolean = false;

  constructor(
    public authService: AuthService, 
    public router: Router, 
    public googlePlus: GooglePlus,
    private storage: Storage,
    private http: HttpClient,
    public loadingController: LoadingController
  ) 
    {
      this.setMessage();
    }

  setMessage() {
    this.message = 'Logged out';
  }

  loaddata(){
    this.showLoading = true;
    this.getPlayerList(this.page);
  }

  showLoader(){
    this.isLoaderShow = this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    })
  }

  hideLoader(){
    setTimeout(() => {
      this.loadingController.dismiss()
    }, 500);
  }

  getPlayerList(page){
    this.http.get(`https://www.balldontlie.io/api/v1/players?page=${page}`)
      .subscribe( (res) => {
        this.playerlist = res;
        for(let ii=0; ii < this.playerlist.meta.per_page; ii++){
            this.allPlayerList.push(this.playerlist.data[ii])
        }
        this.page = this.playerlist.meta.next_page;
        this.hideLoader();
        this.showLoading = false;
      })
  }

  ngOnInit(){
    this.showLoader();
    this.storage.get('user_data')
      .then((val) => {
        const userData = JSON.parse(val);
        this.message = `Welcome Back, ${userData.displayName}`
      })
      
    this.getPlayerList(0);
  }

  logout() {
    
    this.googlePlus.logout()
      .then(res => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        alert('Logout Error');
      })
    
  }

}
