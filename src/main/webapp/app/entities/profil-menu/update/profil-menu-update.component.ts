import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IMenu } from 'app/entities/menu/menu.model';
import { MenuService } from 'app/entities/menu/service/menu.service';
import { IRubriqueProfil } from 'app/entities/rubrique-profil/rubrique-profil.model';
import { RubriqueProfilService } from 'app/entities/rubrique-profil/service/rubrique-profil.service';
import { ProfilMenuService } from '../service/profil-menu.service';
import { IProfilMenu } from '../profil-menu.model';
import { ProfilMenuFormGroup, ProfilMenuFormService } from './profil-menu-form.service';

@Component({
  selector: 'jhi-profil-menu-update',
  templateUrl: './profil-menu-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProfilMenuUpdateComponent implements OnInit {
  isSaving = false;
  profilMenu: IProfilMenu | null = null;

  profilsSharedCollection: IProfil[] = [];
  menusSharedCollection: IMenu[] = [];
  rubriqueProfilsSharedCollection: IRubriqueProfil[] = [];

  protected profilMenuService = inject(ProfilMenuService);
  protected profilMenuFormService = inject(ProfilMenuFormService);
  protected profilService = inject(ProfilService);
  protected menuService = inject(MenuService);
  protected rubriqueProfilService = inject(RubriqueProfilService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProfilMenuFormGroup = this.profilMenuFormService.createProfilMenuFormGroup();

  compareProfil = (o1: IProfil | null, o2: IProfil | null): boolean => this.profilService.compareProfil(o1, o2);

  compareMenu = (o1: IMenu | null, o2: IMenu | null): boolean => this.menuService.compareMenu(o1, o2);

  compareRubriqueProfil = (o1: IRubriqueProfil | null, o2: IRubriqueProfil | null): boolean =>
    this.rubriqueProfilService.compareRubriqueProfil(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilMenu }) => {
      this.profilMenu = profilMenu;
      if (profilMenu) {
        this.updateForm(profilMenu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilMenu = this.profilMenuFormService.getProfilMenu(this.editForm);
    if (profilMenu.id !== null) {
      this.subscribeToSaveResponse(this.profilMenuService.update(profilMenu));
    } else {
      this.subscribeToSaveResponse(this.profilMenuService.create(profilMenu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilMenu>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(profilMenu: IProfilMenu): void {
    this.profilMenu = profilMenu;
    this.profilMenuFormService.resetForm(this.editForm, profilMenu);

    this.profilsSharedCollection = this.profilService.addProfilToCollectionIfMissing<IProfil>(
      this.profilsSharedCollection,
      profilMenu.profil,
    );
    this.menusSharedCollection = this.menuService.addMenuToCollectionIfMissing<IMenu>(this.menusSharedCollection, profilMenu.menu);
    this.rubriqueProfilsSharedCollection = this.rubriqueProfilService.addRubriqueProfilToCollectionIfMissing<IRubriqueProfil>(
      this.rubriqueProfilsSharedCollection,
      profilMenu.rubriqueProfil,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.profilService
      .query()
      .pipe(map((res: HttpResponse<IProfil[]>) => res.body ?? []))
      .pipe(map((profils: IProfil[]) => this.profilService.addProfilToCollectionIfMissing<IProfil>(profils, this.profilMenu?.profil)))
      .subscribe((profils: IProfil[]) => (this.profilsSharedCollection = profils));

    this.menuService
      .query()
      .pipe(map((res: HttpResponse<IMenu[]>) => res.body ?? []))
      .pipe(map((menus: IMenu[]) => this.menuService.addMenuToCollectionIfMissing<IMenu>(menus, this.profilMenu?.menu)))
      .subscribe((menus: IMenu[]) => (this.menusSharedCollection = menus));

    this.rubriqueProfilService
      .query()
      .pipe(map((res: HttpResponse<IRubriqueProfil[]>) => res.body ?? []))
      .pipe(
        map((rubriqueProfils: IRubriqueProfil[]) =>
          this.rubriqueProfilService.addRubriqueProfilToCollectionIfMissing<IRubriqueProfil>(
            rubriqueProfils,
            this.profilMenu?.rubriqueProfil,
          ),
        ),
      )
      .subscribe((rubriqueProfils: IRubriqueProfil[]) => (this.rubriqueProfilsSharedCollection = rubriqueProfils));
  }
}
