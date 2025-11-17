import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IRubriqueProfil } from '../rubrique-profil.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../rubrique-profil.test-samples';

import { RubriqueProfilService } from './rubrique-profil.service';

const requireRestSample: IRubriqueProfil = {
  ...sampleWithRequiredData,
};

describe('RubriqueProfil Service', () => {
  let service: RubriqueProfilService;
  let httpMock: HttpTestingController;
  let expectedResult: IRubriqueProfil | IRubriqueProfil[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(RubriqueProfilService);
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

    it('should create a RubriqueProfil', () => {
      const rubriqueProfil = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(rubriqueProfil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a RubriqueProfil', () => {
      const rubriqueProfil = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(rubriqueProfil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a RubriqueProfil', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of RubriqueProfil', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a RubriqueProfil', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addRubriqueProfilToCollectionIfMissing', () => {
      it('should add a RubriqueProfil to an empty array', () => {
        const rubriqueProfil: IRubriqueProfil = sampleWithRequiredData;
        expectedResult = service.addRubriqueProfilToCollectionIfMissing([], rubriqueProfil);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rubriqueProfil);
      });

      it('should not add a RubriqueProfil to an array that contains it', () => {
        const rubriqueProfil: IRubriqueProfil = sampleWithRequiredData;
        const rubriqueProfilCollection: IRubriqueProfil[] = [
          {
            ...rubriqueProfil,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addRubriqueProfilToCollectionIfMissing(rubriqueProfilCollection, rubriqueProfil);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a RubriqueProfil to an array that doesn't contain it", () => {
        const rubriqueProfil: IRubriqueProfil = sampleWithRequiredData;
        const rubriqueProfilCollection: IRubriqueProfil[] = [sampleWithPartialData];
        expectedResult = service.addRubriqueProfilToCollectionIfMissing(rubriqueProfilCollection, rubriqueProfil);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rubriqueProfil);
      });

      it('should add only unique RubriqueProfil to an array', () => {
        const rubriqueProfilArray: IRubriqueProfil[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const rubriqueProfilCollection: IRubriqueProfil[] = [sampleWithRequiredData];
        expectedResult = service.addRubriqueProfilToCollectionIfMissing(rubriqueProfilCollection, ...rubriqueProfilArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const rubriqueProfil: IRubriqueProfil = sampleWithRequiredData;
        const rubriqueProfil2: IRubriqueProfil = sampleWithPartialData;
        expectedResult = service.addRubriqueProfilToCollectionIfMissing([], rubriqueProfil, rubriqueProfil2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(rubriqueProfil);
        expect(expectedResult).toContain(rubriqueProfil2);
      });

      it('should accept null and undefined values', () => {
        const rubriqueProfil: IRubriqueProfil = sampleWithRequiredData;
        expectedResult = service.addRubriqueProfilToCollectionIfMissing([], null, rubriqueProfil, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(rubriqueProfil);
      });

      it('should return initial array if no RubriqueProfil is added', () => {
        const rubriqueProfilCollection: IRubriqueProfil[] = [sampleWithRequiredData];
        expectedResult = service.addRubriqueProfilToCollectionIfMissing(rubriqueProfilCollection, undefined, null);
        expect(expectedResult).toEqual(rubriqueProfilCollection);
      });
    });

    describe('compareRubriqueProfil', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareRubriqueProfil(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 1884 };
        const entity2 = null;

        const compareResult1 = service.compareRubriqueProfil(entity1, entity2);
        const compareResult2 = service.compareRubriqueProfil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 1884 };
        const entity2 = { id: 30780 };

        const compareResult1 = service.compareRubriqueProfil(entity1, entity2);
        const compareResult2 = service.compareRubriqueProfil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 1884 };
        const entity2 = { id: 1884 };

        const compareResult1 = service.compareRubriqueProfil(entity1, entity2);
        const compareResult2 = service.compareRubriqueProfil(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
