import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { AnneescolaireService } from '../service/anneescolaire.service';
import { IAnneescolaire } from '../anneescolaire.model';
import { AnneescolaireFormService } from './anneescolaire-form.service';

import { AnneescolaireUpdateComponent } from './anneescolaire-update.component';

describe('Anneescolaire Management Update Component', () => {
  let comp: AnneescolaireUpdateComponent;
  let fixture: ComponentFixture<AnneescolaireUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let anneescolaireFormService: AnneescolaireFormService;
  let anneescolaireService: AnneescolaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnneescolaireUpdateComponent],
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
      .overrideTemplate(AnneescolaireUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AnneescolaireUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    anneescolaireFormService = TestBed.inject(AnneescolaireFormService);
    anneescolaireService = TestBed.inject(AnneescolaireService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const anneescolaire: IAnneescolaire = { id: 28069 };

      activatedRoute.data = of({ anneescolaire });
      comp.ngOnInit();

      expect(comp.anneescolaire).toEqual(anneescolaire);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnneescolaire>>();
      const anneescolaire = { id: 3716 };
      jest.spyOn(anneescolaireFormService, 'getAnneescolaire').mockReturnValue(anneescolaire);
      jest.spyOn(anneescolaireService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anneescolaire });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: anneescolaire }));
      saveSubject.complete();

      // THEN
      expect(anneescolaireFormService.getAnneescolaire).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(anneescolaireService.update).toHaveBeenCalledWith(expect.objectContaining(anneescolaire));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnneescolaire>>();
      const anneescolaire = { id: 3716 };
      jest.spyOn(anneescolaireFormService, 'getAnneescolaire').mockReturnValue({ id: null });
      jest.spyOn(anneescolaireService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anneescolaire: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: anneescolaire }));
      saveSubject.complete();

      // THEN
      expect(anneescolaireFormService.getAnneescolaire).toHaveBeenCalled();
      expect(anneescolaireService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAnneescolaire>>();
      const anneescolaire = { id: 3716 };
      jest.spyOn(anneescolaireService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ anneescolaire });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(anneescolaireService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
