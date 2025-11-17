import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ApplicationService } from '../service/application.service';
import { IApplication } from '../application.model';
import { ApplicationFormService } from './application-form.service';

import { ApplicationUpdateComponent } from './application-update.component';

describe('Application Management Update Component', () => {
  let comp: ApplicationUpdateComponent;
  let fixture: ComponentFixture<ApplicationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let applicationFormService: ApplicationFormService;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApplicationUpdateComponent],
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
      .overrideTemplate(ApplicationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ApplicationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    applicationFormService = TestBed.inject(ApplicationFormService);
    applicationService = TestBed.inject(ApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const application: IApplication = { id: 27535 };

      activatedRoute.data = of({ application });
      comp.ngOnInit();

      expect(comp.application).toEqual(application);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplication>>();
      const application = { id: 8867 };
      jest.spyOn(applicationFormService, 'getApplication').mockReturnValue(application);
      jest.spyOn(applicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ application });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: application }));
      saveSubject.complete();

      // THEN
      expect(applicationFormService.getApplication).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(applicationService.update).toHaveBeenCalledWith(expect.objectContaining(application));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplication>>();
      const application = { id: 8867 };
      jest.spyOn(applicationFormService, 'getApplication').mockReturnValue({ id: null });
      jest.spyOn(applicationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ application: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: application }));
      saveSubject.complete();

      // THEN
      expect(applicationFormService.getApplication).toHaveBeenCalled();
      expect(applicationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IApplication>>();
      const application = { id: 8867 };
      jest.spyOn(applicationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ application });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(applicationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
