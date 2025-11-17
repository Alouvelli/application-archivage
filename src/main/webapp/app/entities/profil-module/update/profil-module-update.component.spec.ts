import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IModule } from 'app/entities/module/module.model';
import { ModuleService } from 'app/entities/module/service/module.service';
import { ISiteProfil } from 'app/entities/site-profil/site-profil.model';
import { SiteProfilService } from 'app/entities/site-profil/service/site-profil.service';
import { IProfilModule } from '../profil-module.model';
import { ProfilModuleService } from '../service/profil-module.service';
import { ProfilModuleFormService } from './profil-module-form.service';

import { ProfilModuleUpdateComponent } from './profil-module-update.component';

describe('ProfilModule Management Update Component', () => {
  let comp: ProfilModuleUpdateComponent;
  let fixture: ComponentFixture<ProfilModuleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let profilModuleFormService: ProfilModuleFormService;
  let profilModuleService: ProfilModuleService;
  let profilService: ProfilService;
  let moduleService: ModuleService;
  let siteProfilService: SiteProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilModuleUpdateComponent],
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
      .overrideTemplate(ProfilModuleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfilModuleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    profilModuleFormService = TestBed.inject(ProfilModuleFormService);
    profilModuleService = TestBed.inject(ProfilModuleService);
    profilService = TestBed.inject(ProfilService);
    moduleService = TestBed.inject(ModuleService);
    siteProfilService = TestBed.inject(SiteProfilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Profil query and add missing value', () => {
      const profilModule: IProfilModule = { id: 17116 };
      const profil: IProfil = { id: 12279 };
      profilModule.profil = profil;

      const profilCollection: IProfil[] = [{ id: 12279 }];
      jest.spyOn(profilService, 'query').mockReturnValue(of(new HttpResponse({ body: profilCollection })));
      const additionalProfils = [profil];
      const expectedCollection: IProfil[] = [...additionalProfils, ...profilCollection];
      jest.spyOn(profilService, 'addProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      expect(profilService.query).toHaveBeenCalled();
      expect(profilService.addProfilToCollectionIfMissing).toHaveBeenCalledWith(
        profilCollection,
        ...additionalProfils.map(expect.objectContaining),
      );
      expect(comp.profilsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Module query and add missing value', () => {
      const profilModule: IProfilModule = { id: 17116 };
      const module: IModule = { id: 9460 };
      profilModule.module = module;

      const moduleCollection: IModule[] = [{ id: 9460 }];
      jest.spyOn(moduleService, 'query').mockReturnValue(of(new HttpResponse({ body: moduleCollection })));
      const additionalModules = [module];
      const expectedCollection: IModule[] = [...additionalModules, ...moduleCollection];
      jest.spyOn(moduleService, 'addModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      expect(moduleService.query).toHaveBeenCalled();
      expect(moduleService.addModuleToCollectionIfMissing).toHaveBeenCalledWith(
        moduleCollection,
        ...additionalModules.map(expect.objectContaining),
      );
      expect(comp.modulesSharedCollection).toEqual(expectedCollection);
    });

    it('should call SiteProfil query and add missing value', () => {
      const profilModule: IProfilModule = { id: 17116 };
      const siteProfil: ISiteProfil = { id: 25887 };
      profilModule.siteProfil = siteProfil;

      const siteProfilCollection: ISiteProfil[] = [{ id: 25887 }];
      jest.spyOn(siteProfilService, 'query').mockReturnValue(of(new HttpResponse({ body: siteProfilCollection })));
      const additionalSiteProfils = [siteProfil];
      const expectedCollection: ISiteProfil[] = [...additionalSiteProfils, ...siteProfilCollection];
      jest.spyOn(siteProfilService, 'addSiteProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      expect(siteProfilService.query).toHaveBeenCalled();
      expect(siteProfilService.addSiteProfilToCollectionIfMissing).toHaveBeenCalledWith(
        siteProfilCollection,
        ...additionalSiteProfils.map(expect.objectContaining),
      );
      expect(comp.siteProfilsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const profilModule: IProfilModule = { id: 17116 };
      const profil: IProfil = { id: 12279 };
      profilModule.profil = profil;
      const module: IModule = { id: 9460 };
      profilModule.module = module;
      const siteProfil: ISiteProfil = { id: 25887 };
      profilModule.siteProfil = siteProfil;

      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      expect(comp.profilsSharedCollection).toContainEqual(profil);
      expect(comp.modulesSharedCollection).toContainEqual(module);
      expect(comp.siteProfilsSharedCollection).toContainEqual(siteProfil);
      expect(comp.profilModule).toEqual(profilModule);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilModule>>();
      const profilModule = { id: 26655 };
      jest.spyOn(profilModuleFormService, 'getProfilModule').mockReturnValue(profilModule);
      jest.spyOn(profilModuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profilModule }));
      saveSubject.complete();

      // THEN
      expect(profilModuleFormService.getProfilModule).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(profilModuleService.update).toHaveBeenCalledWith(expect.objectContaining(profilModule));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilModule>>();
      const profilModule = { id: 26655 };
      jest.spyOn(profilModuleFormService, 'getProfilModule').mockReturnValue({ id: null });
      jest.spyOn(profilModuleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilModule: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profilModule }));
      saveSubject.complete();

      // THEN
      expect(profilModuleFormService.getProfilModule).toHaveBeenCalled();
      expect(profilModuleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilModule>>();
      const profilModule = { id: 26655 };
      jest.spyOn(profilModuleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilModule });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(profilModuleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProfil', () => {
      it('should forward to profilService', () => {
        const entity = { id: 12279 };
        const entity2 = { id: 13621 };
        jest.spyOn(profilService, 'compareProfil');
        comp.compareProfil(entity, entity2);
        expect(profilService.compareProfil).toHaveBeenCalledWith(entity, entity2);
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

    describe('compareSiteProfil', () => {
      it('should forward to siteProfilService', () => {
        const entity = { id: 25887 };
        const entity2 = { id: 21206 };
        jest.spyOn(siteProfilService, 'compareSiteProfil');
        comp.compareSiteProfil(entity, entity2);
        expect(siteProfilService.compareSiteProfil).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
