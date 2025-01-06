import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClasse } from 'app/shared/model/classe.model';

@Component({
    selector: 'jhi-classe-detail',
    templateUrl: './classe-detail.component.html'
})
export class ClasseDetailComponent implements OnInit {
    classe: IClasse;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classe }) => {
            this.classe = classe;
        });
    }

    previousState() {
        window.history.back();
    }
}
