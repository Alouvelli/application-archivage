import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISemestre } from '../semestre.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../semestre.test-samples';

import { SemestreService } from './semestre.service';

const requireRestSample: ISemestre = {
  ...sampleWithRequiredData,
};

describe('Semestre Service', () => {
  let service: SemestreService;
  let httpMock: HttpTestingController;
  let expectedResult: ISemestre | ISemestre[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SemestreService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Semestre', () => {
      const semestre = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(semestre).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Semestre', () => {
      const semestre = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(semestre).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Semestre', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Semestre', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Semestre', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSemestreToCollectionIfMissing', () => {
      it('should add a Semestre to an empty array', () => {
        const semestre: ISemestre = sampleWithRequiredData;
        expectedResult = service.addSemestreToCollectionIfMissing([], semestre);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(semestre);
      });

      it('should not add a Semestre to an array that contains it', () => {
        const semestre: ISemestre = sampleWithRequiredData;
        const semestreCollection: ISemestre[] = [
          {
            ...semestre,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSemestreToCollectionIfMissing(semestreCollection, semestre);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Semestre to an array that doesn't contain it", () => {
        const semestre: ISemestre = sampleWithRequiredData;
        const semestreCollection: ISemestre[] = [sampleWithPartialData];
        expectedResult = service.addSemestreToCollectionIfMissing(semestreCollection, semestre);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(semestre);
      });

      it('should add only unique Semestre to an array', () => {
        const semestreArray: ISemestre[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const semestreCollection: ISemestre[] = [sampleWithRequiredData];
        expectedResult = service.addSemestreToCollectionIfMissing(semestreCollection, ...semestreArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const semestre: ISemestre = sampleWithRequiredData;
        const semestre2: ISemestre = sampleWithPartialData;
        expectedResult = service.addSemestreToCollectionIfMissing([], semestre, semestre2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(semestre);
        expect(expectedResult).toContain(semestre2);
      });

      it('should accept null and undefined values', () => {
        const semestre: ISemestre = sampleWithRequiredData;
        expectedResult = service.addSemestreToCollectionIfMissing([], null, semestre, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(semestre);
      });

      it('should return initial array if no Semestre is added', () => {
        const semestreCollection: ISemestre[] = [sampleWithRequiredData];
        expectedResult = service.addSemestreToCollectionIfMissing(semestreCollection, undefined, null);
        expect(expectedResult).toEqual(semestreCollection);
      });
    });

    describe('compareSemestre', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSemestre(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 22194 };
        const entity2 = null;

        const compareResult1 = service.compareSemestre(entity1, entity2);
        const compareResult2 = service.compareSemestre(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 22194 };
        const entity2 = { id: 31013 };

        const compareResult1 = service.compareSemestre(entity1, entity2);
        const compareResult2 = service.compareSemestre(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 22194 };
        const entity2 = { id: 22194 };

        const compareResult1 = service.compareSemestre(entity1, entity2);
        const compareResult2 = service.compareSemestre(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
