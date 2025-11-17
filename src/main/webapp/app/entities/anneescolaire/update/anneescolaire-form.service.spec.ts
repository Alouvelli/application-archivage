import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../anneescolaire.test-samples';

import { AnneescolaireFormService } from './anneescolaire-form.service';

describe('Anneescolaire Form Service', () => {
  let service: AnneescolaireFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnneescolaireFormService);
  });

  describe('Service methods', () => {
    describe('createAnneescolaireFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAnneescolaireFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            encours: expect.any(Object),
            etat: expect.any(Object),
          }),
        );
      });

      it('passing IAnneescolaire should create a new form with FormGroup', () => {
        const formGroup = service.createAnneescolaireFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            encours: expect.any(Object),
            etat: expect.any(Object),
          }),
        );
      });
    });

    describe('getAnneescolaire', () => {
      it('should return NewAnneescolaire for default Anneescolaire initial value', () => {
        const formGroup = service.createAnneescolaireFormGroup(sampleWithNewData);

        const anneescolaire = service.getAnneescolaire(formGroup) as any;

        expect(anneescolaire).toMatchObject(sampleWithNewData);
      });

      it('should return NewAnneescolaire for empty Anneescolaire initial value', () => {
        const formGroup = service.createAnneescolaireFormGroup();

        const anneescolaire = service.getAnneescolaire(formGroup) as any;

        expect(anneescolaire).toMatchObject({});
      });

      it('should return IAnneescolaire', () => {
        const formGroup = service.createAnneescolaireFormGroup(sampleWithRequiredData);

        const anneescolaire = service.getAnneescolaire(formGroup) as any;

        expect(anneescolaire).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAnneescolaire should not enable id FormControl', () => {
        const formGroup = service.createAnneescolaireFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAnneescolaire should disable id FormControl', () => {
        const formGroup = service.createAnneescolaireFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
