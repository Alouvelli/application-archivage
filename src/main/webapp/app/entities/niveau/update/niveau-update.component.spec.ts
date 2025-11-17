import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITypeDocument } from 'app/entities/type-document/type-document.model';
import { TypeDocumentService } from 'app/entities/type-document/service/type-document.service';
import { NiveauService } from '../service/niveau.service';
import { INiveau } from '../niveau.model';
import { NiveauFormService } from './niveau-form.service';

import { NiveauUpdateComponent } from './niveau-update.component';

describe('Niveau Management Update Component', () => {
  let comp: NiveauUpdateComponent;
  let fixture: ComponentFixture<NiveauUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let niveauFormService: NiveauFormService;
  let niveauService: NiveauService;
  let typeDocumentService: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NiveauUpdateComponent],
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
      .overrideTemplate(NiveauUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(NiveauUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    niveauFormService = TestBed.inject(NiveauFormService);
    niveauService = TestBed.inject(NiveauService);
    typeDocumentService = TestBed.inject(TypeDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call TypeDocument query and add missing value', () => {
      const niveau: INiveau = { id: 2453 };
      const typeDocuments: ITypeDocument[] = [{ id: 6200 }];
      niveau.typeDocuments = typeDocuments;

      const typeDocumentCollection: ITypeDocument[] = [{ id: 6200 }];
      jest.spyOn(typeDocumentService, 'query').mockReturnValue(of(new HttpResponse({ body: typeDocumentCollection })));
      const additionalTypeDocuments = [...typeDocuments];
      const expectedCollection: ITypeDocument[] = [...additionalTypeDocuments, ...typeDocumentCollection];
      jest.spyOn(typeDocumentService, 'addTypeDocumentToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ niveau });
      comp.ngOnInit();

      expect(typeDocumentService.query).toHaveBeenCalled();
      expect(typeDocumentService.addTypeDocumentToCollectionIfMissing).toHaveBeenCalledWith(
        typeDocumentCollection,
        ...additionalTypeDocuments.map(expect.objectContaining),
      );
      expect(comp.typeDocumentsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const niveau: INiveau = { id: 2453 };
      const typeDocument: ITypeDocument = { id: 6200 };
      niveau.typeDocuments = [typeDocument];

      activatedRoute.data = of({ niveau });
      comp.ngOnInit();

      expect(comp.typeDocumentsSharedCollection).toContainEqual(typeDocument);
      expect(comp.niveau).toEqual(niveau);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveau>>();
      const niveau = { id: 17269 };
      jest.spyOn(niveauFormService, 'getNiveau').mockReturnValue(niveau);
      jest.spyOn(niveauService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveau });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: niveau }));
      saveSubject.complete();

      // THEN
      expect(niveauFormService.getNiveau).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(niveauService.update).toHaveBeenCalledWith(expect.objectContaining(niveau));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveau>>();
      const niveau = { id: 17269 };
      jest.spyOn(niveauFormService, 'getNiveau').mockReturnValue({ id: null });
      jest.spyOn(niveauService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveau: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: niveau }));
      saveSubject.complete();

      // THEN
      expect(niveauFormService.getNiveau).toHaveBeenCalled();
      expect(niveauService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<INiveau>>();
      const niveau = { id: 17269 };
      jest.spyOn(niveauService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ niveau });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(niveauService.update).toHaveBeenCalled();
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
