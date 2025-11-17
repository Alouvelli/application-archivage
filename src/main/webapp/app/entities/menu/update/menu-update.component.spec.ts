import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IRubrique } from 'app/entities/rubrique/rubrique.model';
import { RubriqueService } from 'app/entities/rubrique/service/rubrique.service';
import { MenuService } from '../service/menu.service';
import { IMenu } from '../menu.model';
import { MenuFormService } from './menu-form.service';

import { MenuUpdateComponent } from './menu-update.component';

describe('Menu Management Update Component', () => {
  let comp: MenuUpdateComponent;
  let fixture: ComponentFixture<MenuUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let menuFormService: MenuFormService;
  let menuService: MenuService;
  let rubriqueService: RubriqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MenuUpdateComponent],
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
      .overrideTemplate(MenuUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(MenuUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    menuFormService = TestBed.inject(MenuFormService);
    menuService = TestBed.inject(MenuService);
    rubriqueService = TestBed.inject(RubriqueService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Rubrique query and add missing value', () => {
      const menu: IMenu = { id: 2859 };
      const rubrique: IRubrique = { id: 18175 };
      menu.rubrique = rubrique;

      const rubriqueCollection: IRubrique[] = [{ id: 18175 }];
      jest.spyOn(rubriqueService, 'query').mockReturnValue(of(new HttpResponse({ body: rubriqueCollection })));
      const additionalRubriques = [rubrique];
      const expectedCollection: IRubrique[] = [...additionalRubriques, ...rubriqueCollection];
      jest.spyOn(rubriqueService, 'addRubriqueToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ menu });
      comp.ngOnInit();

      expect(rubriqueService.query).toHaveBeenCalled();
      expect(rubriqueService.addRubriqueToCollectionIfMissing).toHaveBeenCalledWith(
        rubriqueCollection,
        ...additionalRubriques.map(expect.objectContaining),
      );
      expect(comp.rubriquesSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const menu: IMenu = { id: 2859 };
      const rubrique: IRubrique = { id: 18175 };
      menu.rubrique = rubrique;

      activatedRoute.data = of({ menu });
      comp.ngOnInit();

      expect(comp.rubriquesSharedCollection).toContainEqual(rubrique);
      expect(comp.menu).toEqual(menu);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenu>>();
      const menu = { id: 7656 };
      jest.spyOn(menuFormService, 'getMenu').mockReturnValue(menu);
      jest.spyOn(menuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menu }));
      saveSubject.complete();

      // THEN
      expect(menuFormService.getMenu).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(menuService.update).toHaveBeenCalledWith(expect.objectContaining(menu));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenu>>();
      const menu = { id: 7656 };
      jest.spyOn(menuFormService, 'getMenu').mockReturnValue({ id: null });
      jest.spyOn(menuService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menu: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: menu }));
      saveSubject.complete();

      // THEN
      expect(menuFormService.getMenu).toHaveBeenCalled();
      expect(menuService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IMenu>>();
      const menu = { id: 7656 };
      jest.spyOn(menuService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ menu });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(menuService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareRubrique', () => {
      it('should forward to rubriqueService', () => {
        const entity = { id: 18175 };
        const entity2 = { id: 14496 };
        jest.spyOn(rubriqueService, 'compareRubrique');
        comp.compareRubrique(entity, entity2);
        expect(rubriqueService.compareRubrique).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
