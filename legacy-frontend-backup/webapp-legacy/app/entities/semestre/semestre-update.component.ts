import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';

@Component({
    selector: 'jhi-semestre-update',
    templateUrl: './semestre-update.component.html'
})
export class SemestreUpdateComponent implements OnInit {
    semestre: ISemestre;
    isSaving: boolean;

    constructor(protected semestreService: SemestreService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ semestre }) => {
            this.semestre = semestre;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.semestre.id !== undefined) {
            this.subscribeToSaveResponse(this.semestreService.update(this.semestre));
        } else {
            this.subscribeToSaveResponse(this.semestreService.create(this.semestre));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemestre>>) {
        result.subscribe((res: HttpResponse<ISemestre>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
