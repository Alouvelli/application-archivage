import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FiliereService } from './filiere.service';
import { DepartementService } from '../departement/departement.service';
import { Filiere, IFiliere } from 'app/shared/model/filiere.model';
import { IDepartement } from 'app/shared/model/departement.model';

@Component({
  selector: 'jhi-filiere-update',
  standalone: true,
  templateUrl: './filiere-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class FiliereUpdateComponent implements OnInit {
  isSaving = false;
  filiere: IFiliere | null = null;

  departements: IDepartement[] = [];

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    libelle: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    etat: [true],
    departementId: [null, Validators.required]
  });

  constructor(
    private readonly filiereService: FiliereService,
    private readonly departementService: DepartementService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ filiere }) => {
        this.filiere = filiere ?? null;
        if (filiere) {
          this.updateForm(filiere);
        }
        this.loadDepartements();
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const filiere = this.createFromForm();
    const save$ = filiere.id !== undefined ? this.filiereService.update(filiere) : this.filiereService.create(filiere);

    save$
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled globally
        }
      });
  }

  private loadDepartements(): void {
    this.departementService
      .query()
      .pipe(
        map(res => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(departements => {
        if (this.filiere?.departement && !departements.find(d => d.id === this.filiere!.departement!.id)) {
          departements.push(this.filiere.departement);
        }
        this.departements = departements;
      });
  }

  private updateForm(filiere: IFiliere): void {
    this.editForm.reset({
      id: { value: filiere.id ?? null, disabled: true },
      libelle: filiere.libelle ?? '',
      description: filiere.description ?? '',
      etat: filiere.etat ?? false,
      departementId: filiere.departement?.id ?? null
    });
  }

  private createFromForm(): IFiliere {
    const rawValue = this.editForm.getRawValue();
    const departement = this.departements.find(option => option.id === rawValue.departementId);
    return new Filiere(rawValue.id ?? undefined, rawValue.libelle ?? undefined, rawValue.description ?? undefined, rawValue.etat ?? false, departement);
  }
}
