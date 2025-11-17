import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IProfilMenu } from '../profil-menu.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../profil-menu.test-samples';

import { ProfilMenuService } from './profil-menu.service';

const requireRestSample: IProfilMenu = {
  ...sampleWithRequiredData,
};

describe('ProfilMenu Service', () => {
  let service: ProfilMenuService;
  let httpMock: HttpTestingController;
  let expectedResult: IProfilMenu | IProfilMenu[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProfilMenuService);
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

    it('should create a ProfilMenu', () => {
      const profilMenu = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(profilMenu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProfilMenu', () => {
      const profilMenu = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(profilMenu).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProfilMenu', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProfilMenu', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProfilMenu', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProfilMenuToCollectionIfMissing', () => {
      it('should add a ProfilMenu to an empty array', () => {
        const profilMenu: IProfilMenu = sampleWithRequiredData;
        expectedResult = service.addProfilMenuToCollectionIfMissing([], profilMenu);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(profilMenu);
      });

      it('should not add a ProfilMenu to an array that contains it', () => {
        const profilMenu: IProfilMenu = sampleWithRequiredData;
        const profilMenuCollection: IProfilMenu[] = [
          {
            ...profilMenu,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProfilMenuToCollectionIfMissing(profilMenuCollection, profilMenu);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProfilMenu to an array that doesn't contain it", () => {
        const profilMenu: IProfilMenu = sampleWithRequiredData;
        const profilMenuCollection: IProfilMenu[] = [sampleWithPartialData];
        expectedResult = service.addProfilMenuToCollectionIfMissing(profilMenuCollection, profilMenu);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(profilMenu);
      });

      it('should add only unique ProfilMenu to an array', () => {
        const profilMenuArray: IProfilMenu[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const profilMenuCollection: IProfilMenu[] = [sampleWithRequiredData];
        expectedResult = service.addProfilMenuToCollectionIfMissing(profilMenuCollection, ...profilMenuArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const profilMenu: IProfilMenu = sampleWithRequiredData;
        const profilMenu2: IProfilMenu = sampleWithPartialData;
        expectedResult = service.addProfilMenuToCollectionIfMissing([], profilMenu, profilMenu2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(profilMenu);
        expect(expectedResult).toContain(profilMenu2);
      });

      it('should accept null and undefined values', () => {
        const profilMenu: IProfilMenu = sampleWithRequiredData;
        expectedResult = service.addProfilMenuToCollectionIfMissing([], null, profilMenu, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(profilMenu);
      });

      it('should return initial array if no ProfilMenu is added', () => {
        const profilMenuCollection: IProfilMenu[] = [sampleWithRequiredData];
        expectedResult = service.addProfilMenuToCollectionIfMissing(profilMenuCollection, undefined, null);
        expect(expectedResult).toEqual(profilMenuCollection);
      });
    });

    describe('compareProfilMenu', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProfilMenu(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 18039 };
        const entity2 = null;

        const compareResult1 = service.compareProfilMenu(entity1, entity2);
        const compareResult2 = service.compareProfilMenu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 18039 };
        const entity2 = { id: 17486 };

        const compareResult1 = service.compareProfilMenu(entity1, entity2);
        const compareResult2 = service.compareProfilMenu(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 18039 };
        const entity2 = { id: 18039 };

        const compareResult1 = service.compareProfilMenu(entity1, entity2);
        const compareResult2 = service.compareProfilMenu(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
