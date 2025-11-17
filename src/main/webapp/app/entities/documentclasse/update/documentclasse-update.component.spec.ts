import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IClasse } from 'app/entities/classe/classe.model';
import { ClasseService } from 'app/entities/classe/service/classe.service';
import { ISemestre } from 'app/entities/semestre/semestre.model';
import { SemestreService } from 'app/entities/semestre/service/semestre.service';
import { IDocumentclasse } from '../documentclasse.model';
import { DocumentclasseService } from '../service/documentclasse.service';
import { DocumentclasseFormService } from './documentclasse-form.service';

import { DocumentclasseUpdateComponent } from './documentclasse-update.component';

describe('Documentclasse Management Update Component', () => {
  let comp: DocumentclasseUpdateComponent;
  let fixture: ComponentFixture<DocumentclasseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentclasseFormService: DocumentclasseFormService;
  let documentclasseService: DocumentclasseService;
  let classeService: ClasseService;
  let semestreService: SemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentclasseUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DocumentclasseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentclasseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentclasseFormService = TestBed.inject(DocumentclasseFormService);
    documentclasseService = TestBed.inject(DocumentclasseService);
    classeService = TestBed.inject(ClasseService);
    semestreService = TestBed.inject(SemestreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Classe query and add missing value', () => {
      const documentclasse: IDocumentclasse = { id: 30985 };
      const classe: IClasse = { id: 4563 };
      documentclasse.classe = classe;

      const classeCollection: IClasse[] = [{ id: 4563 }];
      jest.spyOn(classeService, 'query').mockReturnValue(of(new HttpResponse({ body: classeCollection })));
      const additionalClasses = [classe];
      const expectedCollection: IClasse[] = [...additionalClasses, ...classeCollection];
      jest.spyOn(classeService, 'addClasseToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentclasse });
      comp.ngOnInit();

      expect(classeService.query).toHaveBeenCalled();
      expect(classeService.addClasseToCollectionIfMissing).toHaveBeenCalledWith(
        classeCollection,
        ...additionalClasses.map(expect.objectContaining),
      );
      expect(comp.classesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Semestre query and add missing value', () => {
      const documentclasse: IDocumentclasse = { id: 30985 };
      const semestre: ISemestre = { id: 22194 };
      documentclasse.semestre = semestre;

      const semestreCollection: ISemestre[] = [{ id: 22194 }];
      jest.spyOn(semestreService, 'query').mockReturnValue(of(new HttpResponse({ body: semestreCollection })));
      const additionalSemestres = [semestre];
      const expectedCollection: ISemestre[] = [...additionalSemestres, ...semestreCollection];
      jest.spyOn(semestreService, 'addSemestreToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ documentclasse });
      comp.ngOnInit();

      expect(semestreService.query).toHaveBeenCalled();
      expect(semestreService.addSemestreToCollectionIfMissing).toHaveBeenCalledWith(
        semestreCollection,
        ...additionalSemestres.map(expect.objectContaining),
      );
      expect(comp.semestresSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const documentclasse: IDocumentclasse = { id: 30985 };
      const classe: IClasse = { id: 4563 };
      documentclasse.classe = classe;
      const semestre: ISemestre = { id: 22194 };
      documentclasse.semestre = semestre;

      activatedRoute.data = of({ documentclasse });
      comp.ngOnInit();

      expect(comp.classesSharedCollection).toContainEqual(classe);
      expect(comp.semestresSharedCollection).toContainEqual(semestre);
      expect(comp.documentclasse).toEqual(documentclasse);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentclasse>>();
      const documentclasse = { id: 26317 };
      jest.spyOn(documentclasseFormService, 'getDocumentclasse').mockReturnValue(documentclasse);
      jest.spyOn(documentclasseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentclasse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentclasse }));
      saveSubject.complete();

      // THEN
      expect(documentclasseFormService.getDocumentclasse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentclasseService.update).toHaveBeenCalledWith(expect.objectContaining(documentclasse));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentclasse>>();
      const documentclasse = { id: 26317 };
      jest.spyOn(documentclasseFormService, 'getDocumentclasse').mockReturnValue({ id: null });
      jest.spyOn(documentclasseService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentclasse: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentclasse }));
      saveSubject.complete();

      // THEN
      expect(documentclasseFormService.getDocumentclasse).toHaveBeenCalled();
      expect(documentclasseService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentclasse>>();
      const documentclasse = { id: 26317 };
      jest.spyOn(documentclasseService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentclasse });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentclasseService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClasse', () => {
      it('should forward to classeService', () => {
        const entity = { id: 4563 };
        const entity2 = { id: 23082 };
        jest.spyOn(classeService, 'compareClasse');
        comp.compareClasse(entity, entity2);
        expect(classeService.compareClasse).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareSemestre', () => {
      it('should forward to semestreService', () => {
        const entity = { id: 22194 };
        const entity2 = { id: 31013 };
        jest.spyOn(semestreService, 'compareSemestre');
        comp.compareSemestre(entity, entity2);
        expect(semestreService.compareSemestre).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
