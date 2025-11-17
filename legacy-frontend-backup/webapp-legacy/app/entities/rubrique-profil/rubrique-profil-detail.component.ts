import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';

@Component({
    selector: 'jhi-rubrique-profil-detail',
    templateUrl: './rubrique-profil-detail.component.html'
})
export class RubriqueProfilDetailComponent implements OnInit {
    rubriqueProfil: IRubriqueProfil;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rubriqueProfil }) => {
            this.rubriqueProfil = rubriqueProfil;
        });
    }

    previousState() {
        window.history.back();
    }
}
