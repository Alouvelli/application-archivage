import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IProfilModule } from '../profil-module.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../profil-module.test-samples';

import { ProfilModuleService } from './profil-module.service';

const requireRestSample: IProfilModule = {
  ...sampleWithRequiredData,
};

describe('ProfilModule Service', () => {
  let service: ProfilModuleService;
  let httpMock: HttpTestingController;
  let expectedResult: IProfilModule | IProfilModule[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ProfilModuleService);
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

    it('should create a ProfilModule', () => {
      const profilModule = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(profilModule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ProfilModule', () => {
      const profilModule = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(profilModule).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ProfilModule', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ProfilModule', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ProfilModule', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addProfilModuleToCollectionIfMissing', () => {
      it('should add a ProfilModule to an empty array', () => {
        const profilModule: IProfilModule = sampleWithRequiredData;
        expectedResult = service.addProfilModuleToCollectionIfMissing([], profilModule);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(profilModule);
      });

      it('should not add a ProfilModule to an array that contains it', () => {
        const profilModule: IProfilModule = sampleWithRequiredData;
        const profilModuleCollection: IProfilModule[] = [
          {
            ...profilModule,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addProfilModuleToCollectionIfMissing(profilModuleCollection, profilModule);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ProfilModule to an array that doesn't contain it", () => {
        const profilModule: IProfilModule = sampleWithRequiredData;
        const profilModuleCollection: IProfilModule[] = [sampleWithPartialData];
        expectedResult = service.addProfilModuleToCollectionIfMissing(profilModuleCollection, profilModule);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(profilModule);
      });

      it('should add only unique ProfilModule to an array', () => {
        const profilModuleArray: IProfilModule[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const profilModuleCollection: IProfilModule[] = [sampleWithRequiredData];
        expectedResult = service.addProfilModuleToCollectionIfMissing(profilModuleCollection, ...profilModuleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const profilModule: IProfilModule = sampleWithRequiredData;
        const profilModule2: IProfilModule = sampleWithPartialData;
        expectedResult = service.addProfilModuleToCollectionIfMissing([], profilModule, profilModule2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(profilModule);
        expect(expectedResult).toContain(profilModule2);
      });

      it('should accept null and undefined values', () => {
        const profilModule: IProfilModule = sampleWithRequiredData;
        expectedResult = service.addProfilModuleToCollectionIfMissing([], null, profilModule, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(profilModule);
      });

      it('should return initial array if no ProfilModule is added', () => {
        const profilModuleCollection: IProfilModule[] = [sampleWithRequiredData];
        expectedResult = service.addProfilModuleToCollectionIfMissing(profilModuleCollection, undefined, null);
        expect(expectedResult).toEqual(profilModuleCollection);
      });
    });

    describe('compareProfilModule', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareProfilModule(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 26655 };
        const entity2 = null;

        const compareResult1 = service.compareProfilModule(entity1, entity2);
        const compareResult2 = service.compareProfilModule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 26655 };
        const entity2 = { id: 17116 };

        const compareResult1 = service.compareProfilModule(entity1, entity2);
        const compareResult2 = service.compareProfilModule(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 26655 };
        const entity2 = { id: 26655 };

        const compareResult1 = service.compareProfilModule(entity1, entity2);
        const compareResult2 = service.compareProfilModule(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
