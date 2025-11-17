import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IFiliere } from 'app/entities/filiere/filiere.model';
import { FiliereService } from 'app/entities/filiere/service/filiere.service';
import { INiveau } from 'app/entities/niveau/niveau.model';
import { NiveauService } from 'app/entities/niveau/service/niveau.service';
import { IClasse } from '../classe.model';
import { ClasseService } from '../service/classe.service';
import { ClasseFormService } from './classe-form.service';

import { ClasseUpdateComponent } from './classe-update.component';

describe('Classe Management Update Component', () => {
  let comp: ClasseUpdateComponent;
  let fixture: ComponentFixture<ClasseUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let classeFormService: ClasseFormService;
  let classeService: ClasseService;
  let filiereService: FiliereService;
  let niveauService: NiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClasseUpdateComponent],
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
      .overrideTemplate(ClasseUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ClasseUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    classeFormService = TestBed.inject(ClasseFormService);
    classeService = TestBed.inject(ClasseService);
    filiereService = TestBed.inject(FiliereService);
    niveauService = TestBed.inject(NiveauService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should call Filiere query and add missing value', () => {
      const classe: IClasse = { id: 23082 };
      const filiere: IFiliere = { id: 26666 };
      classe.filiere = filiere;

      const filiereCollection: IFiliere[] = [{ id: 26666 }];
      jest.spyOn(filiereService, 'query').mockReturnValue(of(new HttpResponse({ body: filiereCollection })));
      const additionalFilieres = [filiere];
      const expectedCollection: IFiliere[] = [...additionalFilieres, ...filiereCollection];
      jest.spyOn(filiereService, 'addFiliereToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(filiereService.query).toHaveBeenCalled();
      expect(filiereService.addFiliereToCollectionIfMissing).toHaveBeenCalledWith(
        filiereCollection,
        ...additionalFilieres.map(expect.objectContaining),
      );
      expect(comp.filieresSharedCollection).toEqual(expectedCollection);
    });

    it('should call Niveau query and add missing value', () => {
      const classe: IClasse = { id: 23082 };
      const niveau: INiveau = { id: 17269 };
      classe.niveau = niveau;

      const niveauCollection: INiveau[] = [{ id: 17269 }];
      jest.spyOn(niveauService, 'query').mockReturnValue(of(new HttpResponse({ body: niveauCollection })));
      const additionalNiveaus = [niveau];
      const expectedCollection: INiveau[] = [...additionalNiveaus, ...niveauCollection];
      jest.spyOn(niveauService, 'addNiveauToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(niveauService.query).toHaveBeenCalled();
      expect(niveauService.addNiveauToCollectionIfMissing).toHaveBeenCalledWith(
        niveauCollection,
        ...additionalNiveaus.map(expect.objectContaining),
      );
      expect(comp.niveausSharedCollection).toEqual(expectedCollection);
    });

    it('should update editForm', () => {
      const classe: IClasse = { id: 23082 };
      const filiere: IFiliere = { id: 26666 };
      classe.filiere = filiere;
      const niveau: INiveau = { id: 17269 };
      classe.niveau = niveau;

      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      expect(comp.filieresSharedCollection).toContainEqual(filiere);
      expect(comp.niveausSharedCollection).toContainEqual(niveau);
      expect(comp.classe).toEqual(classe);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasse>>();
      const classe = { id: 4563 };
      jest.spyOn(classeFormService, 'getClasse').mockReturnValue(classe);
      jest.spyOn(classeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classe }));
      saveSubject.complete();

      // THEN
      expect(classeFormService.getClasse).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(classeService.update).toHaveBeenCalledWith(expect.objectContaining(classe));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasse>>();
      const classe = { id: 4563 };
      jest.spyOn(classeFormService, 'getClasse').mockReturnValue({ id: null });
      jest.spyOn(classeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: classe }));
      saveSubject.complete();

      // THEN
      expect(classeFormService.getClasse).toHaveBeenCalled();
      expect(classeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IClasse>>();
      const classe = { id: 4563 };
      jest.spyOn(classeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ classe });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(classeService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareFiliere', () => {
      it('should forward to filiereService', () => {
        const entity = { id: 26666 };
        const entity2 = { id: 32672 };
        jest.spyOn(filiereService, 'compareFiliere');
        comp.compareFiliere(entity, entity2);
        expect(filiereService.compareFiliere).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareNiveau', () => {
      it('should forward to niveauService', () => {
        const entity = { id: 17269 };
        const entity2 = { id: 2453 };
        jest.spyOn(niveauService, 'compareNiveau');
        comp.compareNiveau(entity, entity2);
        expect(niveauService.compareNiveau).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
