import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IEtudiant } from 'app/entities/etudiant/etudiant.model';
import { EtudiantService } from 'app/entities/etudiant/service/etudiant.service';
import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { IAnneescolaire } from 'app/entities/anneescolaire/anneescolaire.model';
import { AnneescolaireService } from 'app/entities/anneescolaire/service/anneescolaire.service';
import { IDocument } from 'app/entities/document/document.model';
import { DocumentService } from 'app/entities/document/service/document.service';
import { InscriptionService } from '../service/inscription.service';
import { IInscription } from '../inscription.model';
import { InscriptionFormGroup, InscriptionFormService } from './inscription-form.service';

@Component({
  selector: 'jhi-inscription-update',
  templateUrl: './inscription-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class InscriptionUpdateComponent implements OnInit {
  isSaving = false;
  inscription: IInscription | null = null;

  etudiantsSharedCollection: IEtudiant[] = [];
  classesSharedCollection: IClasse[] = [];
  anneescolairesSharedCollection: IAnneescolaire[] = [];
  documentsSharedCollection: IDocument[] = [];

  protected inscriptionService = inject(InscriptionService);
  protected inscriptionFormService = inject(InscriptionFormService);
  protected etudiantService = inject(EtudiantService);
  protected classeService = inject(ClasseService);
  protected anneescolaireService = inject(AnneescolaireService);
  protected documentService = inject(DocumentService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: InscriptionFormGroup = this.inscriptionFormService.createInscriptionFormGroup();

  compareEtudiant = (o1: IEtudiant | null, o2: IEtudiant | null): boolean => this.etudiantService.compareEtudiant(o1, o2);

  compareClasse = (o1: IClasse | null, o2: IClasse | null): boolean => this.classeService.compareClasse(o1, o2);

  compareAnneescolaire = (o1: IAnneescolaire | null, o2: IAnneescolaire | null): boolean =>
    this.anneescolaireService.compareAnneescolaire(o1, o2);

  compareDocument = (o1: IDocument | null, o2: IDocument | null): boolean => this.documentService.compareDocument(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ inscription }) => {
      this.inscription = inscription;
      if (inscription) {
        this.updateForm(inscription);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const inscription = this.inscriptionFormService.getInscription(this.editForm);
    if (inscription.id !== null) {
      this.subscribeToSaveResponse(this.inscriptionService.update(inscription));
    } else {
      this.subscribeToSaveResponse(this.inscriptionService.create(inscription));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IInscription>>): void {
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

  protected updateForm(inscription: IInscription): void {
    this.inscription = inscription;
    this.inscriptionFormService.resetForm(this.editForm, inscription);

    this.etudiantsSharedCollection = this.etudiantService.addEtudiantToCollectionIfMissing<IEtudiant>(
      this.etudiantsSharedCollection,
      inscription.etudiant,
    );
    this.classesSharedCollection = this.classeService.addClasseToCollectionIfMissing<IClasse>(
      this.classesSharedCollection,
      inscription.classe,
    );
    this.anneescolairesSharedCollection = this.anneescolaireService.addAnneescolaireToCollectionIfMissing<IAnneescolaire>(
      this.anneescolairesSharedCollection,
      inscription.anneescolaire,
    );
    this.documentsSharedCollection = this.documentService.addDocumentToCollectionIfMissing<IDocument>(
      this.documentsSharedCollection,
      ...(inscription.documents ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.etudiantService
      .query()
      .pipe(map((res: HttpResponse<IEtudiant[]>) => res.body ?? []))
      .pipe(
        map((etudiants: IEtudiant[]) =>
          this.etudiantService.addEtudiantToCollectionIfMissing<IEtudiant>(etudiants, this.inscription?.etudiant),
        ),
      )
      .subscribe((etudiants: IEtudiant[]) => (this.etudiantsSharedCollection = etudiants));

    this.classeService
      .query()
      .pipe(map((res: HttpResponse<IClasse[]>) => res.body ?? []))
      .pipe(map((classes: IClasse[]) => this.classeService.addClasseToCollectionIfMissing<IClasse>(classes, this.inscription?.classe)))
      .subscribe((classes: IClasse[]) => (this.classesSharedCollection = classes));

    this.anneescolaireService
      .query()
      .pipe(map((res: HttpResponse<IAnneescolaire[]>) => res.body ?? []))
      .pipe(
        map((anneescolaires: IAnneescolaire[]) =>
          this.anneescolaireService.addAnneescolaireToCollectionIfMissing<IAnneescolaire>(anneescolaires, this.inscription?.anneescolaire),
        ),
      )
      .subscribe((anneescolaires: IAnneescolaire[]) => (this.anneescolairesSharedCollection = anneescolaires));

    this.documentService
      .query()
      .pipe(map((res: HttpResponse<IDocument[]>) => res.body ?? []))
      .pipe(
        map((documents: IDocument[]) =>
          this.documentService.addDocumentToCollectionIfMissing<IDocument>(documents, ...(this.inscription?.documents ?? [])),
        ),
      )
      .subscribe((documents: IDocument[]) => (this.documentsSharedCollection = documents));
  }
}
