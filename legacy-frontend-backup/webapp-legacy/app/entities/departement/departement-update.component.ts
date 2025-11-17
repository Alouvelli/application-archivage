import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { DepartementService } from './departement.service';
import { Departement, IDepartement } from 'app/shared/model/departement.model';

@Component({
  selector: 'jhi-departement-update',
  standalone: true,
  templateUrl: './departement-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class DepartementUpdateComponent implements OnInit {
  isSaving = false;
  departement: IDepartement | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    libelle: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    etat: [true]
  });

  constructor(
    private readonly departementService: DepartementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ departement }) => {
        this.departement = departement ?? null;
        if (departement) {
          this.updateForm(departement);
        } else {
          this.editForm.reset({
            id: { value: null, disabled: true },
            libelle: '',
            description: '',
            etat: true
          });
        }
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const departement = this.createFromForm();
    const save$ = departement.id !== undefined ? this.departementService.update(departement) : this.departementService.create(departement);

    save$
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled globally by HTTP interceptor
        }
      });
  }

  private updateForm(departement: IDepartement): void {
    this.editForm.reset({
      id: { value: departement.id ?? null, disabled: true },
      libelle: departement.libelle ?? '',
      description: departement.description ?? '',
      etat: departement.etat ?? false
    });
  }

  private createFromForm(): IDepartement {
    const rawValue = this.editForm.getRawValue();
    return new Departement(rawValue.id ?? undefined, rawValue.description ?? undefined, rawValue.etat ?? false, rawValue.libelle ?? undefined);
  }
}
