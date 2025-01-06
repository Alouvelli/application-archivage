import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISiteProfil } from 'app/shared/model/site-profil.model';
import { SiteProfilService } from './site-profil.service';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';

@Component({
    selector: 'jhi-site-profil-update',
    templateUrl: './site-profil-update.component.html'
})
export class SiteProfilUpdateComponent implements OnInit {
    siteProfil: ISiteProfil;
    isSaving: boolean;

    sites: ISite[];

    profils: IProfil[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected siteProfilService: SiteProfilService,
        protected siteService: SiteService,
        protected profilService: ProfilService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ siteProfil }) => {
            this.siteProfil = siteProfil;
        });
        this.siteService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISite[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISite[]>) => response.body)
            )
            .subscribe((res: ISite[]) => (this.sites = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.siteProfil.id !== undefined) {
            this.subscribeToSaveResponse(this.siteProfilService.update(this.siteProfil));
        } else {
            this.subscribeToSaveResponse(this.siteProfilService.create(this.siteProfil));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISiteProfil>>) {
        result.subscribe((res: HttpResponse<ISiteProfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }

    trackProfilById(index: number, item: IProfil) {
        return item.id;
    }
}
