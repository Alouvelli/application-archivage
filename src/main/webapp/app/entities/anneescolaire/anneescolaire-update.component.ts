import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';

@Component({
    selector: 'jhi-anneescolaire-update',
    templateUrl: './anneescolaire-update.component.html'
})
export class AnneescolaireUpdateComponent implements OnInit {
    anneescolaire: IAnneescolaire;
    isSaving: boolean;

    constructor(protected anneescolaireService: AnneescolaireService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ anneescolaire }) => {
            this.anneescolaire = anneescolaire;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.anneescolaire.id !== undefined) {
            this.subscribeToSaveResponse(this.anneescolaireService.update(this.anneescolaire));
        } else {
            this.subscribeToSaveResponse(this.anneescolaireService.create(this.anneescolaire));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnneescolaire>>) {
        result.subscribe((res: HttpResponse<IAnneescolaire>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
