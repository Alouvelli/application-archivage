/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DisciplineDetailComponent } from 'app/entities/discipline/discipline-detail.component';
import { Discipline } from 'app/shared/model/discipline.model';

describe('Component Tests', () => {
    describe('Discipline Management Detail Component', () => {
        let comp: DisciplineDetailComponent;
        let fixture: ComponentFixture<DisciplineDetailComponent>;
        const route = ({ data: of({ discipline: new Discipline(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DisciplineDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DisciplineDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DisciplineDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.discipline).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
