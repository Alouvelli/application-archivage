import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../niveaudocument.test-samples';

import { NiveaudocumentFormService } from './niveaudocument-form.service';

describe('Niveaudocument Form Service', () => {
  let service: NiveaudocumentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NiveaudocumentFormService);
  });

  describe('Service methods', () => {
    describe('createNiveaudocumentFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createNiveaudocumentFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            etat: expect.any(Object),
            niveau: expect.any(Object),
            document: expect.any(Object),
          }),
        );
      });

      it('passing INiveaudocument should create a new form with FormGroup', () => {
        const formGroup = service.createNiveaudocumentFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            etat: expect.any(Object),
            niveau: expect.any(Object),
            document: expect.any(Object),
          }),
        );
      });
    });

    describe('getNiveaudocument', () => {
      it('should return NewNiveaudocument for default Niveaudocument initial value', () => {
        const formGroup = service.createNiveaudocumentFormGroup(sampleWithNewData);

        const niveaudocument = service.getNiveaudocument(formGroup) as any;

        expect(niveaudocument).toMatchObject(sampleWithNewData);
      });

      it('should return NewNiveaudocument for empty Niveaudocument initial value', () => {
        const formGroup = service.createNiveaudocumentFormGroup();

        const niveaudocument = service.getNiveaudocument(formGroup) as any;

        expect(niveaudocument).toMatchObject({});
      });

      it('should return INiveaudocument', () => {
        const formGroup = service.createNiveaudocumentFormGroup(sampleWithRequiredData);

        const niveaudocument = service.getNiveaudocument(formGroup) as any;

        expect(niveaudocument).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing INiveaudocument should not enable id FormControl', () => {
        const formGroup = service.createNiveaudocumentFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewNiveaudocument should disable id FormControl', () => {
        const formGroup = service.createNiveaudocumentFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
