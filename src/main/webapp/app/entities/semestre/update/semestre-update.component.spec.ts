import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { SemestreService } from '../service/semestre.service';
import { ISemestre } from '../semestre.model';
import { SemestreFormService } from './semestre-form.service';

import { SemestreUpdateComponent } from './semestre-update.component';

describe('Semestre Management Update Component', () => {
  let comp: SemestreUpdateComponent;
  let fixture: ComponentFixture<SemestreUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let semestreFormService: SemestreFormService;
  let semestreService: SemestreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SemestreUpdateComponent],
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
      .overrideTemplate(SemestreUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SemestreUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    semestreFormService = TestBed.inject(SemestreFormService);
    semestreService = TestBed.inject(SemestreService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const semestre: ISemestre = { id: 31013 };

      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      expect(comp.semestre).toEqual(semestre);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISemestre>>();
      const semestre = { id: 22194 };
      jest.spyOn(semestreFormService, 'getSemestre').mockReturnValue(semestre);
      jest.spyOn(semestreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: semestre }));
      saveSubject.complete();

      // THEN
      expect(semestreFormService.getSemestre).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(semestreService.update).toHaveBeenCalledWith(expect.objectContaining(semestre));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISemestre>>();
      const semestre = { id: 22194 };
      jest.spyOn(semestreFormService, 'getSemestre').mockReturnValue({ id: null });
      jest.spyOn(semestreService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: semestre }));
      saveSubject.complete();

      // THEN
      expect(semestreFormService.getSemestre).toHaveBeenCalled();
      expect(semestreService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISemestre>>();
      const semestre = { id: 22194 };
      jest.spyOn(semestreService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ semestre });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(semestreService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
