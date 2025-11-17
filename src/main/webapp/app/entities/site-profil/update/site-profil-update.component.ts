import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { SiteProfilService } from '../service/site-profil.service';
import { ISiteProfil } from '../site-profil.model';
import { SiteProfilFormGroup, SiteProfilFormService } from './site-profil-form.service';

@Component({
  selector: 'jhi-site-profil-update',
  templateUrl: './site-profil-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SiteProfilUpdateComponent implements OnInit {
  isSaving = false;
  siteProfil: ISiteProfil | null = null;

  sitesSharedCollection: ISite[] = [];
  profilsSharedCollection: IProfil[] = [];

  protected siteProfilService = inject(SiteProfilService);
  protected siteProfilFormService = inject(SiteProfilFormService);
  protected siteService = inject(SiteService);
  protected profilService = inject(ProfilService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SiteProfilFormGroup = this.siteProfilFormService.createSiteProfilFormGroup();

  compareSite = (o1: ISite | null, o2: ISite | null): boolean => this.siteService.compareSite(o1, o2);

  compareProfil = (o1: IProfil | null, o2: IProfil | null): boolean => this.profilService.compareProfil(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ siteProfil }) => {
      this.siteProfil = siteProfil;
      if (siteProfil) {
        this.updateForm(siteProfil);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const siteProfil = this.siteProfilFormService.getSiteProfil(this.editForm);
    if (siteProfil.id !== null) {
      this.subscribeToSaveResponse(this.siteProfilService.update(siteProfil));
    } else {
      this.subscribeToSaveResponse(this.siteProfilService.create(siteProfil));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISiteProfil>>): void {
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

  protected updateForm(siteProfil: ISiteProfil): void {
    this.siteProfil = siteProfil;
    this.siteProfilFormService.resetForm(this.editForm, siteProfil);

    this.sitesSharedCollection = this.siteService.addSiteToCollectionIfMissing<ISite>(this.sitesSharedCollection, siteProfil.site);
    this.profilsSharedCollection = this.profilService.addProfilToCollectionIfMissing<IProfil>(
      this.profilsSharedCollection,
      siteProfil.profil,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.siteService
      .query()
      .pipe(map((res: HttpResponse<ISite[]>) => res.body ?? []))
      .pipe(map((sites: ISite[]) => this.siteService.addSiteToCollectionIfMissing<ISite>(sites, this.siteProfil?.site)))
      .subscribe((sites: ISite[]) => (this.sitesSharedCollection = sites));

    this.profilService
      .query()
      .pipe(map((res: HttpResponse<IProfil[]>) => res.body ?? []))
      .pipe(map((profils: IProfil[]) => this.profilService.addProfilToCollectionIfMissing<IProfil>(profils, this.siteProfil?.profil)))
      .subscribe((profils: IProfil[]) => (this.profilsSharedCollection = profils));
  }
}
