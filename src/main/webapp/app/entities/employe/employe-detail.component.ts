import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmploye } from 'app/shared/model/employe.model';

@Component({
    selector: 'jhi-employe-detail',
    templateUrl: './employe-detail.component.html'
})
export class EmployeDetailComponent implements OnInit {
    employe: IEmploye;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employe }) => {
            this.employe = employe;
        });
    }

    previousState() {
        window.history.back();
    }
}
