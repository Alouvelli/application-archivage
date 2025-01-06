/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EvaluationcycleDetailComponent } from 'app/entities/evaluationcycle/evaluationcycle-detail.component';
import { Evaluationcycle } from 'app/shared/model/evaluationcycle.model';

describe('Component Tests', () => {
    describe('Evaluationcycle Management Detail Component', () => {
        let comp: EvaluationcycleDetailComponent;
        let fixture: ComponentFixture<EvaluationcycleDetailComponent>;
        const route = ({ data: of({ evaluationcycle: new Evaluationcycle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EvaluationcycleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EvaluationcycleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EvaluationcycleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.evaluationcycle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
