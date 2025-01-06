import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IProfilMenu } from 'app/shared/model/profil-menu.model';
import { ProfilMenuService } from './profil-menu.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu';
import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { RubriqueProfilService } from 'app/entities/rubrique-profil';

@Component({
    selector: 'jhi-profil-menu-update',
    templateUrl: './profil-menu-update.component.html'
})
export class ProfilMenuUpdateComponent implements OnInit {
    profilMenu: IProfilMenu;
    isSaving: boolean;

    profils: IProfil[];

    menus: IMenu[];

    rubriqueprofils: IRubriqueProfil[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected profilMenuService: ProfilMenuService,
        protected profilService: ProfilService,
        protected menuService: MenuService,
        protected rubriqueProfilService: RubriqueProfilService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ profilMenu }) => {
            this.profilMenu = profilMenu;
        });
        this.profilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProfil[]>) => response.body)
            )
            .subscribe((res: IProfil[]) => (this.profils = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.menuService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
                map((response: HttpResponse<IMenu[]>) => response.body)
            )
            .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.rubriqueProfilService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRubriqueProfil[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRubriqueProfil[]>) => response.body)
            )
            .subscribe((res: IRubriqueProfil[]) => (this.rubriqueprofils = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.profilMenu.id !== undefined) {
            this.subscribeToSaveResponse(this.profilMenuService.update(this.profilMenu));
        } else {
            this.subscribeToSaveResponse(this.profilMenuService.create(this.profilMenu));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilMenu>>) {
        result.subscribe((res: HttpResponse<IProfilMenu>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackMenuById(index: number, item: IMenu) {
        return item.id;
    }

    trackRubriqueProfilById(index: number, item: IRubriqueProfil) {
        return item.id;
    }
}
