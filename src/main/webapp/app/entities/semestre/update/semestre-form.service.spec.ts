import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../semestre.test-samples';

import { SemestreFormService } from './semestre-form.service';

describe('Semestre Form Service', () => {
  let service: SemestreFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemestreFormService);
  });

  describe('Service methods', () => {
    describe('createSemestreFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSemestreFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            etat: expect.any(Object),
          }),
        );
      });

      it('passing ISemestre should create a new form with FormGroup', () => {
        const formGroup = service.createSemestreFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            libelle: expect.any(Object),
            etat: expect.any(Object),
          }),
        );
      });
    });

    describe('getSemestre', () => {
      it('should return NewSemestre for default Semestre initial value', () => {
        const formGroup = service.createSemestreFormGroup(sampleWithNewData);

        const semestre = service.getSemestre(formGroup) as any;

        expect(semestre).toMatchObject(sampleWithNewData);
      });

      it('should return NewSemestre for empty Semestre initial value', () => {
        const formGroup = service.createSemestreFormGroup();

        const semestre = service.getSemestre(formGroup) as any;

        expect(semestre).toMatchObject({});
      });

      it('should return ISemestre', () => {
        const formGroup = service.createSemestreFormGroup(sampleWithRequiredData);

        const semestre = service.getSemestre(formGroup) as any;

        expect(semestre).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISemestre should not enable id FormControl', () => {
        const formGroup = service.createSemestreFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSemestre should disable id FormControl', () => {
        const formGroup = service.createSemestreFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
