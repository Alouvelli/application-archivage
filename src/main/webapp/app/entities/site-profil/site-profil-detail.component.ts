import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISiteProfil } from 'app/shared/model/site-profil.model';

@Component({
    selector: 'jhi-site-profil-detail',
    templateUrl: './site-profil-detail.component.html'
})
export class SiteProfilDetailComponent implements OnInit {
    siteProfil: ISiteProfil;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ siteProfil }) => {
            this.siteProfil = siteProfil;
        });
    }

    previousState() {
        window.history.back();
    }
}
