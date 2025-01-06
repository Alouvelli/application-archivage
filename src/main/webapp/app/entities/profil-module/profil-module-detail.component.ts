import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProfilModule } from 'app/shared/model/profil-module.model';

@Component({
    selector: 'jhi-profil-module-detail',
    templateUrl: './profil-module-detail.component.html'
})
export class ProfilModuleDetailComponent implements OnInit {
    profilModule: IProfilModule;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profilModule }) => {
            this.profilModule = profilModule;
        });
    }

    previousState() {
        window.history.back();
    }
}
