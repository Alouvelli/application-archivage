import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../profil-menu.test-samples';

import { ProfilMenuFormService } from './profil-menu-form.service';

describe('ProfilMenu Form Service', () => {
  let service: ProfilMenuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilMenuFormService);
  });

  describe('Service methods', () => {
    describe('createProfilMenuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createProfilMenuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            voir: expect.any(Object),
            ajouter: expect.any(Object),
            supprimer: expect.any(Object),
            modifier: expect.any(Object),
            imprimer: expect.any(Object),
            profil: expect.any(Object),
            menu: expect.any(Object),
            rubriqueProfil: expect.any(Object),
          }),
        );
      });

      it('passing IProfilMenu should create a new form with FormGroup', () => {
        const formGroup = service.createProfilMenuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            voir: expect.any(Object),
            ajouter: expect.any(Object),
            supprimer: expect.any(Object),
            modifier: expect.any(Object),
            imprimer: expect.any(Object),
            profil: expect.any(Object),
            menu: expect.any(Object),
            rubriqueProfil: expect.any(Object),
          }),
        );
      });
    });

    describe('getProfilMenu', () => {
      it('should return NewProfilMenu for default ProfilMenu initial value', () => {
        const formGroup = service.createProfilMenuFormGroup(sampleWithNewData);

        const profilMenu = service.getProfilMenu(formGroup) as any;

        expect(profilMenu).toMatchObject(sampleWithNewData);
      });

      it('should return NewProfilMenu for empty ProfilMenu initial value', () => {
        const formGroup = service.createProfilMenuFormGroup();

        const profilMenu = service.getProfilMenu(formGroup) as any;

        expect(profilMenu).toMatchObject({});
      });

      it('should return IProfilMenu', () => {
        const formGroup = service.createProfilMenuFormGroup(sampleWithRequiredData);

        const profilMenu = service.getProfilMenu(formGroup) as any;

        expect(profilMenu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IProfilMenu should not enable id FormControl', () => {
        const formGroup = service.createProfilMenuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewProfilMenu should disable id FormControl', () => {
        const formGroup = service.createProfilMenuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
