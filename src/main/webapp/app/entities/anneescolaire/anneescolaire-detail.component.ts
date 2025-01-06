import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';

@Component({
    selector: 'jhi-anneescolaire-detail',
    templateUrl: './anneescolaire-detail.component.html'
})
export class AnneescolaireDetailComponent implements OnInit {
    anneescolaire: IAnneescolaire;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ anneescolaire }) => {
            this.anneescolaire = anneescolaire;
        });
    }

    previousState() {
        window.history.back();
    }
}
