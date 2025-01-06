import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFiliere } from 'app/shared/model/filiere.model';

@Component({
    selector: 'jhi-filiere-detail',
    templateUrl: './filiere-detail.component.html'
})
export class FiliereDetailComponent implements OnInit {
    filiere: IFiliere;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ filiere }) => {
            this.filiere = filiere;
        });
    }

    previousState() {
        window.history.back();
    }
}
