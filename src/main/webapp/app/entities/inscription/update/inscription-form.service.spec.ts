import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../inscription.test-samples';

import { InscriptionFormService } from './inscription-form.service';

describe('Inscription Form Service', () => {
  let service: InscriptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscriptionFormService);
  });

  describe('Service methods', () => {
    describe('createInscriptionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInscriptionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            manquant: expect.any(Object),
            etudiant: expect.any(Object),
            classe: expect.any(Object),
            anneescolaire: expect.any(Object),
            documents: expect.any(Object),
          }),
        );
      });

      it('passing IInscription should create a new form with FormGroup', () => {
        const formGroup = service.createInscriptionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            date: expect.any(Object),
            manquant: expect.any(Object),
            etudiant: expect.any(Object),
            classe: expect.any(Object),
            anneescolaire: expect.any(Object),
            documents: expect.any(Object),
          }),
        );
      });
    });

    describe('getInscription', () => {
      it('should return NewInscription for default Inscription initial value', () => {
        const formGroup = service.createInscriptionFormGroup(sampleWithNewData);

        const inscription = service.getInscription(formGroup) as any;

        expect(inscription).toMatchObject(sampleWithNewData);
      });

      it('should return NewInscription for empty Inscription initial value', () => {
        const formGroup = service.createInscriptionFormGroup();

        const inscription = service.getInscription(formGroup) as any;

        expect(inscription).toMatchObject({});
      });

      it('should return IInscription', () => {
        const formGroup = service.createInscriptionFormGroup(sampleWithRequiredData);

        const inscription = service.getInscription(formGroup) as any;

        expect(inscription).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInscription should not enable id FormControl', () => {
        const formGroup = service.createInscriptionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInscription should disable id FormControl', () => {
        const formGroup = service.createInscriptionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
