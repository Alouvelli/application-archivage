import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IRubrique } from 'app/entities/rubrique/rubrique.model';
import { RubriqueService } from 'app/entities/rubrique/service/rubrique.service';
import { IProfilModule } from 'app/entities/profil-module/profil-module.model';
import { ProfilModuleService } from 'app/entities/profil-module/service/profil-module.service';
import { RubriqueProfilService } from '../service/rubrique-profil.service';
import { IRubriqueProfil } from '../rubrique-profil.model';
import { RubriqueProfilFormGroup, RubriqueProfilFormService } from './rubrique-profil-form.service';

@Component({
  selector: 'jhi-rubrique-profil-update',
  templateUrl: './rubrique-profil-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RubriqueProfilUpdateComponent implements OnInit {
  isSaving = false;
  rubriqueProfil: IRubriqueProfil | null = null;

  profilsSharedCollection: IProfil[] = [];
  rubriquesSharedCollection: IRubrique[] = [];
  profilModulesSharedCollection: IProfilModule[] = [];

  protected rubriqueProfilService = inject(RubriqueProfilService);
  protected rubriqueProfilFormService = inject(RubriqueProfilFormService);
  protected profilService = inject(ProfilService);
  protected rubriqueService = inject(RubriqueService);
  protected profilModuleService = inject(ProfilModuleService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RubriqueProfilFormGroup = this.rubriqueProfilFormService.createRubriqueProfilFormGroup();

  compareProfil = (o1: IProfil | null, o2: IProfil | null): boolean => this.profilService.compareProfil(o1, o2);

  compareRubrique = (o1: IRubrique | null, o2: IRubrique | null): boolean => this.rubriqueService.compareRubrique(o1, o2);

  compareProfilModule = (o1: IProfilModule | null, o2: IProfilModule | null): boolean =>
    this.profilModuleService.compareProfilModule(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rubriqueProfil }) => {
      this.rubriqueProfil = rubriqueProfil;
      if (rubriqueProfil) {
        this.updateForm(rubriqueProfil);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rubriqueProfil = this.rubriqueProfilFormService.getRubriqueProfil(this.editForm);
    if (rubriqueProfil.id !== null) {
      this.subscribeToSaveResponse(this.rubriqueProfilService.update(rubriqueProfil));
    } else {
      this.subscribeToSaveResponse(this.rubriqueProfilService.create(rubriqueProfil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRubriqueProfil>>): void {
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

  protected updateForm(rubriqueProfil: IRubriqueProfil): void {
    this.rubriqueProfil = rubriqueProfil;
    this.rubriqueProfilFormService.resetForm(this.editForm, rubriqueProfil);

    this.profilsSharedCollection = this.profilService.addProfilToCollectionIfMissing<IProfil>(
      this.profilsSharedCollection,
      rubriqueProfil.profil,
    );
    this.rubriquesSharedCollection = this.rubriqueService.addRubriqueToCollectionIfMissing<IRubrique>(
      this.rubriquesSharedCollection,
      rubriqueProfil.rubrique,
    );
    this.profilModulesSharedCollection = this.profilModuleService.addProfilModuleToCollectionIfMissing<IProfilModule>(
      this.profilModulesSharedCollection,
      rubriqueProfil.profilModule,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.profilService
      .query()
      .pipe(map((res: HttpResponse<IProfil[]>) => res.body ?? []))
      .pipe(map((profils: IProfil[]) => this.profilService.addProfilToCollectionIfMissing<IProfil>(profils, this.rubriqueProfil?.profil)))
      .subscribe((profils: IProfil[]) => (this.profilsSharedCollection = profils));

    this.rubriqueService
      .query()
      .pipe(map((res: HttpResponse<IRubrique[]>) => res.body ?? []))
      .pipe(
        map((rubriques: IRubrique[]) =>
          this.rubriqueService.addRubriqueToCollectionIfMissing<IRubrique>(rubriques, this.rubriqueProfil?.rubrique),
        ),
      )
      .subscribe((rubriques: IRubrique[]) => (this.rubriquesSharedCollection = rubriques));

    this.profilModuleService
      .query()
      .pipe(map((res: HttpResponse<IProfilModule[]>) => res.body ?? []))
      .pipe(
        map((profilModules: IProfilModule[]) =>
          this.profilModuleService.addProfilModuleToCollectionIfMissing<IProfilModule>(profilModules, this.rubriqueProfil?.profilModule),
        ),
      )
      .subscribe((profilModules: IProfilModule[]) => (this.profilModulesSharedCollection = profilModules));
  }
}
