import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';

@Component({
    selector: 'jhi-etudiant-update',
    templateUrl: './etudiant-update.component.html'
})
export class EtudiantUpdateComponent implements OnInit {
    etudiant: IEtudiant;
    isSaving: boolean;

    constructor(protected etudiantService: EtudiantService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ etudiant }) => {
            this.etudiant = etudiant;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.etudiant.id !== undefined) {
            this.subscribeToSaveResponse(this.etudiantService.update(this.etudiant));
        } else {
            this.subscribeToSaveResponse(this.etudiantService.create(this.etudiant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtudiant>>) {
        result.subscribe((res: HttpResponse<IEtudiant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
