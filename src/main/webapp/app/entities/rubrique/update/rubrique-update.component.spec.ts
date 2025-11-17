import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { RubriqueService } from '../service/rubrique.service';
import { IRubrique } from '../rubrique.model';
import { RubriqueFormService } from './rubrique-form.service';

import { RubriqueUpdateComponent } from './rubrique-update.component';

describe('Rubrique Management Update Component', () => {
  let comp: RubriqueUpdateComponent;
  let fixture: ComponentFixture<RubriqueUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rubriqueFormService: RubriqueFormService;
  let rubriqueService: RubriqueService;
  let moduleService: ModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RubriqueUpdateComponent],
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
      .overrideTemplate(RubriqueUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RubriqueUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rubriqueFormService = TestBed.inject(RubriqueFormService);
    rubriqueService = TestBed.inject(RubriqueService);
    moduleService = TestBed.inject(ModuleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Module query and add missing value', () => {
      const rubrique: IRubrique = { id: 14496 };
      const module: IModule = { id: 9460 };
      rubrique.module = module;

      const moduleCollection: IModule[] = [{ id: 9460 }];
      jest.spyOn(moduleService, 'query').mockReturnValue(of(new HttpResponse({ body: moduleCollection })));
      const additionalModules = [module];
      const expectedCollection: IModule[] = [...additionalModules, ...moduleCollection];
      jest.spyOn(moduleService, 'addModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rubrique });
      comp.ngOnInit();

      expect(moduleService.query).toHaveBeenCalled();
      expect(moduleService.addModuleToCollectionIfMissing).toHaveBeenCalledWith(
        moduleCollection,
        ...additionalModules.map(expect.objectContaining),
      );
      expect(comp.modulesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const rubrique: IRubrique = { id: 14496 };
      const module: IModule = { id: 9460 };
      rubrique.module = module;

      activatedRoute.data = of({ rubrique });
      comp.ngOnInit();

      expect(comp.modulesSharedCollection).toContainEqual(module);
      expect(comp.rubrique).toEqual(rubrique);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubrique>>();
      const rubrique = { id: 18175 };
      jest.spyOn(rubriqueFormService, 'getRubrique').mockReturnValue(rubrique);
      jest.spyOn(rubriqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubrique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rubrique }));
      saveSubject.complete();

      // THEN
      expect(rubriqueFormService.getRubrique).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(rubriqueService.update).toHaveBeenCalledWith(expect.objectContaining(rubrique));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubrique>>();
      const rubrique = { id: 18175 };
      jest.spyOn(rubriqueFormService, 'getRubrique').mockReturnValue({ id: null });
      jest.spyOn(rubriqueService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubrique: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rubrique }));
      saveSubject.complete();

      // THEN
      expect(rubriqueFormService.getRubrique).toHaveBeenCalled();
      expect(rubriqueService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubrique>>();
      const rubrique = { id: 18175 };
      jest.spyOn(rubriqueService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubrique });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rubriqueService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareModule', () => {
      it('should forward to moduleService', () => {
        const entity = { id: 9460 };
        const entity2 = { id: 10579 };
        jest.spyOn(moduleService, 'compareModule');
        comp.compareModule(entity, entity2);
        expect(moduleService.compareModule).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
