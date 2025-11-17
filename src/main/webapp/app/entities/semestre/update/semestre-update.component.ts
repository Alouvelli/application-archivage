import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ISemestre } from '../semestre.model';
import { SemestreService } from '../service/semestre.service';
import { SemestreFormGroup, SemestreFormService } from './semestre-form.service';

@Component({
  selector: 'jhi-semestre-update',
  templateUrl: './semestre-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class SemestreUpdateComponent implements OnInit {
  isSaving = false;
  semestre: ISemestre | null = null;

  protected semestreService = inject(SemestreService);
  protected semestreFormService = inject(SemestreFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: SemestreFormGroup = this.semestreFormService.createSemestreFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ semestre }) => {
      this.semestre = semestre;
      if (semestre) {
        this.updateForm(semestre);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const semestre = this.semestreFormService.getSemestre(this.editForm);
    if (semestre.id !== null) {
      this.subscribeToSaveResponse(this.semestreService.update(semestre));
    } else {
      this.subscribeToSaveResponse(this.semestreService.create(semestre));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISemestre>>): void {
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

  protected updateForm(semestre: ISemestre): void {
    this.semestre = semestre;
    this.semestreFormService.resetForm(this.editForm, semestre);
  }
}
