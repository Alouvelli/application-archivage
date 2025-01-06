import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { RubriqueProfilService } from './rubrique-profil.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';
import { IRubrique } from 'app/shared/model/rubrique.model';
import { RubriqueService } from 'app/entities/rubrique';
import { IProfilModule } from 'app/shared/model/profil-module.model';
import { ProfilModuleService } from 'app/entities/profil-module';

@Component({
    selector: 'jhi-rubrique-profil-update',
    templateUrl: './rubrique-profil-update.component.html'
})
export class RubriqueProfilUpdateComponent implements OnInit {
    rubriqueProfil: IRubriqueProfil;
    isSaving: boolean;

    profils: IProfil[];

    rubriques: IRubrique[];

    profilmodules: IProfilModule[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected rubriqueProfilService: RubriqueProfilService,
        protected profilService: ProfilService,
        protected rubriqueService: RubriqueService,
        protected profilModuleService: ProfilModuleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rubriqueProfil }) => {
            this.rubriqueProfil = rubriqueProfil;
        });
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.rubriqueService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRubrique[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRubrique[]>) => response.body)
            )
            .subscribe((res: IRubrique[]) => (this.rubriques = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profilModuleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfilModule[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfilModule[]>) => response.body)
            )
            .subscribe((res: IProfilModule[]) => (this.profilmodules = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rubriqueProfil.id !== undefined) {
            this.subscribeToSaveResponse(this.rubriqueProfilService.update(this.rubriqueProfil));
        } else {
            this.subscribeToSaveResponse(this.rubriqueProfilService.create(this.rubriqueProfil));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IRubriqueProfil>>) {
        result.subscribe((res: HttpResponse<IRubriqueProfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackProfilById(index: number, item: IProfil) {
        return item.id;
    }

    trackRubriqueById(index: number, item: IRubrique) {
        return item.id;
    }

    trackProfilModuleById(index: number, item: IProfilModule) {
        return item.id;
    }
}
