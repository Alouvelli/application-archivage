import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../documentexcel.test-samples';

import { DocumentexcelFormService } from './documentexcel-form.service';

describe('Documentexcel Form Service', () => {
  let service: DocumentexcelFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentexcelFormService);
  });

  describe('Service methods', () => {
    describe('createDocumentexcelFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDocumentexcelFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            excel: expect.any(Object),
          }),
        );
      });

      it('passing IDocumentexcel should create a new form with FormGroup', () => {
        const formGroup = service.createDocumentexcelFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            excel: expect.any(Object),
          }),
        );
      });
    });

    describe('getDocumentexcel', () => {
      it('should return NewDocumentexcel for default Documentexcel initial value', () => {
        const formGroup = service.createDocumentexcelFormGroup(sampleWithNewData);

        const documentexcel = service.getDocumentexcel(formGroup) as any;

        expect(documentexcel).toMatchObject(sampleWithNewData);
      });

      it('should return NewDocumentexcel for empty Documentexcel initial value', () => {
        const formGroup = service.createDocumentexcelFormGroup();

        const documentexcel = service.getDocumentexcel(formGroup) as any;

        expect(documentexcel).toMatchObject({});
      });

      it('should return IDocumentexcel', () => {
        const formGroup = service.createDocumentexcelFormGroup(sampleWithRequiredData);

        const documentexcel = service.getDocumentexcel(formGroup) as any;

        expect(documentexcel).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDocumentexcel should not enable id FormControl', () => {
        const formGroup = service.createDocumentexcelFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDocumentexcel should disable id FormControl', () => {
        const formGroup = service.createDocumentexcelFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
