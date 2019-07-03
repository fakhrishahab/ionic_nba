import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { PlayerPage } from './player.page';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: PlayerPage
            }
        ])
    ],
    declarations: [PlayerPage]
})
export class PlayerPageModule {}