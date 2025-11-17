import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { ISiteProfil } from 'app/entities/site-profil/site-profil.model';
import { SiteProfilService } from 'app/entities/site-profil/service/site-profil.service';
import { ProfilModuleService } from '../service/profil-module.service';
import { IProfilModule } from '../profil-module.model';
import { ProfilModuleFormGroup, ProfilModuleFormService } from './profil-module-form.service';

@Component({
  selector: 'jhi-profil-module-update',
  templateUrl: './profil-module-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProfilModuleUpdateComponent implements OnInit {
  isSaving = false;
  profilModule: IProfilModule | null = null;

  profilsSharedCollection: IProfil[] = [];
  modulesSharedCollection: IModule[] = [];
  siteProfilsSharedCollection: ISiteProfil[] = [];

  protected profilModuleService = inject(ProfilModuleService);
  protected profilModuleFormService = inject(ProfilModuleFormService);
  protected profilService = inject(ProfilService);
  protected moduleService = inject(ModuleService);
  protected siteProfilService = inject(SiteProfilService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProfilModuleFormGroup = this.profilModuleFormService.createProfilModuleFormGroup();

  compareProfil = (o1: IProfil | null, o2: IProfil | null): boolean => this.profilService.compareProfil(o1, o2);

  compareModule = (o1: IModule | null, o2: IModule | null): boolean => this.moduleService.compareModule(o1, o2);

  compareSiteProfil = (o1: ISiteProfil | null, o2: ISiteProfil | null): boolean => this.siteProfilService.compareSiteProfil(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profilModule }) => {
      this.profilModule = profilModule;
      if (profilModule) {
        this.updateForm(profilModule);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profilModule = this.profilModuleFormService.getProfilModule(this.editForm);
    if (profilModule.id !== null) {
      this.subscribeToSaveResponse(this.profilModuleService.update(profilModule));
    } else {
      this.subscribeToSaveResponse(this.profilModuleService.create(profilModule));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfilModule>>): void {
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

  protected updateForm(profilModule: IProfilModule): void {
    this.profilModule = profilModule;
    this.profilModuleFormService.resetForm(this.editForm, profilModule);

    this.profilsSharedCollection = this.profilService.addProfilToCollectionIfMissing<IProfil>(
      this.profilsSharedCollection,
      profilModule.profil,
    );
    this.modulesSharedCollection = this.moduleService.addModuleToCollectionIfMissing<IModule>(
      this.modulesSharedCollection,
      profilModule.module,
    );
    this.siteProfilsSharedCollection = this.siteProfilService.addSiteProfilToCollectionIfMissing<ISiteProfil>(
      this.siteProfilsSharedCollection,
      profilModule.siteProfil,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.profilService
      .query()
      .pipe(map((res: HttpResponse<IProfil[]>) => res.body ?? []))
      .pipe(map((profils: IProfil[]) => this.profilService.addProfilToCollectionIfMissing<IProfil>(profils, this.profilModule?.profil)))
      .subscribe((profils: IProfil[]) => (this.profilsSharedCollection = profils));

    this.moduleService
      .query()
      .pipe(map((res: HttpResponse<IModule[]>) => res.body ?? []))
      .pipe(map((modules: IModule[]) => this.moduleService.addModuleToCollectionIfMissing<IModule>(modules, this.profilModule?.module)))
      .subscribe((modules: IModule[]) => (this.modulesSharedCollection = modules));

    this.siteProfilService
      .query()
      .pipe(map((res: HttpResponse<ISiteProfil[]>) => res.body ?? []))
      .pipe(
        map((siteProfils: ISiteProfil[]) =>
          this.siteProfilService.addSiteProfilToCollectionIfMissing<ISiteProfil>(siteProfils, this.profilModule?.siteProfil),
        ),
      )
      .subscribe((siteProfils: ISiteProfil[]) => (this.siteProfilsSharedCollection = siteProfils));
  }
}
