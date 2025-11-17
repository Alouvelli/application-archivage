import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../profil-module.test-samples';

import { ProfilModuleFormService } from './profil-module-form.service';

describe('ProfilModule Form Service', () => {
  let service: ProfilModuleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilModuleFormService);
  });

  describe('Service methods', () => {
    describe('createProfilModuleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProfilModuleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            profil: expect.any(Object),
            module: expect.any(Object),
            siteProfil: expect.any(Object),
          }),
        );
      });

      it('passing IProfilModule should create a new form with FormGroup', () => {
        const formGroup = service.createProfilModuleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            profil: expect.any(Object),
            module: expect.any(Object),
            siteProfil: expect.any(Object),
          }),
        );
      });
    });

    describe('getProfilModule', () => {
      it('should return NewProfilModule for default ProfilModule initial value', () => {
        const formGroup = service.createProfilModuleFormGroup(sampleWithNewData);

        const profilModule = service.getProfilModule(formGroup) as any;

        expect(profilModule).toMatchObject(sampleWithNewData);
      });

      it('should return NewProfilModule for empty ProfilModule initial value', () => {
        const formGroup = service.createProfilModuleFormGroup();

        const profilModule = service.getProfilModule(formGroup) as any;

        expect(profilModule).toMatchObject({});
      });

      it('should return IProfilModule', () => {
        const formGroup = service.createProfilModuleFormGroup(sampleWithRequiredData);

        const profilModule = service.getProfilModule(formGroup) as any;

        expect(profilModule).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProfilModule should not enable id FormControl', () => {
        const formGroup = service.createProfilModuleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProfilModule should disable id FormControl', () => {
        const formGroup = service.createProfilModuleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
