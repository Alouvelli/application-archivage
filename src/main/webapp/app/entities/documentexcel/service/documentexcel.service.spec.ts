import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDocumentexcel } from '../documentexcel.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../documentexcel.test-samples';

import { DocumentexcelService } from './documentexcel.service';

const requireRestSample: IDocumentexcel = {
  ...sampleWithRequiredData,
};

describe('Documentexcel Service', () => {
  let service: DocumentexcelService;
  let httpMock: HttpTestingController;
  let expectedResult: IDocumentexcel | IDocumentexcel[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentexcelService);
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

    it('should create a Documentexcel', () => {
      const documentexcel = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(documentexcel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Documentexcel', () => {
      const documentexcel = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(documentexcel).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Documentexcel', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Documentexcel', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Documentexcel', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDocumentexcelToCollectionIfMissing', () => {
      it('should add a Documentexcel to an empty array', () => {
        const documentexcel: IDocumentexcel = sampleWithRequiredData;
        expectedResult = service.addDocumentexcelToCollectionIfMissing([], documentexcel);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentexcel);
      });

      it('should not add a Documentexcel to an array that contains it', () => {
        const documentexcel: IDocumentexcel = sampleWithRequiredData;
        const documentexcelCollection: IDocumentexcel[] = [
          {
            ...documentexcel,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDocumentexcelToCollectionIfMissing(documentexcelCollection, documentexcel);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Documentexcel to an array that doesn't contain it", () => {
        const documentexcel: IDocumentexcel = sampleWithRequiredData;
        const documentexcelCollection: IDocumentexcel[] = [sampleWithPartialData];
        expectedResult = service.addDocumentexcelToCollectionIfMissing(documentexcelCollection, documentexcel);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentexcel);
      });

      it('should add only unique Documentexcel to an array', () => {
        const documentexcelArray: IDocumentexcel[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const documentexcelCollection: IDocumentexcel[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentexcelToCollectionIfMissing(documentexcelCollection, ...documentexcelArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentexcel: IDocumentexcel = sampleWithRequiredData;
        const documentexcel2: IDocumentexcel = sampleWithPartialData;
        expectedResult = service.addDocumentexcelToCollectionIfMissing([], documentexcel, documentexcel2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentexcel);
        expect(expectedResult).toContain(documentexcel2);
      });

      it('should accept null and undefined values', () => {
        const documentexcel: IDocumentexcel = sampleWithRequiredData;
        expectedResult = service.addDocumentexcelToCollectionIfMissing([], null, documentexcel, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentexcel);
      });

      it('should return initial array if no Documentexcel is added', () => {
        const documentexcelCollection: IDocumentexcel[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentexcelToCollectionIfMissing(documentexcelCollection, undefined, null);
        expect(expectedResult).toEqual(documentexcelCollection);
      });
    });

    describe('compareDocumentexcel', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDocumentexcel(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 5210 };
        const entity2 = null;

        const compareResult1 = service.compareDocumentexcel(entity1, entity2);
        const compareResult2 = service.compareDocumentexcel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 5210 };
        const entity2 = { id: 2278 };

        const compareResult1 = service.compareDocumentexcel(entity1, entity2);
        const compareResult2 = service.compareDocumentexcel(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 5210 };
        const entity2 = { id: 5210 };

        const compareResult1 = service.compareDocumentexcel(entity1, entity2);
        const compareResult2 = service.compareDocumentexcel(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
