import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISemestre } from 'app/shared/model/semestre.model';

@Component({
    selector: 'jhi-semestre-detail',
    templateUrl: './semestre-detail.component.html'
})
export class SemestreDetailComponent implements OnInit {
    semestre: ISemestre;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ semestre }) => {
            this.semestre = semestre;
        });
    }

    previousState() {
        window.history.back();
    }
}
