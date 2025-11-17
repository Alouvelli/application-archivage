import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { ModuleService } from '../service/module.service';
import { IModule } from '../module.model';
import { ModuleFormService } from './module-form.service';

import { ModuleUpdateComponent } from './module-update.component';

describe('Module Management Update Component', () => {
  let comp: ModuleUpdateComponent;
  let fixture: ComponentFixture<ModuleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let moduleFormService: ModuleFormService;
  let moduleService: ModuleService;
  let siteService: SiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ModuleUpdateComponent],
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
      .overrideTemplate(ModuleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ModuleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    moduleFormService = TestBed.inject(ModuleFormService);
    moduleService = TestBed.inject(ModuleService);
    siteService = TestBed.inject(SiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Site query and add missing value', () => {
      const module: IModule = { id: 10579 };
      const sites: ISite[] = [{ id: 5680 }];
      module.sites = sites;

      const siteCollection: ISite[] = [{ id: 5680 }];
      jest.spyOn(siteService, 'query').mockReturnValue(of(new HttpResponse({ body: siteCollection })));
      const additionalSites = [...sites];
      const expectedCollection: ISite[] = [...additionalSites, ...siteCollection];
      jest.spyOn(siteService, 'addSiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ module });
      comp.ngOnInit();

      expect(siteService.query).toHaveBeenCalled();
      expect(siteService.addSiteToCollectionIfMissing).toHaveBeenCalledWith(
        siteCollection,
        ...additionalSites.map(expect.objectContaining),
      );
      expect(comp.sitesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const module: IModule = { id: 10579 };
      const site: ISite = { id: 5680 };
      module.sites = [site];

      activatedRoute.data = of({ module });
      comp.ngOnInit();

      expect(comp.sitesSharedCollection).toContainEqual(site);
      expect(comp.module).toEqual(module);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModule>>();
      const module = { id: 9460 };
      jest.spyOn(moduleFormService, 'getModule').mockReturnValue(module);
      jest.spyOn(moduleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ module });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: module }));
      saveSubject.complete();

      // THEN
      expect(moduleFormService.getModule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(moduleService.update).toHaveBeenCalledWith(expect.objectContaining(module));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModule>>();
      const module = { id: 9460 };
      jest.spyOn(moduleFormService, 'getModule').mockReturnValue({ id: null });
      jest.spyOn(moduleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ module: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: module }));
      saveSubject.complete();

      // THEN
      expect(moduleFormService.getModule).toHaveBeenCalled();
      expect(moduleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IModule>>();
      const module = { id: 9460 };
      jest.spyOn(moduleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ module });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(moduleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareSite', () => {
      it('should forward to siteService', () => {
        const entity = { id: 5680 };
        const entity2 = { id: 7833 };
        jest.spyOn(siteService, 'compareSite');
        comp.compareSite(entity, entity2);
        expect(siteService.compareSite).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
