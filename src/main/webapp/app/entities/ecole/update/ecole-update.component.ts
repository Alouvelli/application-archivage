import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';
import { IEcole } from '../ecole.model';
import { EcoleService } from '../service/ecole.service';
import { EcoleFormGroup, EcoleFormService } from './ecole-form.service';

@Component({
  selector: 'jhi-ecole-update',
  templateUrl: './ecole-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EcoleUpdateComponent implements OnInit {
  isSaving = false;
  ecole: IEcole | null = null;

  applicationsCollection: IApplication[] = [];

  protected ecoleService = inject(EcoleService);
  protected ecoleFormService = inject(EcoleFormService);
  protected applicationService = inject(ApplicationService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: EcoleFormGroup = this.ecoleFormService.createEcoleFormGroup();

  compareApplication = (o1: IApplication | null, o2: IApplication | null): boolean => this.applicationService.compareApplication(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ecole }) => {
      this.ecole = ecole;
      if (ecole) {
        this.updateForm(ecole);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ecole = this.ecoleFormService.getEcole(this.editForm);
    if (ecole.id !== null) {
      this.subscribeToSaveResponse(this.ecoleService.update(ecole));
    } else {
      this.subscribeToSaveResponse(this.ecoleService.create(ecole));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEcole>>): void {
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

  protected updateForm(ecole: IEcole): void {
    this.ecole = ecole;
    this.ecoleFormService.resetForm(this.editForm, ecole);

    this.applicationsCollection = this.applicationService.addApplicationToCollectionIfMissing<IApplication>(
      this.applicationsCollection,
      ecole.application,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.applicationService
      .query({ filter: 'ecole-is-null' })
      .pipe(map((res: HttpResponse<IApplication[]>) => res.body ?? []))
      .pipe(
        map((applications: IApplication[]) =>
          this.applicationService.addApplicationToCollectionIfMissing<IApplication>(applications, this.ecole?.application),
        ),
      )
      .subscribe((applications: IApplication[]) => (this.applicationsCollection = applications));
  }
}
