/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ModelecontratService } from 'app/entities/modelecontrat/modelecontrat.service';
import { IModelecontrat, Modelecontrat } from 'app/shared/model/modelecontrat.model';

describe('Service Tests', () => {
    describe('Modelecontrat Service', () => {
        let injector: TestBed;
        let service: ModelecontratService;
        let httpMock: HttpTestingController;
        let elemDefault: IModelecontrat;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ModelecontratService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Modelecontrat(0, currentDate, currentDate, 'AAAAAAA', 0, 0, 'AAAAAAA', false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        datedeb: currentDate.format(DATE_FORMAT),
                        datefin: currentDate.format(DATE_FORMAT)
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

            it('should create a Modelecontrat', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        datedeb: currentDate.format(DATE_FORMAT),
                        datefin: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        datedeb: currentDate,
                        datefin: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Modelecontrat(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Modelecontrat', async () => {
                const returnedFromService = Object.assign(
                    {
                        datedeb: currentDate.format(DATE_FORMAT),
                        datefin: currentDate.format(DATE_FORMAT),
                        duree: 'BBBBBB',
                        annescolairedeb: 1,
                        anneescolairefin: 1,
                        code: 'BBBBBB',
                        etat: true
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        datedeb: currentDate,
                        datefin: currentDate
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

            it('should return a list of Modelecontrat', async () => {
                const returnedFromService = Object.assign(
                    {
                        datedeb: currentDate.format(DATE_FORMAT),
                        datefin: currentDate.format(DATE_FORMAT),
                        duree: 'BBBBBB',
                        annescolairedeb: 1,
                        anneescolairefin: 1,
                        code: 'BBBBBB',
                        etat: true
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        datedeb: currentDate,
                        datefin: currentDate
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

            it('should delete a Modelecontrat', async () => {
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
