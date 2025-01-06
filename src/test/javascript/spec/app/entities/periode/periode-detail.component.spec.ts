/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PeriodeDetailComponent } from 'app/entities/periode/periode-detail.component';
import { Periode } from 'app/shared/model/periode.model';

describe('Component Tests', () => {
    describe('Periode Management Detail Component', () => {
        let comp: PeriodeDetailComponent;
        let fixture: ComponentFixture<PeriodeDetailComponent>;
        const route = ({ data: of({ periode: new Periode(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PeriodeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PeriodeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PeriodeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.periode).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
