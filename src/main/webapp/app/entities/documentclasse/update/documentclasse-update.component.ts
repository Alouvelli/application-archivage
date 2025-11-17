import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { ISemestre } from 'app/entities/semestre/semestre.model';
import { SemestreService } from 'app/entities/semestre/service/semestre.service';
import { DocumentclasseService } from '../service/documentclasse.service';
import { IDocumentclasse } from '../documentclasse.model';
import { DocumentclasseFormGroup, DocumentclasseFormService } from './documentclasse-form.service';

@Component({
  selector: 'jhi-documentclasse-update',
  templateUrl: './documentclasse-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class DocumentclasseUpdateComponent implements OnInit {
  isSaving = false;
  documentclasse: IDocumentclasse | null = null;

  classesSharedCollection: IClasse[] = [];
  semestresSharedCollection: ISemestre[] = [];

  protected dataUtils = inject(DataUtils);
  protected eventManager = inject(EventManager);
  protected documentclasseService = inject(DocumentclasseService);
  protected documentclasseFormService = inject(DocumentclasseFormService);
  protected classeService = inject(ClasseService);
  protected semestreService = inject(SemestreService);
  protected elementRef = inject(ElementRef);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: DocumentclasseFormGroup = this.documentclasseFormService.createDocumentclasseFormGroup();

  compareClasse = (o1: IClasse | null, o2: IClasse | null): boolean => this.classeService.compareClasse(o1, o2);

  compareSemestre = (o1: ISemestre | null, o2: ISemestre | null): boolean => this.semestreService.compareSemestre(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentclasse }) => {
      this.documentclasse = documentclasse;
      if (documentclasse) {
        this.updateForm(documentclasse);
      }

      this.loadRelationshipsOptions();
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('gestionEcoleApp.error', { ...err, key: `error.file.${err.key}` })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector(`#${idInput}`)) {
      this.elementRef.nativeElement.querySelector(`#${idInput}`).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentclasse = this.documentclasseFormService.getDocumentclasse(this.editForm);
    if (documentclasse.id !== null) {
      this.subscribeToSaveResponse(this.documentclasseService.update(documentclasse));
    } else {
      this.subscribeToSaveResponse(this.documentclasseService.create(documentclasse));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentclasse>>): void {
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

  protected updateForm(documentclasse: IDocumentclasse): void {
    this.documentclasse = documentclasse;
    this.documentclasseFormService.resetForm(this.editForm, documentclasse);

    this.classesSharedCollection = this.classeService.addClasseToCollectionIfMissing<IClasse>(
      this.classesSharedCollection,
      documentclasse.classe,
    );
    this.semestresSharedCollection = this.semestreService.addSemestreToCollectionIfMissing<ISemestre>(
      this.semestresSharedCollection,
      documentclasse.semestre,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.classeService
      .query()
      .pipe(map((res: HttpResponse<IClasse[]>) => res.body ?? []))
      .pipe(map((classes: IClasse[]) => this.classeService.addClasseToCollectionIfMissing<IClasse>(classes, this.documentclasse?.classe)))
      .subscribe((classes: IClasse[]) => (this.classesSharedCollection = classes));

    this.semestreService
      .query()
      .pipe(map((res: HttpResponse<ISemestre[]>) => res.body ?? []))
      .pipe(
        map((semestres: ISemestre[]) =>
          this.semestreService.addSemestreToCollectionIfMissing<ISemestre>(semestres, this.documentclasse?.semestre),
        ),
      )
      .subscribe((semestres: ISemestre[]) => (this.semestresSharedCollection = semestres));
  }
}
