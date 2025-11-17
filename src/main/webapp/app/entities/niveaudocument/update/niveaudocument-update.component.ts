import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { INiveau } from 'app/entities/niveau/niveau.model';
import { NiveauService } from 'app/entities/niveau/service/niveau.service';
import { IDocument } from 'app/entities/document/document.model';
import { DocumentService } from 'app/entities/document/service/document.service';
import { NiveaudocumentService } from '../service/niveaudocument.service';
import { INiveaudocument } from '../niveaudocument.model';
import { NiveaudocumentFormGroup, NiveaudocumentFormService } from './niveaudocument-form.service';

@Component({
  selector: 'jhi-niveaudocument-update',
  templateUrl: './niveaudocument-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class NiveaudocumentUpdateComponent implements OnInit {
  isSaving = false;
  niveaudocument: INiveaudocument | null = null;

  niveausSharedCollection: INiveau[] = [];
  documentsSharedCollection: IDocument[] = [];

  protected niveaudocumentService = inject(NiveaudocumentService);
  protected niveaudocumentFormService = inject(NiveaudocumentFormService);
  protected niveauService = inject(NiveauService);
  protected documentService = inject(DocumentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: NiveaudocumentFormGroup = this.niveaudocumentFormService.createNiveaudocumentFormGroup();

  compareNiveau = (o1: INiveau | null, o2: INiveau | null): boolean => this.niveauService.compareNiveau(o1, o2);

  compareDocument = (o1: IDocument | null, o2: IDocument | null): boolean => this.documentService.compareDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ niveaudocument }) => {
      this.niveaudocument = niveaudocument;
      if (niveaudocument) {
        this.updateForm(niveaudocument);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const niveaudocument = this.niveaudocumentFormService.getNiveaudocument(this.editForm);
    if (niveaudocument.id !== null) {
      this.subscribeToSaveResponse(this.niveaudocumentService.update(niveaudocument));
    } else {
      this.subscribeToSaveResponse(this.niveaudocumentService.create(niveaudocument));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INiveaudocument>>): void {
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

  protected updateForm(niveaudocument: INiveaudocument): void {
    this.niveaudocument = niveaudocument;
    this.niveaudocumentFormService.resetForm(this.editForm, niveaudocument);

    this.niveausSharedCollection = this.niveauService.addNiveauToCollectionIfMissing<INiveau>(
      this.niveausSharedCollection,
      niveaudocument.niveau,
    );
    this.documentsSharedCollection = this.documentService.addDocumentToCollectionIfMissing<IDocument>(
      this.documentsSharedCollection,
      niveaudocument.document,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.niveauService
      .query()
      .pipe(map((res: HttpResponse<INiveau[]>) => res.body ?? []))
      .pipe(map((niveaus: INiveau[]) => this.niveauService.addNiveauToCollectionIfMissing<INiveau>(niveaus, this.niveaudocument?.niveau)))
      .subscribe((niveaus: INiveau[]) => (this.niveausSharedCollection = niveaus));

    this.documentService
      .query()
      .pipe(map((res: HttpResponse<IDocument[]>) => res.body ?? []))
      .pipe(
        map((documents: IDocument[]) =>
          this.documentService.addDocumentToCollectionIfMissing<IDocument>(documents, this.niveaudocument?.document),
        ),
      )
      .subscribe((documents: IDocument[]) => (this.documentsSharedCollection = documents));
  }
}
