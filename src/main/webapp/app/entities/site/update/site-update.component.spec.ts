import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IEcole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/service/ecole.service';
import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { ISite } from '../site.model';
import { SiteService } from '../service/site.service';
import { SiteFormService } from './site-form.service';

import { SiteUpdateComponent } from './site-update.component';

describe('Site Management Update Component', () => {
  let comp: SiteUpdateComponent;
  let fixture: ComponentFixture<SiteUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let siteFormService: SiteFormService;
  let siteService: SiteService;
  let ecoleService: EcoleService;
  let moduleService: ModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteUpdateComponent],
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
      .overrideTemplate(SiteUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SiteUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    siteFormService = TestBed.inject(SiteFormService);
    siteService = TestBed.inject(SiteService);
    ecoleService = TestBed.inject(EcoleService);
    moduleService = TestBed.inject(ModuleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Ecole query and add missing value', () => {
      const site: ISite = { id: 7833 };
      const ecole: IEcole = { id: 29955 };
      site.ecole = ecole;

      const ecoleCollection: IEcole[] = [{ id: 29955 }];
      jest.spyOn(ecoleService, 'query').mockReturnValue(of(new HttpResponse({ body: ecoleCollection })));
      const additionalEcoles = [ecole];
      const expectedCollection: IEcole[] = [...additionalEcoles, ...ecoleCollection];
      jest.spyOn(ecoleService, 'addEcoleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ site });
      comp.ngOnInit();

      expect(ecoleService.query).toHaveBeenCalled();
      expect(ecoleService.addEcoleToCollectionIfMissing).toHaveBeenCalledWith(
        ecoleCollection,
        ...additionalEcoles.map(expect.objectContaining),
      );
      expect(comp.ecolesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Module query and add missing value', () => {
      const site: ISite = { id: 7833 };
      const modules: IModule[] = [{ id: 9460 }];
      site.modules = modules;

      const moduleCollection: IModule[] = [{ id: 9460 }];
      jest.spyOn(moduleService, 'query').mockReturnValue(of(new HttpResponse({ body: moduleCollection })));
      const additionalModules = [...modules];
      const expectedCollection: IModule[] = [...additionalModules, ...moduleCollection];
      jest.spyOn(moduleService, 'addModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ site });
      comp.ngOnInit();

      expect(moduleService.query).toHaveBeenCalled();
      expect(moduleService.addModuleToCollectionIfMissing).toHaveBeenCalledWith(
        moduleCollection,
        ...additionalModules.map(expect.objectContaining),
      );
      expect(comp.modulesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const site: ISite = { id: 7833 };
      const ecole: IEcole = { id: 29955 };
      site.ecole = ecole;
      const module: IModule = { id: 9460 };
      site.modules = [module];

      activatedRoute.data = of({ site });
      comp.ngOnInit();

      expect(comp.ecolesSharedCollection).toContainEqual(ecole);
      expect(comp.modulesSharedCollection).toContainEqual(module);
      expect(comp.site).toEqual(site);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISite>>();
      const site = { id: 5680 };
      jest.spyOn(siteFormService, 'getSite').mockReturnValue(site);
      jest.spyOn(siteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ site });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: site }));
      saveSubject.complete();

      // THEN
      expect(siteFormService.getSite).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(siteService.update).toHaveBeenCalledWith(expect.objectContaining(site));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISite>>();
      const site = { id: 5680 };
      jest.spyOn(siteFormService, 'getSite').mockReturnValue({ id: null });
      jest.spyOn(siteService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ site: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: site }));
      saveSubject.complete();

      // THEN
      expect(siteFormService.getSite).toHaveBeenCalled();
      expect(siteService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISite>>();
      const site = { id: 5680 };
      jest.spyOn(siteService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ site });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(siteService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEcole', () => {
      it('should forward to ecoleService', () => {
        const entity = { id: 29955 };
        const entity2 = { id: 32589 };
        jest.spyOn(ecoleService, 'compareEcole');
        comp.compareEcole(entity, entity2);
        expect(ecoleService.compareEcole).toHaveBeenCalledWith(entity, entity2);
      });
    });

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
