import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Anneescolaire, IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';

@Component({
  selector: 'jhi-anneescolaire-update',
  standalone: true,
  templateUrl: './anneescolaire-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class AnneescolaireUpdateComponent implements OnInit {
  isSaving = false;
  anneescolaire: IAnneescolaire | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm: FormGroup = this.fb.group({
    id: [{ value: null, disabled: true }],
    libelle: ['', [Validators.required, Validators.maxLength(128)]],
    encours: [''],
    etat: ['']
  });

  constructor(
    private readonly anneescolaireService: AnneescolaireService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ anneescolaire }) => {
        this.anneescolaire = anneescolaire ?? null;
        if (anneescolaire) {
          this.updateForm(anneescolaire);
        } else {
          this.editForm.reset({
            id: { value: null, disabled: true },
            libelle: '',
            encours: '',
            etat: ''
          });
        }
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const anneescolaire = this.createFromForm();
    const save$ = anneescolaire.id !== undefined ? this.anneescolaireService.update(anneescolaire) : this.anneescolaireService.create(anneescolaire);
    save$
      .pipe(
        finalize(() => {
          this.isSaving = false;
        })
      )
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled by global HTTP interceptor
        }
      });
  }

  private updateForm(anneescolaire: IAnneescolaire): void {
    this.editForm.reset({
      id: { value: anneescolaire.id ?? null, disabled: true },
      libelle: anneescolaire.libelle ?? '',
      encours: anneescolaire.encours ?? '',
      etat: anneescolaire.etat ?? ''
    });
  }

  private createFromForm(): IAnneescolaire {
    const rawValue = { ...this.editForm.getRawValue() };
    return new Anneescolaire(rawValue.id ?? undefined, rawValue.libelle, rawValue.encours, rawValue.etat);
  }
}
