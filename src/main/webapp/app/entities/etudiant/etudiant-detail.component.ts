import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtudiant } from 'app/shared/model/etudiant.model';

@Component({
    selector: 'jhi-etudiant-detail',
    templateUrl: './etudiant-detail.component.html'
})
export class EtudiantDetailComponent implements OnInit {
    etudiant: IEtudiant;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etudiant }) => {
            this.etudiant = etudiant;
        });
    }

    previousState() {
        window.history.back();
    }
}
