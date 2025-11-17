import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../ecole.test-samples';

import { EcoleFormService } from './ecole-form.service';

describe('Ecole Form Service', () => {
  let service: EcoleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcoleFormService);
  });

  describe('Service methods', () => {
    describe('createEcoleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createEcoleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeEcole: expect.any(Object),
            logoEcole: expect.any(Object),
            enteteEcole: expect.any(Object),
            basPageEcole: expect.any(Object),
            nineaEcole: expect.any(Object),
            adresseEcole: expect.any(Object),
            telephoneEcole: expect.any(Object),
            emailEcole: expect.any(Object),
            sigleEcole: expect.any(Object),
            faxEcole: expect.any(Object),
            etatEcole: expect.any(Object),
            encours: expect.any(Object),
            rang: expect.any(Object),
            application: expect.any(Object),
          }),
        );
      });

      it('passing IEcole should create a new form with FormGroup', () => {
        const formGroup = service.createEcoleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            codeEcole: expect.any(Object),
            logoEcole: expect.any(Object),
            enteteEcole: expect.any(Object),
            basPageEcole: expect.any(Object),
            nineaEcole: expect.any(Object),
            adresseEcole: expect.any(Object),
            telephoneEcole: expect.any(Object),
            emailEcole: expect.any(Object),
            sigleEcole: expect.any(Object),
            faxEcole: expect.any(Object),
            etatEcole: expect.any(Object),
            encours: expect.any(Object),
            rang: expect.any(Object),
            application: expect.any(Object),
          }),
        );
      });
    });

    describe('getEcole', () => {
      it('should return NewEcole for default Ecole initial value', () => {
        const formGroup = service.createEcoleFormGroup(sampleWithNewData);

        const ecole = service.getEcole(formGroup) as any;

        expect(ecole).toMatchObject(sampleWithNewData);
      });

      it('should return NewEcole for empty Ecole initial value', () => {
        const formGroup = service.createEcoleFormGroup();

        const ecole = service.getEcole(formGroup) as any;

        expect(ecole).toMatchObject({});
      });

      it('should return IEcole', () => {
        const formGroup = service.createEcoleFormGroup(sampleWithRequiredData);

        const ecole = service.getEcole(formGroup) as any;

        expect(ecole).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IEcole should not enable id FormControl', () => {
        const formGroup = service.createEcoleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewEcole should disable id FormControl', () => {
        const formGroup = service.createEcoleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
