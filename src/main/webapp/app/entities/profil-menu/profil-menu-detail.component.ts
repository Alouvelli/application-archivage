import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilMenu } from 'app/shared/model/profil-menu.model';

@Component({
    selector: 'jhi-profil-menu-detail',
    templateUrl: './profil-menu-detail.component.html'
})
export class ProfilMenuDetailComponent implements OnInit {
    profilMenu: IProfilMenu;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profilMenu }) => {
            this.profilMenu = profilMenu;
        });
    }

    previousState() {
        window.history.back();
    }
}
