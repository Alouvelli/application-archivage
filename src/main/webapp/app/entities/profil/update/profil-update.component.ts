import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEcole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/service/ecole.service';
import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { ProfilService } from '../service/profil.service';
import { IProfil } from '../profil.model';
import { ProfilFormGroup, ProfilFormService } from './profil-form.service';

@Component({
  selector: 'jhi-profil-update',
  templateUrl: './profil-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ProfilUpdateComponent implements OnInit {
  isSaving = false;
  profil: IProfil | null = null;

  ecolesSharedCollection: IEcole[] = [];
  sitesSharedCollection: ISite[] = [];

  protected profilService = inject(ProfilService);
  protected profilFormService = inject(ProfilFormService);
  protected ecoleService = inject(EcoleService);
  protected siteService = inject(SiteService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ProfilFormGroup = this.profilFormService.createProfilFormGroup();

  compareEcole = (o1: IEcole | null, o2: IEcole | null): boolean => this.ecoleService.compareEcole(o1, o2);

  compareSite = (o1: ISite | null, o2: ISite | null): boolean => this.siteService.compareSite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ profil }) => {
      this.profil = profil;
      if (profil) {
        this.updateForm(profil);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const profil = this.profilFormService.getProfil(this.editForm);
    if (profil.id !== null) {
      this.subscribeToSaveResponse(this.profilService.update(profil));
    } else {
      this.subscribeToSaveResponse(this.profilService.create(profil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProfil>>): void {
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

  protected updateForm(profil: IProfil): void {
    this.profil = profil;
    this.profilFormService.resetForm(this.editForm, profil);

    this.ecolesSharedCollection = this.ecoleService.addEcoleToCollectionIfMissing<IEcole>(this.ecolesSharedCollection, profil.ecole);
    this.sitesSharedCollection = this.siteService.addSiteToCollectionIfMissing<ISite>(this.sitesSharedCollection, profil.site);
  }

  protected loadRelationshipsOptions(): void {
    this.ecoleService
      .query()
      .pipe(map((res: HttpResponse<IEcole[]>) => res.body ?? []))
      .pipe(map((ecoles: IEcole[]) => this.ecoleService.addEcoleToCollectionIfMissing<IEcole>(ecoles, this.profil?.ecole)))
      .subscribe((ecoles: IEcole[]) => (this.ecolesSharedCollection = ecoles));

    this.siteService
      .query()
      .pipe(map((res: HttpResponse<ISite[]>) => res.body ?? []))
      .pipe(map((sites: ISite[]) => this.siteService.addSiteToCollectionIfMissing<ISite>(sites, this.profil?.site)))
      .subscribe((sites: ISite[]) => (this.sitesSharedCollection = sites));
  }
}
