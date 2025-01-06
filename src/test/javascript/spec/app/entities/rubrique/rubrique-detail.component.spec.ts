/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueDetailComponent } from 'app/entities/rubrique/rubrique-detail.component';
import { Rubrique } from 'app/shared/model/rubrique.model';

describe('Component Tests', () => {
    describe('Rubrique Management Detail Component', () => {
        let comp: RubriqueDetailComponent;
        let fixture: ComponentFixture<RubriqueDetailComponent>;
        const route = ({ data: of({ rubrique: new Rubrique(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RubriqueDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RubriqueDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.rubrique).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
