import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInscription } from 'app/shared/model/inscription.model';

@Component({
    selector: 'jhi-inscription-detail',
    templateUrl: './inscription-detail.component.html'
})
export class InscriptionDetailComponent implements OnInit {
    inscription: IInscription;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ inscription }) => {
            this.inscription = inscription;
        });
    }

    previousState() {
        window.history.back();
    }
}
