import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISiteProfil } from '../site-profil.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../site-profil.test-samples';

import { SiteProfilService } from './site-profil.service';

const requireRestSample: ISiteProfil = {
  ...sampleWithRequiredData,
};

describe('SiteProfil Service', () => {
  let service: SiteProfilService;
  let httpMock: HttpTestingController;
  let expectedResult: ISiteProfil | ISiteProfil[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SiteProfilService);
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

    it('should create a SiteProfil', () => {
      const siteProfil = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(siteProfil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SiteProfil', () => {
      const siteProfil = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(siteProfil).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SiteProfil', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SiteProfil', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SiteProfil', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSiteProfilToCollectionIfMissing', () => {
      it('should add a SiteProfil to an empty array', () => {
        const siteProfil: ISiteProfil = sampleWithRequiredData;
        expectedResult = service.addSiteProfilToCollectionIfMissing([], siteProfil);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(siteProfil);
      });

      it('should not add a SiteProfil to an array that contains it', () => {
        const siteProfil: ISiteProfil = sampleWithRequiredData;
        const siteProfilCollection: ISiteProfil[] = [
          {
            ...siteProfil,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSiteProfilToCollectionIfMissing(siteProfilCollection, siteProfil);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SiteProfil to an array that doesn't contain it", () => {
        const siteProfil: ISiteProfil = sampleWithRequiredData;
        const siteProfilCollection: ISiteProfil[] = [sampleWithPartialData];
        expectedResult = service.addSiteProfilToCollectionIfMissing(siteProfilCollection, siteProfil);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(siteProfil);
      });

      it('should add only unique SiteProfil to an array', () => {
        const siteProfilArray: ISiteProfil[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const siteProfilCollection: ISiteProfil[] = [sampleWithRequiredData];
        expectedResult = service.addSiteProfilToCollectionIfMissing(siteProfilCollection, ...siteProfilArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const siteProfil: ISiteProfil = sampleWithRequiredData;
        const siteProfil2: ISiteProfil = sampleWithPartialData;
        expectedResult = service.addSiteProfilToCollectionIfMissing([], siteProfil, siteProfil2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(siteProfil);
        expect(expectedResult).toContain(siteProfil2);
      });

      it('should accept null and undefined values', () => {
        const siteProfil: ISiteProfil = sampleWithRequiredData;
        expectedResult = service.addSiteProfilToCollectionIfMissing([], null, siteProfil, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(siteProfil);
      });

      it('should return initial array if no SiteProfil is added', () => {
        const siteProfilCollection: ISiteProfil[] = [sampleWithRequiredData];
        expectedResult = service.addSiteProfilToCollectionIfMissing(siteProfilCollection, undefined, null);
        expect(expectedResult).toEqual(siteProfilCollection);
      });
    });

    describe('compareSiteProfil', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSiteProfil(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 25887 };
        const entity2 = null;

        const compareResult1 = service.compareSiteProfil(entity1, entity2);
        const compareResult2 = service.compareSiteProfil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 25887 };
        const entity2 = { id: 21206 };

        const compareResult1 = service.compareSiteProfil(entity1, entity2);
        const compareResult2 = service.compareSiteProfil(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 25887 };
        const entity2 = { id: 25887 };

        const compareResult1 = service.compareSiteProfil(entity1, entity2);
        const compareResult2 = service.compareSiteProfil(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
