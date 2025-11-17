import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { INiveau } from 'app/entities/niveau/niveau.model';
import { NiveauService } from 'app/entities/niveau/service/niveau.service';
import { ClasseService } from '../service/classe.service';
import { IClasse } from '../classe.model';
import { ClasseFormGroup, ClasseFormService } from './classe-form.service';

@Component({
  selector: 'jhi-classe-update',
  templateUrl: './classe-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class ClasseUpdateComponent implements OnInit {
  isSaving = false;
  classe: IClasse | null = null;

  filieresSharedCollection: IFiliere[] = [];
  niveausSharedCollection: INiveau[] = [];

  protected classeService = inject(ClasseService);
  protected classeFormService = inject(ClasseFormService);
  protected filiereService = inject(FiliereService);
  protected niveauService = inject(NiveauService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: ClasseFormGroup = this.classeFormService.createClasseFormGroup();

  compareFiliere = (o1: IFiliere | null, o2: IFiliere | null): boolean => this.filiereService.compareFiliere(o1, o2);

  compareNiveau = (o1: INiveau | null, o2: INiveau | null): boolean => this.niveauService.compareNiveau(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ classe }) => {
      this.classe = classe;
      if (classe) {
        this.updateForm(classe);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const classe = this.classeFormService.getClasse(this.editForm);
    if (classe.id !== null) {
      this.subscribeToSaveResponse(this.classeService.update(classe));
    } else {
      this.subscribeToSaveResponse(this.classeService.create(classe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClasse>>): void {
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

  protected updateForm(classe: IClasse): void {
    this.classe = classe;
    this.classeFormService.resetForm(this.editForm, classe);

    this.filieresSharedCollection = this.filiereService.addFiliereToCollectionIfMissing<IFiliere>(
      this.filieresSharedCollection,
      classe.filiere,
    );
    this.niveausSharedCollection = this.niveauService.addNiveauToCollectionIfMissing<INiveau>(this.niveausSharedCollection, classe.niveau);
  }

  protected loadRelationshipsOptions(): void {
    this.filiereService
      .query()
      .pipe(map((res: HttpResponse<IFiliere[]>) => res.body ?? []))
      .pipe(map((filieres: IFiliere[]) => this.filiereService.addFiliereToCollectionIfMissing<IFiliere>(filieres, this.classe?.filiere)))
      .subscribe((filieres: IFiliere[]) => (this.filieresSharedCollection = filieres));

    this.niveauService
      .query()
      .pipe(map((res: HttpResponse<INiveau[]>) => res.body ?? []))
      .pipe(map((niveaus: INiveau[]) => this.niveauService.addNiveauToCollectionIfMissing<INiveau>(niveaus, this.classe?.niveau)))
      .subscribe((niveaus: INiveau[]) => (this.niveausSharedCollection = niveaus));
  }
}
