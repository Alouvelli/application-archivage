import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ITypeDocument, TypeDocument } from 'app/shared/model/type-document.model';
import { TypeDocumentService } from './type-document.service';

@Component({
  selector: 'jhi-type-document-update',
  standalone: true,
  templateUrl: './type-document-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class TypeDocumentUpdateComponent implements OnInit {
  isSaving = false;
  typeDocument: ITypeDocument | null = null;

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    libelle: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
    etat: [true]
  });

  constructor(
    private readonly typeDocumentService: TypeDocumentService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(({ typeDocument }) => {
      this.typeDocument = typeDocument ?? null;
      if (typeDocument) {
        this.updateForm(typeDocument);
      }
    });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const typeDocument = this.createFromForm();
    const save$ = typeDocument.id !== undefined ? this.typeDocumentService.update(typeDocument) : this.typeDocumentService.create(typeDocument);

    save$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => (this.isSaving = false))
      )
      .subscribe({
        next: () => this.previousState()
      });
  }

  private updateForm(typeDocument: ITypeDocument): void {
    this.editForm.patchValue({
      id: typeDocument.id ?? null,
      libelle: typeDocument.libelle ?? '',
      description: typeDocument.description ?? '',
      etat: typeDocument.etat ?? false
    });
  }

  private createFromForm(): ITypeDocument {
    const rawValue = this.editForm.getRawValue();
    return new TypeDocument(rawValue.id ?? undefined, rawValue.libelle ?? undefined, rawValue.description ?? undefined, rawValue.etat ?? false);
  }
}
