import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRubrique } from 'app/shared/model/rubrique.model';

@Component({
    selector: 'jhi-rubrique-detail',
    templateUrl: './rubrique-detail.component.html'
})
export class RubriqueDetailComponent implements OnInit {
    rubrique: IRubrique;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rubrique }) => {
            this.rubrique = rubrique;
        });
    }

    previousState() {
        window.history.back();
    }
}
