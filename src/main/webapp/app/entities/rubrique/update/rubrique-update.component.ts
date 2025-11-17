import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { IRubrique } from '../rubrique.model';
import { RubriqueService } from '../service/rubrique.service';
import { RubriqueFormGroup, RubriqueFormService } from './rubrique-form.service';

@Component({
  selector: 'jhi-rubrique-update',
  templateUrl: './rubrique-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RubriqueUpdateComponent implements OnInit {
  isSaving = false;
  rubrique: IRubrique | null = null;

  modulesSharedCollection: IModule[] = [];

  protected rubriqueService = inject(RubriqueService);
  protected rubriqueFormService = inject(RubriqueFormService);
  protected moduleService = inject(ModuleService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RubriqueFormGroup = this.rubriqueFormService.createRubriqueFormGroup();

  compareModule = (o1: IModule | null, o2: IModule | null): boolean => this.moduleService.compareModule(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rubrique }) => {
      this.rubrique = rubrique;
      if (rubrique) {
        this.updateForm(rubrique);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rubrique = this.rubriqueFormService.getRubrique(this.editForm);
    if (rubrique.id !== null) {
      this.subscribeToSaveResponse(this.rubriqueService.update(rubrique));
    } else {
      this.subscribeToSaveResponse(this.rubriqueService.create(rubrique));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRubrique>>): void {
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

  protected updateForm(rubrique: IRubrique): void {
    this.rubrique = rubrique;
    this.rubriqueFormService.resetForm(this.editForm, rubrique);

    this.modulesSharedCollection = this.moduleService.addModuleToCollectionIfMissing<IModule>(
      this.modulesSharedCollection,
      rubrique.module,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.moduleService
      .query()
      .pipe(map((res: HttpResponse<IModule[]>) => res.body ?? []))
      .pipe(map((modules: IModule[]) => this.moduleService.addModuleToCollectionIfMissing<IModule>(modules, this.rubrique?.module)))
      .subscribe((modules: IModule[]) => (this.modulesSharedCollection = modules));
  }
}
