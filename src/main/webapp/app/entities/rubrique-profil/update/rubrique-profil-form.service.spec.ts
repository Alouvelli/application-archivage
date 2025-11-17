import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../rubrique-profil.test-samples';

import { RubriqueProfilFormService } from './rubrique-profil-form.service';

describe('RubriqueProfil Form Service', () => {
  let service: RubriqueProfilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RubriqueProfilFormService);
  });

  describe('Service methods', () => {
    describe('createRubriqueProfilFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createRubriqueProfilFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            profil: expect.any(Object),
            rubrique: expect.any(Object),
            profilModule: expect.any(Object),
          }),
        );
      });

      it('passing IRubriqueProfil should create a new form with FormGroup', () => {
        const formGroup = service.createRubriqueProfilFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            profil: expect.any(Object),
            rubrique: expect.any(Object),
            profilModule: expect.any(Object),
          }),
        );
      });
    });

    describe('getRubriqueProfil', () => {
      it('should return NewRubriqueProfil for default RubriqueProfil initial value', () => {
        const formGroup = service.createRubriqueProfilFormGroup(sampleWithNewData);

        const rubriqueProfil = service.getRubriqueProfil(formGroup) as any;

        expect(rubriqueProfil).toMatchObject(sampleWithNewData);
      });

      it('should return NewRubriqueProfil for empty RubriqueProfil initial value', () => {
        const formGroup = service.createRubriqueProfilFormGroup();

        const rubriqueProfil = service.getRubriqueProfil(formGroup) as any;

        expect(rubriqueProfil).toMatchObject({});
      });

      it('should return IRubriqueProfil', () => {
        const formGroup = service.createRubriqueProfilFormGroup(sampleWithRequiredData);

        const rubriqueProfil = service.getRubriqueProfil(formGroup) as any;

        expect(rubriqueProfil).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IRubriqueProfil should not enable id FormControl', () => {
        const formGroup = service.createRubriqueProfilFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewRubriqueProfil should disable id FormControl', () => {
        const formGroup = service.createRubriqueProfilFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
