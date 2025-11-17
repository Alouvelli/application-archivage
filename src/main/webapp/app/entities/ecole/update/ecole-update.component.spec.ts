import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IApplication } from 'app/entities/application/application.model';
import { ApplicationService } from 'app/entities/application/service/application.service';
import { EcoleService } from '../service/ecole.service';
import { IEcole } from '../ecole.model';
import { EcoleFormService } from './ecole-form.service';

import { EcoleUpdateComponent } from './ecole-update.component';

describe('Ecole Management Update Component', () => {
  let comp: EcoleUpdateComponent;
  let fixture: ComponentFixture<EcoleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let ecoleFormService: EcoleFormService;
  let ecoleService: EcoleService;
  let applicationService: ApplicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EcoleUpdateComponent],
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
      .overrideTemplate(EcoleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EcoleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    ecoleFormService = TestBed.inject(EcoleFormService);
    ecoleService = TestBed.inject(EcoleService);
    applicationService = TestBed.inject(ApplicationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call application query and add missing value', () => {
      const ecole: IEcole = { id: 32589 };
      const application: IApplication = { id: 8867 };
      ecole.application = application;

      const applicationCollection: IApplication[] = [{ id: 8867 }];
      jest.spyOn(applicationService, 'query').mockReturnValue(of(new HttpResponse({ body: applicationCollection })));
      const expectedCollection: IApplication[] = [application, ...applicationCollection];
      jest.spyOn(applicationService, 'addApplicationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ ecole });
      comp.ngOnInit();

      expect(applicationService.query).toHaveBeenCalled();
      expect(applicationService.addApplicationToCollectionIfMissing).toHaveBeenCalledWith(applicationCollection, application);
      expect(comp.applicationsCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const ecole: IEcole = { id: 32589 };
      const application: IApplication = { id: 8867 };
      ecole.application = application;

      activatedRoute.data = of({ ecole });
      comp.ngOnInit();

      expect(comp.applicationsCollection).toContainEqual(application);
      expect(comp.ecole).toEqual(ecole);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEcole>>();
      const ecole = { id: 29955 };
      jest.spyOn(ecoleFormService, 'getEcole').mockReturnValue(ecole);
      jest.spyOn(ecoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ecole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ecole }));
      saveSubject.complete();

      // THEN
      expect(ecoleFormService.getEcole).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(ecoleService.update).toHaveBeenCalledWith(expect.objectContaining(ecole));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEcole>>();
      const ecole = { id: 29955 };
      jest.spyOn(ecoleFormService, 'getEcole').mockReturnValue({ id: null });
      jest.spyOn(ecoleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ecole: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: ecole }));
      saveSubject.complete();

      // THEN
      expect(ecoleFormService.getEcole).toHaveBeenCalled();
      expect(ecoleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEcole>>();
      const ecole = { id: 29955 };
      jest.spyOn(ecoleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ ecole });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(ecoleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareApplication', () => {
      it('should forward to applicationService', () => {
        const entity = { id: 8867 };
        const entity2 = { id: 27535 };
        jest.spyOn(applicationService, 'compareApplication');
        comp.compareApplication(entity, entity2);
        expect(applicationService.compareApplication).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
