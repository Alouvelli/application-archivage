/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { CycleDetailComponent } from 'app/entities/cycle/cycle-detail.component';
import { Cycle } from 'app/shared/model/cycle.model';

describe('Component Tests', () => {
    describe('Cycle Management Detail Component', () => {
        let comp: CycleDetailComponent;
        let fixture: ComponentFixture<CycleDetailComponent>;
        const route = ({ data: of({ cycle: new Cycle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [CycleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CycleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CycleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.cycle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
