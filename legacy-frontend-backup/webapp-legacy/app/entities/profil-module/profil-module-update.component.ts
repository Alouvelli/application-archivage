import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProfilModule } from 'app/shared/model/profil-module.model';
import { ProfilModuleService } from './profil-module.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';
import { IModule } from 'app/shared/model/module.model';
import { ModuleService } from 'app/entities/module';
import { ISiteProfil } from 'app/shared/model/site-profil.model';
import { SiteProfilService } from 'app/entities/site-profil';

@Component({
    selector: 'jhi-profil-module-update',
    templateUrl: './profil-module-update.component.html'
})
export class ProfilModuleUpdateComponent implements OnInit {
    profilModule: IProfilModule;
    isSaving: boolean;

    profils: IProfil[];

    modules: IModule[];

    siteprofils: ISiteProfil[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected profilModuleService: ProfilModuleService,
        protected profilService: ProfilService,
        protected moduleService: ModuleService,
        protected siteProfilService: SiteProfilService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ profilModule }) => {
            this.profilModule = profilModule;
        });
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.moduleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IModule[]>) => mayBeOk.ok),
                map((response: HttpResponse<IModule[]>) => response.body)
            )
            .subscribe((res: IModule[]) => (this.modules = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.siteProfilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISiteProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISiteProfil[]>) => response.body)
            )
            .subscribe((res: ISiteProfil[]) => (this.siteprofils = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.profilModule.id !== undefined) {
            this.subscribeToSaveResponse(this.profilModuleService.update(this.profilModule));
        } else {
            this.subscribeToSaveResponse(this.profilModuleService.create(this.profilModule));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilModule>>) {
        result.subscribe((res: HttpResponse<IProfilModule>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackModuleById(index: number, item: IModule) {
        return item.id;
    }

    trackSiteProfilById(index: number, item: ISiteProfil) {
        return item.id;
    }
}
