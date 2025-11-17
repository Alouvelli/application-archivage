import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IRubrique } from 'app/entities/rubrique/rubrique.model';
import { RubriqueService } from 'app/entities/rubrique/service/rubrique.service';
import { IProfilModule } from 'app/entities/profil-module/profil-module.model';
import { ProfilModuleService } from 'app/entities/profil-module/service/profil-module.service';
import { IRubriqueProfil } from '../rubrique-profil.model';
import { RubriqueProfilService } from '../service/rubrique-profil.service';
import { RubriqueProfilFormService } from './rubrique-profil-form.service';

import { RubriqueProfilUpdateComponent } from './rubrique-profil-update.component';

describe('RubriqueProfil Management Update Component', () => {
  let comp: RubriqueProfilUpdateComponent;
  let fixture: ComponentFixture<RubriqueProfilUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let rubriqueProfilFormService: RubriqueProfilFormService;
  let rubriqueProfilService: RubriqueProfilService;
  let profilService: ProfilService;
  let rubriqueService: RubriqueService;
  let profilModuleService: ProfilModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RubriqueProfilUpdateComponent],
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
      .overrideTemplate(RubriqueProfilUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(RubriqueProfilUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    rubriqueProfilFormService = TestBed.inject(RubriqueProfilFormService);
    rubriqueProfilService = TestBed.inject(RubriqueProfilService);
    profilService = TestBed.inject(ProfilService);
    rubriqueService = TestBed.inject(RubriqueService);
    profilModuleService = TestBed.inject(ProfilModuleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Profil query and add missing value', () => {
      const rubriqueProfil: IRubriqueProfil = { id: 30780 };
      const profil: IProfil = { id: 12279 };
      rubriqueProfil.profil = profil;

      const profilCollection: IProfil[] = [{ id: 12279 }];
      jest.spyOn(profilService, 'query').mockReturnValue(of(new HttpResponse({ body: profilCollection })));
      const additionalProfils = [profil];
      const expectedCollection: IProfil[] = [...additionalProfils, ...profilCollection];
      jest.spyOn(profilService, 'addProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      expect(profilService.query).toHaveBeenCalled();
      expect(profilService.addProfilToCollectionIfMissing).toHaveBeenCalledWith(
        profilCollection,
        ...additionalProfils.map(expect.objectContaining),
      );
      expect(comp.profilsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Rubrique query and add missing value', () => {
      const rubriqueProfil: IRubriqueProfil = { id: 30780 };
      const rubrique: IRubrique = { id: 18175 };
      rubriqueProfil.rubrique = rubrique;

      const rubriqueCollection: IRubrique[] = [{ id: 18175 }];
      jest.spyOn(rubriqueService, 'query').mockReturnValue(of(new HttpResponse({ body: rubriqueCollection })));
      const additionalRubriques = [rubrique];
      const expectedCollection: IRubrique[] = [...additionalRubriques, ...rubriqueCollection];
      jest.spyOn(rubriqueService, 'addRubriqueToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      expect(rubriqueService.query).toHaveBeenCalled();
      expect(rubriqueService.addRubriqueToCollectionIfMissing).toHaveBeenCalledWith(
        rubriqueCollection,
        ...additionalRubriques.map(expect.objectContaining),
      );
      expect(comp.rubriquesSharedCollection).toEqual(expectedCollection);
    });

    it('should call ProfilModule query and add missing value', () => {
      const rubriqueProfil: IRubriqueProfil = { id: 30780 };
      const profilModule: IProfilModule = { id: 26655 };
      rubriqueProfil.profilModule = profilModule;

      const profilModuleCollection: IProfilModule[] = [{ id: 26655 }];
      jest.spyOn(profilModuleService, 'query').mockReturnValue(of(new HttpResponse({ body: profilModuleCollection })));
      const additionalProfilModules = [profilModule];
      const expectedCollection: IProfilModule[] = [...additionalProfilModules, ...profilModuleCollection];
      jest.spyOn(profilModuleService, 'addProfilModuleToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      expect(profilModuleService.query).toHaveBeenCalled();
      expect(profilModuleService.addProfilModuleToCollectionIfMissing).toHaveBeenCalledWith(
        profilModuleCollection,
        ...additionalProfilModules.map(expect.objectContaining),
      );
      expect(comp.profilModulesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const rubriqueProfil: IRubriqueProfil = { id: 30780 };
      const profil: IProfil = { id: 12279 };
      rubriqueProfil.profil = profil;
      const rubrique: IRubrique = { id: 18175 };
      rubriqueProfil.rubrique = rubrique;
      const profilModule: IProfilModule = { id: 26655 };
      rubriqueProfil.profilModule = profilModule;

      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      expect(comp.profilsSharedCollection).toContainEqual(profil);
      expect(comp.rubriquesSharedCollection).toContainEqual(rubrique);
      expect(comp.profilModulesSharedCollection).toContainEqual(profilModule);
      expect(comp.rubriqueProfil).toEqual(rubriqueProfil);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubriqueProfil>>();
      const rubriqueProfil = { id: 1884 };
      jest.spyOn(rubriqueProfilFormService, 'getRubriqueProfil').mockReturnValue(rubriqueProfil);
      jest.spyOn(rubriqueProfilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rubriqueProfil }));
      saveSubject.complete();

      // THEN
      expect(rubriqueProfilFormService.getRubriqueProfil).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(rubriqueProfilService.update).toHaveBeenCalledWith(expect.objectContaining(rubriqueProfil));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubriqueProfil>>();
      const rubriqueProfil = { id: 1884 };
      jest.spyOn(rubriqueProfilFormService, 'getRubriqueProfil').mockReturnValue({ id: null });
      jest.spyOn(rubriqueProfilService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubriqueProfil: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: rubriqueProfil }));
      saveSubject.complete();

      // THEN
      expect(rubriqueProfilFormService.getRubriqueProfil).toHaveBeenCalled();
      expect(rubriqueProfilService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IRubriqueProfil>>();
      const rubriqueProfil = { id: 1884 };
      jest.spyOn(rubriqueProfilService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ rubriqueProfil });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(rubriqueProfilService.update).toHaveBeenCalled();
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

    describe('compareRubrique', () => {
      it('should forward to rubriqueService', () => {
        const entity = { id: 18175 };
        const entity2 = { id: 14496 };
        jest.spyOn(rubriqueService, 'compareRubrique');
        comp.compareRubrique(entity, entity2);
        expect(rubriqueService.compareRubrique).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProfilModule', () => {
      it('should forward to profilModuleService', () => {
        const entity = { id: 26655 };
        const entity2 = { id: 17116 };
        jest.spyOn(profilModuleService, 'compareProfilModule');
        comp.compareProfilModule(entity, entity2);
        expect(profilModuleService.compareProfilModule).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
