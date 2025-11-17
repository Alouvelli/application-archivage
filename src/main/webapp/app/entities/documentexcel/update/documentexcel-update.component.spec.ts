import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { DocumentexcelService } from '../service/documentexcel.service';
import { IDocumentexcel } from '../documentexcel.model';
import { DocumentexcelFormService } from './documentexcel-form.service';

import { DocumentexcelUpdateComponent } from './documentexcel-update.component';

describe('Documentexcel Management Update Component', () => {
  let comp: DocumentexcelUpdateComponent;
  let fixture: ComponentFixture<DocumentexcelUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let documentexcelFormService: DocumentexcelFormService;
  let documentexcelService: DocumentexcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DocumentexcelUpdateComponent],
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
      .overrideTemplate(DocumentexcelUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DocumentexcelUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    documentexcelFormService = TestBed.inject(DocumentexcelFormService);
    documentexcelService = TestBed.inject(DocumentexcelService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const documentexcel: IDocumentexcel = { id: 2278 };

      activatedRoute.data = of({ documentexcel });
      comp.ngOnInit();

      expect(comp.documentexcel).toEqual(documentexcel);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentexcel>>();
      const documentexcel = { id: 5210 };
      jest.spyOn(documentexcelFormService, 'getDocumentexcel').mockReturnValue(documentexcel);
      jest.spyOn(documentexcelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentexcel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentexcel }));
      saveSubject.complete();

      // THEN
      expect(documentexcelFormService.getDocumentexcel).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(documentexcelService.update).toHaveBeenCalledWith(expect.objectContaining(documentexcel));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentexcel>>();
      const documentexcel = { id: 5210 };
      jest.spyOn(documentexcelFormService, 'getDocumentexcel').mockReturnValue({ id: null });
      jest.spyOn(documentexcelService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentexcel: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: documentexcel }));
      saveSubject.complete();

      // THEN
      expect(documentexcelFormService.getDocumentexcel).toHaveBeenCalled();
      expect(documentexcelService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IDocumentexcel>>();
      const documentexcel = { id: 5210 };
      jest.spyOn(documentexcelService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ documentexcel });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(documentexcelService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
