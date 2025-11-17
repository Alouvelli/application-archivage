import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { TypeDocumentService } from '../service/type-document.service';
import { ITypeDocument } from '../type-document.model';
import { TypeDocumentFormService } from './type-document-form.service';

import { TypeDocumentUpdateComponent } from './type-document-update.component';

describe('TypeDocument Management Update Component', () => {
  let comp: TypeDocumentUpdateComponent;
  let fixture: ComponentFixture<TypeDocumentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let typeDocumentFormService: TypeDocumentFormService;
  let typeDocumentService: TypeDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TypeDocumentUpdateComponent],
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
      .overrideTemplate(TypeDocumentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TypeDocumentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    typeDocumentFormService = TestBed.inject(TypeDocumentFormService);
    typeDocumentService = TestBed.inject(TypeDocumentService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const typeDocument: ITypeDocument = { id: 25408 };

      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      expect(comp.typeDocument).toEqual(typeDocument);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 6200 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocument').mockReturnValue(typeDocument);
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocument).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(typeDocumentService.update).toHaveBeenCalledWith(expect.objectContaining(typeDocument));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 6200 };
      jest.spyOn(typeDocumentFormService, 'getTypeDocument').mockReturnValue({ id: null });
      jest.spyOn(typeDocumentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: typeDocument }));
      saveSubject.complete();

      // THEN
      expect(typeDocumentFormService.getTypeDocument).toHaveBeenCalled();
      expect(typeDocumentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITypeDocument>>();
      const typeDocument = { id: 6200 };
      jest.spyOn(typeDocumentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ typeDocument });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(typeDocumentService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
