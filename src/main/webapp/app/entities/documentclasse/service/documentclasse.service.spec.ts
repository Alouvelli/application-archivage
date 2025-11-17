import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IDocumentclasse } from '../documentclasse.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../documentclasse.test-samples';

import { DocumentclasseService } from './documentclasse.service';

const requireRestSample: IDocumentclasse = {
  ...sampleWithRequiredData,
};

describe('Documentclasse Service', () => {
  let service: DocumentclasseService;
  let httpMock: HttpTestingController;
  let expectedResult: IDocumentclasse | IDocumentclasse[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentclasseService);
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

    it('should create a Documentclasse', () => {
      const documentclasse = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(documentclasse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Documentclasse', () => {
      const documentclasse = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(documentclasse).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Documentclasse', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Documentclasse', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Documentclasse', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addDocumentclasseToCollectionIfMissing', () => {
      it('should add a Documentclasse to an empty array', () => {
        const documentclasse: IDocumentclasse = sampleWithRequiredData;
        expectedResult = service.addDocumentclasseToCollectionIfMissing([], documentclasse);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentclasse);
      });

      it('should not add a Documentclasse to an array that contains it', () => {
        const documentclasse: IDocumentclasse = sampleWithRequiredData;
        const documentclasseCollection: IDocumentclasse[] = [
          {
            ...documentclasse,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addDocumentclasseToCollectionIfMissing(documentclasseCollection, documentclasse);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Documentclasse to an array that doesn't contain it", () => {
        const documentclasse: IDocumentclasse = sampleWithRequiredData;
        const documentclasseCollection: IDocumentclasse[] = [sampleWithPartialData];
        expectedResult = service.addDocumentclasseToCollectionIfMissing(documentclasseCollection, documentclasse);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentclasse);
      });

      it('should add only unique Documentclasse to an array', () => {
        const documentclasseArray: IDocumentclasse[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const documentclasseCollection: IDocumentclasse[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentclasseToCollectionIfMissing(documentclasseCollection, ...documentclasseArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentclasse: IDocumentclasse = sampleWithRequiredData;
        const documentclasse2: IDocumentclasse = sampleWithPartialData;
        expectedResult = service.addDocumentclasseToCollectionIfMissing([], documentclasse, documentclasse2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentclasse);
        expect(expectedResult).toContain(documentclasse2);
      });

      it('should accept null and undefined values', () => {
        const documentclasse: IDocumentclasse = sampleWithRequiredData;
        expectedResult = service.addDocumentclasseToCollectionIfMissing([], null, documentclasse, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentclasse);
      });

      it('should return initial array if no Documentclasse is added', () => {
        const documentclasseCollection: IDocumentclasse[] = [sampleWithRequiredData];
        expectedResult = service.addDocumentclasseToCollectionIfMissing(documentclasseCollection, undefined, null);
        expect(expectedResult).toEqual(documentclasseCollection);
      });
    });

    describe('compareDocumentclasse', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareDocumentclasse(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 26317 };
        const entity2 = null;

        const compareResult1 = service.compareDocumentclasse(entity1, entity2);
        const compareResult2 = service.compareDocumentclasse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 26317 };
        const entity2 = { id: 30985 };

        const compareResult1 = service.compareDocumentclasse(entity1, entity2);
        const compareResult2 = service.compareDocumentclasse(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 26317 };
        const entity2 = { id: 26317 };

        const compareResult1 = service.compareDocumentclasse(entity1, entity2);
        const compareResult2 = service.compareDocumentclasse(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
