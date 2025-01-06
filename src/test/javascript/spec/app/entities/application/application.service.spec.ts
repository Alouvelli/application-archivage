/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ApplicationService } from 'app/entities/application/application.service';
import { IApplication, Application } from 'app/shared/model/application.model';

describe('Service Tests', () => {
    describe('Application Service', () => {
        let injector: TestBed;
        let service: ApplicationService;
        let httpMock: HttpTestingController;
        let elemDefault: IApplication;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ApplicationService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Application(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                0,
                'AAAAAAA',
                currentDate,
                currentDate,
                0
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        dateVente: currentDate.format(DATE_FORMAT),
                        dateDebut: currentDate.format(DATE_FORMAT),
                        dateFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Application', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        dateVente: currentDate.format(DATE_FORMAT),
                        dateDebut: currentDate.format(DATE_FORMAT),
                        dateFin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateVente: currentDate,
                        dateDebut: currentDate,
                        dateFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Application(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Application', async () => {
                const returnedFromService = Object.assign(
                    {
                        nomApplication: 'BBBBBB',
                        versionApplication: 'BBBBBB',
                        logoApplication: 'BBBBBB',
                        coutApplication: 'BBBBBB',
                        dateVente: currentDate.format(DATE_FORMAT),
                        maintenance: 1,
                        contratMaintenance: 'BBBBBB',
                        dateDebut: currentDate.format(DATE_FORMAT),
                        dateFin: currentDate.format(DATE_FORMAT),
                        etatApplication: 1
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        dateVente: currentDate,
                        dateDebut: currentDate,
                        dateFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Application', async () => {
                const returnedFromService = Object.assign(
                    {
                        nomApplication: 'BBBBBB',
                        versionApplication: 'BBBBBB',
                        logoApplication: 'BBBBBB',
                        coutApplication: 'BBBBBB',
                        dateVente: currentDate.format(DATE_FORMAT),
                        maintenance: 1,
                        contratMaintenance: 'BBBBBB',
                        dateDebut: currentDate.format(DATE_FORMAT),
                        dateFin: currentDate.format(DATE_FORMAT),
                        etatApplication: 1
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        dateVente: currentDate,
                        dateDebut: currentDate,
                        dateFin: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Application', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
