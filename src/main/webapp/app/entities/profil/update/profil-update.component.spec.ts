import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IEcole } from 'app/entities/ecole/ecole.model';
import { EcoleService } from 'app/entities/ecole/service/ecole.service';
import { ISite } from 'app/entities/site/site.model';
import { SiteService } from 'app/entities/site/service/site.service';
import { IProfil } from '../profil.model';
import { ProfilService } from '../service/profil.service';
import { ProfilFormService } from './profil-form.service';

import { ProfilUpdateComponent } from './profil-update.component';

describe('Profil Management Update Component', () => {
  let comp: ProfilUpdateComponent;
  let fixture: ComponentFixture<ProfilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let profilFormService: ProfilFormService;
  let profilService: ProfilService;
  let ecoleService: EcoleService;
  let siteService: SiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilUpdateComponent],
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
      .overrideTemplate(ProfilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    profilFormService = TestBed.inject(ProfilFormService);
    profilService = TestBed.inject(ProfilService);
    ecoleService = TestBed.inject(EcoleService);
    siteService = TestBed.inject(SiteService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Ecole query and add missing value', () => {
      const profil: IProfil = { id: 13621 };
      const ecole: IEcole = { id: 29955 };
      profil.ecole = ecole;

      const ecoleCollection: IEcole[] = [{ id: 29955 }];
      jest.spyOn(ecoleService, 'query').mockReturnValue(of(new HttpResponse({ body: ecoleCollection })));
      const additionalEcoles = [ecole];
      const expectedCollection: IEcole[] = [...additionalEcoles, ...ecoleCollection];
      jest.spyOn(ecoleService, 'addEcoleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profil });
      comp.ngOnInit();

      expect(ecoleService.query).toHaveBeenCalled();
      expect(ecoleService.addEcoleToCollectionIfMissing).toHaveBeenCalledWith(
        ecoleCollection,
        ...additionalEcoles.map(expect.objectContaining),
      );
      expect(comp.ecolesSharedCollection).toEqual(expectedCollection);
    });

    it('should call Site query and add missing value', () => {
      const profil: IProfil = { id: 13621 };
      const site: ISite = { id: 5680 };
      profil.site = site;

      const siteCollection: ISite[] = [{ id: 5680 }];
      jest.spyOn(siteService, 'query').mockReturnValue(of(new HttpResponse({ body: siteCollection })));
      const additionalSites = [site];
      const expectedCollection: ISite[] = [...additionalSites, ...siteCollection];
      jest.spyOn(siteService, 'addSiteToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profil });
      comp.ngOnInit();

      expect(siteService.query).toHaveBeenCalled();
      expect(siteService.addSiteToCollectionIfMissing).toHaveBeenCalledWith(
        siteCollection,
        ...additionalSites.map(expect.objectContaining),
      );
      expect(comp.sitesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const profil: IProfil = { id: 13621 };
      const ecole: IEcole = { id: 29955 };
      profil.ecole = ecole;
      const site: ISite = { id: 5680 };
      profil.site = site;

      activatedRoute.data = of({ profil });
      comp.ngOnInit();

      expect(comp.ecolesSharedCollection).toContainEqual(ecole);
      expect(comp.sitesSharedCollection).toContainEqual(site);
      expect(comp.profil).toEqual(profil);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfil>>();
      const profil = { id: 12279 };
      jest.spyOn(profilFormService, 'getProfil').mockReturnValue(profil);
      jest.spyOn(profilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profil }));
      saveSubject.complete();

      // THEN
      expect(profilFormService.getProfil).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(profilService.update).toHaveBeenCalledWith(expect.objectContaining(profil));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfil>>();
      const profil = { id: 12279 };
      jest.spyOn(profilFormService, 'getProfil').mockReturnValue({ id: null });
      jest.spyOn(profilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profil: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profil }));
      saveSubject.complete();

      // THEN
      expect(profilFormService.getProfil).toHaveBeenCalled();
      expect(profilService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfil>>();
      const profil = { id: 12279 };
      jest.spyOn(profilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(profilService.update).toHaveBeenCalled();
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
