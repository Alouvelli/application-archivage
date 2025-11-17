import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IAnneescolaire } from '../anneescolaire.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../anneescolaire.test-samples';

import { AnneescolaireService } from './anneescolaire.service';

const requireRestSample: IAnneescolaire = {
  ...sampleWithRequiredData,
};

describe('Anneescolaire Service', () => {
  let service: AnneescolaireService;
  let httpMock: HttpTestingController;
  let expectedResult: IAnneescolaire | IAnneescolaire[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(AnneescolaireService);
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

    it('should create a Anneescolaire', () => {
      const anneescolaire = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(anneescolaire).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Anneescolaire', () => {
      const anneescolaire = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(anneescolaire).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Anneescolaire', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Anneescolaire', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Anneescolaire', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addAnneescolaireToCollectionIfMissing', () => {
      it('should add a Anneescolaire to an empty array', () => {
        const anneescolaire: IAnneescolaire = sampleWithRequiredData;
        expectedResult = service.addAnneescolaireToCollectionIfMissing([], anneescolaire);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anneescolaire);
      });

      it('should not add a Anneescolaire to an array that contains it', () => {
        const anneescolaire: IAnneescolaire = sampleWithRequiredData;
        const anneescolaireCollection: IAnneescolaire[] = [
          {
            ...anneescolaire,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addAnneescolaireToCollectionIfMissing(anneescolaireCollection, anneescolaire);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Anneescolaire to an array that doesn't contain it", () => {
        const anneescolaire: IAnneescolaire = sampleWithRequiredData;
        const anneescolaireCollection: IAnneescolaire[] = [sampleWithPartialData];
        expectedResult = service.addAnneescolaireToCollectionIfMissing(anneescolaireCollection, anneescolaire);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anneescolaire);
      });

      it('should add only unique Anneescolaire to an array', () => {
        const anneescolaireArray: IAnneescolaire[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const anneescolaireCollection: IAnneescolaire[] = [sampleWithRequiredData];
        expectedResult = service.addAnneescolaireToCollectionIfMissing(anneescolaireCollection, ...anneescolaireArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const anneescolaire: IAnneescolaire = sampleWithRequiredData;
        const anneescolaire2: IAnneescolaire = sampleWithPartialData;
        expectedResult = service.addAnneescolaireToCollectionIfMissing([], anneescolaire, anneescolaire2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(anneescolaire);
        expect(expectedResult).toContain(anneescolaire2);
      });

      it('should accept null and undefined values', () => {
        const anneescolaire: IAnneescolaire = sampleWithRequiredData;
        expectedResult = service.addAnneescolaireToCollectionIfMissing([], null, anneescolaire, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(anneescolaire);
      });

      it('should return initial array if no Anneescolaire is added', () => {
        const anneescolaireCollection: IAnneescolaire[] = [sampleWithRequiredData];
        expectedResult = service.addAnneescolaireToCollectionIfMissing(anneescolaireCollection, undefined, null);
        expect(expectedResult).toEqual(anneescolaireCollection);
      });
    });

    describe('compareAnneescolaire', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareAnneescolaire(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 3716 };
        const entity2 = null;

        const compareResult1 = service.compareAnneescolaire(entity1, entity2);
        const compareResult2 = service.compareAnneescolaire(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 3716 };
        const entity2 = { id: 28069 };

        const compareResult1 = service.compareAnneescolaire(entity1, entity2);
        const compareResult2 = service.compareAnneescolaire(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 3716 };
        const entity2 = { id: 3716 };

        const compareResult1 = service.compareAnneescolaire(entity1, entity2);
        const compareResult2 = service.compareAnneescolaire(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
