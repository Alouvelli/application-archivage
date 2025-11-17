import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ITypeDocument } from 'app/entities/type-document/type-document.model';
import { TypeDocumentService } from 'app/entities/type-document/service/type-document.service';
import { INiveau } from '../niveau.model';
import { NiveauService } from '../service/niveau.service';
import { NiveauFormGroup, NiveauFormService } from './niveau-form.service';

@Component({
  selector: 'jhi-niveau-update',
  templateUrl: './niveau-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NiveauUpdateComponent implements OnInit {
  isSaving = false;
  niveau: INiveau | null = null;

  typeDocumentsSharedCollection: ITypeDocument[] = [];

  protected niveauService = inject(NiveauService);
  protected niveauFormService = inject(NiveauFormService);
  protected typeDocumentService = inject(TypeDocumentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NiveauFormGroup = this.niveauFormService.createNiveauFormGroup();

  compareTypeDocument = (o1: ITypeDocument | null, o2: ITypeDocument | null): boolean =>
    this.typeDocumentService.compareTypeDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveau }) => {
      this.niveau = niveau;
      if (niveau) {
        this.updateForm(niveau);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveau = this.niveauFormService.getNiveau(this.editForm);
    if (niveau.id !== null) {
      this.subscribeToSaveResponse(this.niveauService.update(niveau));
    } else {
      this.subscribeToSaveResponse(this.niveauService.create(niveau));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveau>>): void {
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

  protected updateForm(niveau: INiveau): void {
    this.niveau = niveau;
    this.niveauFormService.resetForm(this.editForm, niveau);

    this.typeDocumentsSharedCollection = this.typeDocumentService.addTypeDocumentToCollectionIfMissing<ITypeDocument>(
      this.typeDocumentsSharedCollection,
      ...(niveau.typeDocuments ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.typeDocumentService
      .query()
      .pipe(map((res: HttpResponse<ITypeDocument[]>) => res.body ?? []))
      .pipe(
        map((typeDocuments: ITypeDocument[]) =>
          this.typeDocumentService.addTypeDocumentToCollectionIfMissing<ITypeDocument>(
            typeDocuments,
            ...(this.niveau?.typeDocuments ?? []),
          ),
        ),
      )
      .subscribe((typeDocuments: ITypeDocument[]) => (this.typeDocumentsSharedCollection = typeDocuments));
  }
}
