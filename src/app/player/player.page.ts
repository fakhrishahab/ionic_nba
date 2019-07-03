import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-player',
    templateUrl: './player.page.html',
    styleUrls: ['./player.page.scss']
})
export class PlayerPage {
    playerId = null;
    playerDetail:any;

    constructor(
        private http: HttpClient,
        public router: Router,
        private activatedRoute: ActivatedRoute
    ){}

    ngOnInit(){
        this.playerId = this.activatedRoute.snapshot.paramMap.get('playerId');
        
        this.http.get(`https://www.balldontlie.io/api/v1/players/${this.playerId}`)
            .subscribe((data:any) => {
                console.log(data)
                this.playerDetail = data;
            })
    }
}