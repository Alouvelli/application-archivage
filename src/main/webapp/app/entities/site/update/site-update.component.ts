import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEcole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/service/ecole.service';
import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { SiteService } from '../service/site.service';
import { ISite } from '../site.model';
import { SiteFormGroup, SiteFormService } from './site-form.service';

@Component({
  selector: 'jhi-site-update',
  templateUrl: './site-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SiteUpdateComponent implements OnInit {
  isSaving = false;
  site: ISite | null = null;

  ecolesSharedCollection: IEcole[] = [];
  modulesSharedCollection: IModule[] = [];

  protected siteService = inject(SiteService);
  protected siteFormService = inject(SiteFormService);
  protected ecoleService = inject(EcoleService);
  protected moduleService = inject(ModuleService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SiteFormGroup = this.siteFormService.createSiteFormGroup();

  compareEcole = (o1: IEcole | null, o2: IEcole | null): boolean => this.ecoleService.compareEcole(o1, o2);

  compareModule = (o1: IModule | null, o2: IModule | null): boolean => this.moduleService.compareModule(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ site }) => {
      this.site = site;
      if (site) {
        this.updateForm(site);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const site = this.siteFormService.getSite(this.editForm);
    if (site.id !== null) {
      this.subscribeToSaveResponse(this.siteService.update(site));
    } else {
      this.subscribeToSaveResponse(this.siteService.create(site));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>): void {
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

  protected updateForm(site: ISite): void {
    this.site = site;
    this.siteFormService.resetForm(this.editForm, site);

    this.ecolesSharedCollection = this.ecoleService.addEcoleToCollectionIfMissing<IEcole>(this.ecolesSharedCollection, site.ecole);
    this.modulesSharedCollection = this.moduleService.addModuleToCollectionIfMissing<IModule>(
      this.modulesSharedCollection,
      ...(site.modules ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.ecoleService
      .query()
      .pipe(map((res: HttpResponse<IEcole[]>) => res.body ?? []))
      .pipe(map((ecoles: IEcole[]) => this.ecoleService.addEcoleToCollectionIfMissing<IEcole>(ecoles, this.site?.ecole)))
      .subscribe((ecoles: IEcole[]) => (this.ecolesSharedCollection = ecoles));

    this.moduleService
      .query()
      .pipe(map((res: HttpResponse<IModule[]>) => res.body ?? []))
      .pipe(map((modules: IModule[]) => this.moduleService.addModuleToCollectionIfMissing<IModule>(modules, ...(this.site?.modules ?? []))))
      .subscribe((modules: IModule[]) => (this.modulesSharedCollection = modules));
  }
}
