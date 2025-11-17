import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITypeDocument } from 'app/entities/type-document/type-document.model';
import { TypeDocumentService } from 'app/entities/type-document/service/type-document.service';
import { DocumentService } from '../service/document.service';
import { IDocument } from '../document.model';
import { DocumentFormService } from './document-form.service';

import { DocumentUpdateComponent } from './document-update.component';

describe('Document Management Update Component', () => {
  let comp: DocumentUpdateComponent;
  let fixture: ComponentFixture<DocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentFormService: DocumentFormService;
  let documentService: DocumentService;
  let typeDocumentService: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentUpdateComponent],
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
      .overrideTemplate(DocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentFormService = TestBed.inject(DocumentFormService);
    documentService = TestBed.inject(DocumentService);
    typeDocumentService = TestBed.inject(TypeDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TypeDocument query and add missing value', () => {
      const document: IDocument = { id: 4007 };
      const typeDocument: ITypeDocument = { id: 6200 };
      document.typeDocument = typeDocument;

      const typeDocumentCollection: ITypeDocument[] = [{ id: 6200 }];
      jest.spyOn(typeDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: typeDocumentCollection })));
      const additionalTypeDocuments = [typeDocument];
      const expectedCollection: ITypeDocument[] = [...additionalTypeDocuments, ...typeDocumentCollection];
      jest.spyOn(typeDocumentService, 'addTypeDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ document });
      comp.ngOnInit();

      expect(typeDocumentService.query).toHaveBeenCalled();
      expect(typeDocumentService.addTypeDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        typeDocumentCollection,
        ...additionalTypeDocuments.map(expect.objectContaining),
      );
      expect(comp.typeDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const document: IDocument = { id: 4007 };
      const typeDocument: ITypeDocument = { id: 6200 };
      document.typeDocument = typeDocument;

      activatedRoute.data = of({ document });
      comp.ngOnInit();

      expect(comp.typeDocumentsSharedCollection).toContainEqual(typeDocument);
      expect(comp.document).toEqual(document);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocument>>();
      const document = { id: 24703 };
      jest.spyOn(documentFormService, 'getDocument').mockReturnValue(document);
      jest.spyOn(documentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ document });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: document }));
      saveSubject.complete();

      // THEN
      expect(documentFormService.getDocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentService.update).toHaveBeenCalledWith(expect.objectContaining(document));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocument>>();
      const document = { id: 24703 };
      jest.spyOn(documentFormService, 'getDocument').mockReturnValue({ id: null });
      jest.spyOn(documentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ document: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: document }));
      saveSubject.complete();

      // THEN
      expect(documentFormService.getDocument).toHaveBeenCalled();
      expect(documentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocument>>();
      const document = { id: 24703 };
      jest.spyOn(documentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ document });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTypeDocument', () => {
      it('should forward to typeDocumentService', () => {
        const entity = { id: 6200 };
        const entity2 = { id: 25408 };
        jest.spyOn(typeDocumentService, 'compareTypeDocument');
        comp.compareTypeDocument(entity, entity2);
        expect(typeDocumentService.compareTypeDocument).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
