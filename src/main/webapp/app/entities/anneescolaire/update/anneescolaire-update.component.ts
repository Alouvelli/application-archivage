import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IAnneescolaire } from '../anneescolaire.model';
import { AnneescolaireService } from '../service/anneescolaire.service';
import { AnneescolaireFormGroup, AnneescolaireFormService } from './anneescolaire-form.service';

@Component({
  selector: 'jhi-anneescolaire-update',
  templateUrl: './anneescolaire-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class AnneescolaireUpdateComponent implements OnInit {
  isSaving = false;
  anneescolaire: IAnneescolaire | null = null;

  protected anneescolaireService = inject(AnneescolaireService);
  protected anneescolaireFormService = inject(AnneescolaireFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: AnneescolaireFormGroup = this.anneescolaireFormService.createAnneescolaireFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ anneescolaire }) => {
      this.anneescolaire = anneescolaire;
      if (anneescolaire) {
        this.updateForm(anneescolaire);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const anneescolaire = this.anneescolaireFormService.getAnneescolaire(this.editForm);
    if (anneescolaire.id !== null) {
      this.subscribeToSaveResponse(this.anneescolaireService.update(anneescolaire));
    } else {
      this.subscribeToSaveResponse(this.anneescolaireService.create(anneescolaire));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAnneescolaire>>): void {
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

  protected updateForm(anneescolaire: IAnneescolaire): void {
    this.anneescolaire = anneescolaire;
    this.anneescolaireFormService.resetForm(this.editForm, anneescolaire);
  }
}
