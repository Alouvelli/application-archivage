import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { ISiteProfil } from '../site-profil.model';
import { SiteProfilService } from '../service/site-profil.service';
import { SiteProfilFormService } from './site-profil-form.service';

import { SiteProfilUpdateComponent } from './site-profil-update.component';

describe('SiteProfil Management Update Component', () => {
  let comp: SiteProfilUpdateComponent;
  let fixture: ComponentFixture<SiteProfilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let siteProfilFormService: SiteProfilFormService;
  let siteProfilService: SiteProfilService;
  let siteService: SiteService;
  let profilService: ProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteProfilUpdateComponent],
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
      .overrideTemplate(SiteProfilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(SiteProfilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    siteProfilFormService = TestBed.inject(SiteProfilFormService);
    siteProfilService = TestBed.inject(SiteProfilService);
    siteService = TestBed.inject(SiteService);
    profilService = TestBed.inject(ProfilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Site query and add missing value', () => {
      const siteProfil: ISiteProfil = { id: 21206 };
      const site: ISite = { id: 5680 };
      siteProfil.site = site;

      const siteCollection: ISite[] = [{ id: 5680 }];
      jest.spyOn(siteService, 'query').mockReturnValue(of(new HttpResponse({ body: siteCollection })));
      const additionalSites = [site];
      const expectedCollection: ISite[] = [...additionalSites, ...siteCollection];
      jest.spyOn(siteService, 'addSiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ siteProfil });
      comp.ngOnInit();

      expect(siteService.query).toHaveBeenCalled();
      expect(siteService.addSiteToCollectionIfMissing).toHaveBeenCalledWith(
        siteCollection,
        ...additionalSites.map(expect.objectContaining),
      );
      expect(comp.sitesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Profil query and add missing value', () => {
      const siteProfil: ISiteProfil = { id: 21206 };
      const profil: IProfil = { id: 12279 };
      siteProfil.profil = profil;

      const profilCollection: IProfil[] = [{ id: 12279 }];
      jest.spyOn(profilService, 'query').mockReturnValue(of(new HttpResponse({ body: profilCollection })));
      const additionalProfils = [profil];
      const expectedCollection: IProfil[] = [...additionalProfils, ...profilCollection];
      jest.spyOn(profilService, 'addProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ siteProfil });
      comp.ngOnInit();

      expect(profilService.query).toHaveBeenCalled();
      expect(profilService.addProfilToCollectionIfMissing).toHaveBeenCalledWith(
        profilCollection,
        ...additionalProfils.map(expect.objectContaining),
      );
      expect(comp.profilsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const siteProfil: ISiteProfil = { id: 21206 };
      const site: ISite = { id: 5680 };
      siteProfil.site = site;
      const profil: IProfil = { id: 12279 };
      siteProfil.profil = profil;

      activatedRoute.data = of({ siteProfil });
      comp.ngOnInit();

      expect(comp.sitesSharedCollection).toContainEqual(site);
      expect(comp.profilsSharedCollection).toContainEqual(profil);
      expect(comp.siteProfil).toEqual(siteProfil);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteProfil>>();
      const siteProfil = { id: 25887 };
      jest.spyOn(siteProfilFormService, 'getSiteProfil').mockReturnValue(siteProfil);
      jest.spyOn(siteProfilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteProfil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: siteProfil }));
      saveSubject.complete();

      // THEN
      expect(siteProfilFormService.getSiteProfil).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(siteProfilService.update).toHaveBeenCalledWith(expect.objectContaining(siteProfil));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteProfil>>();
      const siteProfil = { id: 25887 };
      jest.spyOn(siteProfilFormService, 'getSiteProfil').mockReturnValue({ id: null });
      jest.spyOn(siteProfilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteProfil: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: siteProfil }));
      saveSubject.complete();

      // THEN
      expect(siteProfilFormService.getSiteProfil).toHaveBeenCalled();
      expect(siteProfilService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ISiteProfil>>();
      const siteProfil = { id: 25887 };
      jest.spyOn(siteProfilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ siteProfil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(siteProfilService.update).toHaveBeenCalled();
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

    describe('compareProfil', () => {
      it('should forward to profilService', () => {
        const entity = { id: 12279 };
        const entity2 = { id: 13621 };
        jest.spyOn(profilService, 'compareProfil');
        comp.compareProfil(entity, entity2);
        expect(profilService.compareProfil).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
