import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { IMenu } from 'app/entities/menu/menu.model';
import { MenuService } from 'app/entities/menu/service/menu.service';
import { IRubriqueProfil } from 'app/entities/rubrique-profil/rubrique-profil.model';
import { RubriqueProfilService } from 'app/entities/rubrique-profil/service/rubrique-profil.service';
import { IProfilMenu } from '../profil-menu.model';
import { ProfilMenuService } from '../service/profil-menu.service';
import { ProfilMenuFormService } from './profil-menu-form.service';

import { ProfilMenuUpdateComponent } from './profil-menu-update.component';

describe('ProfilMenu Management Update Component', () => {
  let comp: ProfilMenuUpdateComponent;
  let fixture: ComponentFixture<ProfilMenuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let profilMenuFormService: ProfilMenuFormService;
  let profilMenuService: ProfilMenuService;
  let profilService: ProfilService;
  let menuService: MenuService;
  let rubriqueProfilService: RubriqueProfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProfilMenuUpdateComponent],
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
      .overrideTemplate(ProfilMenuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProfilMenuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    profilMenuFormService = TestBed.inject(ProfilMenuFormService);
    profilMenuService = TestBed.inject(ProfilMenuService);
    profilService = TestBed.inject(ProfilService);
    menuService = TestBed.inject(MenuService);
    rubriqueProfilService = TestBed.inject(RubriqueProfilService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Profil query and add missing value', () => {
      const profilMenu: IProfilMenu = { id: 17486 };
      const profil: IProfil = { id: 12279 };
      profilMenu.profil = profil;

      const profilCollection: IProfil[] = [{ id: 12279 }];
      jest.spyOn(profilService, 'query').mockReturnValue(of(new HttpResponse({ body: profilCollection })));
      const additionalProfils = [profil];
      const expectedCollection: IProfil[] = [...additionalProfils, ...profilCollection];
      jest.spyOn(profilService, 'addProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      expect(profilService.query).toHaveBeenCalled();
      expect(profilService.addProfilToCollectionIfMissing).toHaveBeenCalledWith(
        profilCollection,
        ...additionalProfils.map(expect.objectContaining),
      );
      expect(comp.profilsSharedCollection).toEqual(expectedCollection);
    });

    it('should call Menu query and add missing value', () => {
      const profilMenu: IProfilMenu = { id: 17486 };
      const menu: IMenu = { id: 7656 };
      profilMenu.menu = menu;

      const menuCollection: IMenu[] = [{ id: 7656 }];
      jest.spyOn(menuService, 'query').mockReturnValue(of(new HttpResponse({ body: menuCollection })));
      const additionalMenus = [menu];
      const expectedCollection: IMenu[] = [...additionalMenus, ...menuCollection];
      jest.spyOn(menuService, 'addMenuToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      expect(menuService.query).toHaveBeenCalled();
      expect(menuService.addMenuToCollectionIfMissing).toHaveBeenCalledWith(
        menuCollection,
        ...additionalMenus.map(expect.objectContaining),
      );
      expect(comp.menusSharedCollection).toEqual(expectedCollection);
    });

    it('should call RubriqueProfil query and add missing value', () => {
      const profilMenu: IProfilMenu = { id: 17486 };
      const rubriqueProfil: IRubriqueProfil = { id: 1884 };
      profilMenu.rubriqueProfil = rubriqueProfil;

      const rubriqueProfilCollection: IRubriqueProfil[] = [{ id: 1884 }];
      jest.spyOn(rubriqueProfilService, 'query').mockReturnValue(of(new HttpResponse({ body: rubriqueProfilCollection })));
      const additionalRubriqueProfils = [rubriqueProfil];
      const expectedCollection: IRubriqueProfil[] = [...additionalRubriqueProfils, ...rubriqueProfilCollection];
      jest.spyOn(rubriqueProfilService, 'addRubriqueProfilToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      expect(rubriqueProfilService.query).toHaveBeenCalled();
      expect(rubriqueProfilService.addRubriqueProfilToCollectionIfMissing).toHaveBeenCalledWith(
        rubriqueProfilCollection,
        ...additionalRubriqueProfils.map(expect.objectContaining),
      );
      expect(comp.rubriqueProfilsSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const profilMenu: IProfilMenu = { id: 17486 };
      const profil: IProfil = { id: 12279 };
      profilMenu.profil = profil;
      const menu: IMenu = { id: 7656 };
      profilMenu.menu = menu;
      const rubriqueProfil: IRubriqueProfil = { id: 1884 };
      profilMenu.rubriqueProfil = rubriqueProfil;

      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      expect(comp.profilsSharedCollection).toContainEqual(profil);
      expect(comp.menusSharedCollection).toContainEqual(menu);
      expect(comp.rubriqueProfilsSharedCollection).toContainEqual(rubriqueProfil);
      expect(comp.profilMenu).toEqual(profilMenu);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilMenu>>();
      const profilMenu = { id: 18039 };
      jest.spyOn(profilMenuFormService, 'getProfilMenu').mockReturnValue(profilMenu);
      jest.spyOn(profilMenuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profilMenu }));
      saveSubject.complete();

      // THEN
      expect(profilMenuFormService.getProfilMenu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(profilMenuService.update).toHaveBeenCalledWith(expect.objectContaining(profilMenu));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilMenu>>();
      const profilMenu = { id: 18039 };
      jest.spyOn(profilMenuFormService, 'getProfilMenu').mockReturnValue({ id: null });
      jest.spyOn(profilMenuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilMenu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: profilMenu }));
      saveSubject.complete();

      // THEN
      expect(profilMenuFormService.getProfilMenu).toHaveBeenCalled();
      expect(profilMenuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProfilMenu>>();
      const profilMenu = { id: 18039 };
      jest.spyOn(profilMenuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ profilMenu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(profilMenuService.update).toHaveBeenCalled();
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

    describe('compareMenu', () => {
      it('should forward to menuService', () => {
        const entity = { id: 7656 };
        const entity2 = { id: 2859 };
        jest.spyOn(menuService, 'compareMenu');
        comp.compareMenu(entity, entity2);
        expect(menuService.compareMenu).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareRubriqueProfil', () => {
      it('should forward to rubriqueProfilService', () => {
        const entity = { id: 1884 };
        const entity2 = { id: 30780 };
        jest.spyOn(rubriqueProfilService, 'compareRubriqueProfil');
        comp.compareRubriqueProfil(entity, entity2);
        expect(rubriqueProfilService.compareRubriqueProfil).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
