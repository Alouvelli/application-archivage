import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ClasseService } from './classe.service';
import { IClasse, Classe } from 'app/shared/model/classe.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { INiveau } from 'app/shared/model/niveau.model';
import { FiliereService } from 'app/entities/filiere';
import { NiveauService } from 'app/entities/niveau';

@Component({
  selector: 'jhi-classe-update',
  standalone: true,
  templateUrl: './classe-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;
  classe: IClasse | null = null;

  filieres: IFiliere[] = [];
  niveaux: INiveau[] = [];

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    code: ['', [Validators.required, Validators.maxLength(50)]],
    libelle: ['', [Validators.required, Validators.maxLength(100)]],
    description: [''],
    etat: [true],
    filiereId: [null, Validators.required],
    niveauId: [null, Validators.required]
  });

  constructor(
    private readonly classeService: ClasseService,
    private readonly filiereService: FiliereService,
    private readonly niveauService: NiveauService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ classe }) => {
        this.classe = classe ?? null;
        if (classe) {
          this.updateForm(classe);
        } else {
          this.editForm.reset({
            id: { value: null, disabled: true },
            code: '',
            libelle: '',
            description: '',
            etat: true,
            filiereId: null,
            niveauId: null
          });
        }
        this.loadRelationshipsOptions();
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const classe = this.createFromForm();
    const save$ = classe.id !== undefined ? this.classeService.update(classe) : this.classeService.create(classe);

    save$
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled globally by HTTP interceptor
        }
      });
  }

  protected updateForm(classe: IClasse): void {
    this.editForm.reset({
      id: { value: classe.id ?? null, disabled: true },
      code: classe.code ?? '',
      libelle: classe.libelle ?? '',
      description: classe.description ?? '',
      etat: classe.etat ?? false,
      filiereId: classe.filiere?.id ?? null,
      niveauId: classe.niveau?.id ?? null
    });
  }

  protected loadRelationshipsOptions(): void {
    this.filiereService
      .query()
      .pipe(
        map(res => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(filieres => {
        if (this.classe?.filiere && !filieres.find(filiere => filiere.id === this.classe!.filiere!.id)) {
          filieres.push(this.classe.filiere);
        }
        this.filieres = filieres;
      });

    this.niveauService
      .query()
      .pipe(
        map(res => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(niveaux => {
        if (this.classe?.niveau && !niveaux.find(niveau => niveau.id === this.classe!.niveau!.id)) {
          niveaux.push(this.classe.niveau);
        }
        this.niveaux = niveaux;
      });
  }

  protected createFromForm(): IClasse {
    const rawValue = this.editForm.getRawValue();
    const filiere = this.filieres.find(option => option.id === rawValue.filiereId) ?? undefined;
    const niveau = this.niveaux.find(option => option.id === rawValue.niveauId) ?? undefined;

    return new Classe(
      rawValue.id ?? undefined,
      rawValue.description ?? undefined,
      rawValue.etat ?? false,
      rawValue.code ?? undefined,
      rawValue.libelle ?? undefined,
      filiere,
      niveau
    );
  }
}
