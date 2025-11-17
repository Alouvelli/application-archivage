import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../site-profil.test-samples';

import { SiteProfilFormService } from './site-profil-form.service';

describe('SiteProfil Form Service', () => {
  let service: SiteProfilFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteProfilFormService);
  });

  describe('Service methods', () => {
    describe('createSiteProfilFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSiteProfilFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            site: expect.any(Object),
            profil: expect.any(Object),
          }),
        );
      });

      it('passing ISiteProfil should create a new form with FormGroup', () => {
        const formGroup = service.createSiteProfilFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            encours: expect.any(Object),
            site: expect.any(Object),
            profil: expect.any(Object),
          }),
        );
      });
    });

    describe('getSiteProfil', () => {
      it('should return NewSiteProfil for default SiteProfil initial value', () => {
        const formGroup = service.createSiteProfilFormGroup(sampleWithNewData);

        const siteProfil = service.getSiteProfil(formGroup) as any;

        expect(siteProfil).toMatchObject(sampleWithNewData);
      });

      it('should return NewSiteProfil for empty SiteProfil initial value', () => {
        const formGroup = service.createSiteProfilFormGroup();

        const siteProfil = service.getSiteProfil(formGroup) as any;

        expect(siteProfil).toMatchObject({});
      });

      it('should return ISiteProfil', () => {
        const formGroup = service.createSiteProfilFormGroup(sampleWithRequiredData);

        const siteProfil = service.getSiteProfil(formGroup) as any;

        expect(siteProfil).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISiteProfil should not enable id FormControl', () => {
        const formGroup = service.createSiteProfilFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSiteProfil should disable id FormControl', () => {
        const formGroup = service.createSiteProfilFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
