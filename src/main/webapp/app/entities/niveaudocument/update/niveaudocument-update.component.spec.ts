import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { INiveau } from 'app/entities/niveau/niveau.model';
import { NiveauService } from 'app/entities/niveau/service/niveau.service';
import { IDocument } from 'app/entities/document/document.model';
import { DocumentService } from 'app/entities/document/service/document.service';
import { INiveaudocument } from '../niveaudocument.model';
import { NiveaudocumentService } from '../service/niveaudocument.service';
import { NiveaudocumentFormService } from './niveaudocument-form.service';

import { NiveaudocumentUpdateComponent } from './niveaudocument-update.component';

describe('Niveaudocument Management Update Component', () => {
  let comp: NiveaudocumentUpdateComponent;
  let fixture: ComponentFixture<NiveaudocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let niveaudocumentFormService: NiveaudocumentFormService;
  let niveaudocumentService: NiveaudocumentService;
  let niveauService: NiveauService;
  let documentService: DocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NiveaudocumentUpdateComponent],
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
      .overrideTemplate(NiveaudocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NiveaudocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    niveaudocumentFormService = TestBed.inject(NiveaudocumentFormService);
    niveaudocumentService = TestBed.inject(NiveaudocumentService);
    niveauService = TestBed.inject(NiveauService);
    documentService = TestBed.inject(DocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Niveau query and add missing value', () => {
      const niveaudocument: INiveaudocument = { id: 1791 };
      const niveau: INiveau = { id: 17269 };
      niveaudocument.niveau = niveau;

      const niveauCollection: INiveau[] = [{ id: 17269 }];
      jest.spyOn(niveauService, 'query').mockReturnValue(of(new HttpResponse({ body: niveauCollection })));
      const additionalNiveaus = [niveau];
      const expectedCollection: INiveau[] = [...additionalNiveaus, ...niveauCollection];
      jest.spyOn(niveauService, 'addNiveauToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ niveaudocument });
      comp.ngOnInit();

      expect(niveauService.query).toHaveBeenCalled();
      expect(niveauService.addNiveauToCollectionIfMissing).toHaveBeenCalledWith(
        niveauCollection,
        ...additionalNiveaus.map(expect.objectContaining),
      );
      expect(comp.niveausSharedCollection).toEqual(expectedCollection);
    });

    it('should call Document query and add missing value', () => {
      const niveaudocument: INiveaudocument = { id: 1791 };
      const document: IDocument = { id: 24703 };
      niveaudocument.document = document;

      const documentCollection: IDocument[] = [{ id: 24703 }];
      jest.spyOn(documentService, 'query').mockReturnValue(of(new HttpResponse({ body: documentCollection })));
      const additionalDocuments = [document];
      const expectedCollection: IDocument[] = [...additionalDocuments, ...documentCollection];
      jest.spyOn(documentService, 'addDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ niveaudocument });
      comp.ngOnInit();

      expect(documentService.query).toHaveBeenCalled();
      expect(documentService.addDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        documentCollection,
        ...additionalDocuments.map(expect.objectContaining),
      );
      expect(comp.documentsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const niveaudocument: INiveaudocument = { id: 1791 };
      const niveau: INiveau = { id: 17269 };
      niveaudocument.niveau = niveau;
      const document: IDocument = { id: 24703 };
      niveaudocument.document = document;

      activatedRoute.data = of({ niveaudocument });
      comp.ngOnInit();

      expect(comp.niveausSharedCollection).toContainEqual(niveau);
      expect(comp.documentsSharedCollection).toContainEqual(document);
      expect(comp.niveaudocument).toEqual(niveaudocument);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveaudocument>>();
      const niveaudocument = { id: 21993 };
      jest.spyOn(niveaudocumentFormService, 'getNiveaudocument').mockReturnValue(niveaudocument);
      jest.spyOn(niveaudocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveaudocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: niveaudocument }));
      saveSubject.complete();

      // THEN
      expect(niveaudocumentFormService.getNiveaudocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(niveaudocumentService.update).toHaveBeenCalledWith(expect.objectContaining(niveaudocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveaudocument>>();
      const niveaudocument = { id: 21993 };
      jest.spyOn(niveaudocumentFormService, 'getNiveaudocument').mockReturnValue({ id: null });
      jest.spyOn(niveaudocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveaudocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: niveaudocument }));
      saveSubject.complete();

      // THEN
      expect(niveaudocumentFormService.getNiveaudocument).toHaveBeenCalled();
      expect(niveaudocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveaudocument>>();
      const niveaudocument = { id: 21993 };
      jest.spyOn(niveaudocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveaudocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(niveaudocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareNiveau', () => {
      it('should forward to niveauService', () => {
        const entity = { id: 17269 };
        const entity2 = { id: 2453 };
        jest.spyOn(niveauService, 'compareNiveau');
        comp.compareNiveau(entity, entity2);
        expect(niveauService.compareNiveau).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareDocument', () => {
      it('should forward to documentService', () => {
        const entity = { id: 24703 };
        const entity2 = { id: 4007 };
        jest.spyOn(documentService, 'compareDocument');
        comp.compareDocument(entity, entity2);
        expect(documentService.compareDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
