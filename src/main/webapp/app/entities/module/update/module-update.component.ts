import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { IModule } from '../module.model';
import { ModuleService } from '../service/module.service';
import { ModuleFormGroup, ModuleFormService } from './module-form.service';

@Component({
  selector: 'jhi-module-update',
  templateUrl: './module-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ModuleUpdateComponent implements OnInit {
  isSaving = false;
  module: IModule | null = null;

  sitesSharedCollection: ISite[] = [];

  protected moduleService = inject(ModuleService);
  protected moduleFormService = inject(ModuleFormService);
  protected siteService = inject(SiteService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ModuleFormGroup = this.moduleFormService.createModuleFormGroup();

  compareSite = (o1: ISite | null, o2: ISite | null): boolean => this.siteService.compareSite(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ module }) => {
      this.module = module;
      if (module) {
        this.updateForm(module);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const module = this.moduleFormService.getModule(this.editForm);
    if (module.id !== null) {
      this.subscribeToSaveResponse(this.moduleService.update(module));
    } else {
      this.subscribeToSaveResponse(this.moduleService.create(module));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IModule>>): void {
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

  protected updateForm(module: IModule): void {
    this.module = module;
    this.moduleFormService.resetForm(this.editForm, module);

    this.sitesSharedCollection = this.siteService.addSiteToCollectionIfMissing<ISite>(this.sitesSharedCollection, ...(module.sites ?? []));
  }

  protected loadRelationshipsOptions(): void {
    this.siteService
      .query()
      .pipe(map((res: HttpResponse<ISite[]>) => res.body ?? []))
      .pipe(map((sites: ISite[]) => this.siteService.addSiteToCollectionIfMissing<ISite>(sites, ...(this.module?.sites ?? []))))
      .subscribe((sites: ISite[]) => (this.sitesSharedCollection = sites));
  }
}
