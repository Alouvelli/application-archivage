/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SerieDetailComponent } from 'app/entities/serie/serie-detail.component';
import { Serie } from 'app/shared/model/serie.model';

describe('Component Tests', () => {
    describe('Serie Management Detail Component', () => {
        let comp: SerieDetailComponent;
        let fixture: ComponentFixture<SerieDetailComponent>;
        const route = ({ data: of({ serie: new Serie(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SerieDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SerieDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SerieDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.serie).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
