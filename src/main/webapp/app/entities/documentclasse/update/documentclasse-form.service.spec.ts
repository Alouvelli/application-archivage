import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../documentclasse.test-samples';

import { DocumentclasseFormService } from './documentclasse-form.service';

describe('Documentclasse Form Service', () => {
  let service: DocumentclasseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentclasseFormService);
  });

  describe('Service methods', () => {
    describe('createDocumentclasseFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDocumentclasseFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            document1: expect.any(Object),
            ref: expect.any(Object),
            nomdocument: expect.any(Object),
            classe: expect.any(Object),
            semestre: expect.any(Object),
          }),
        );
      });

      it('passing IDocumentclasse should create a new form with FormGroup', () => {
        const formGroup = service.createDocumentclasseFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            document1: expect.any(Object),
            ref: expect.any(Object),
            nomdocument: expect.any(Object),
            classe: expect.any(Object),
            semestre: expect.any(Object),
          }),
        );
      });
    });

    describe('getDocumentclasse', () => {
      it('should return NewDocumentclasse for default Documentclasse initial value', () => {
        const formGroup = service.createDocumentclasseFormGroup(sampleWithNewData);

        const documentclasse = service.getDocumentclasse(formGroup) as any;

        expect(documentclasse).toMatchObject(sampleWithNewData);
      });

      it('should return NewDocumentclasse for empty Documentclasse initial value', () => {
        const formGroup = service.createDocumentclasseFormGroup();

        const documentclasse = service.getDocumentclasse(formGroup) as any;

        expect(documentclasse).toMatchObject({});
      });

      it('should return IDocumentclasse', () => {
        const formGroup = service.createDocumentclasseFormGroup(sampleWithRequiredData);

        const documentclasse = service.getDocumentclasse(formGroup) as any;

        expect(documentclasse).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDocumentclasse should not enable id FormControl', () => {
        const formGroup = service.createDocumentclasseFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDocumentclasse should disable id FormControl', () => {
        const formGroup = service.createDocumentclasseFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
