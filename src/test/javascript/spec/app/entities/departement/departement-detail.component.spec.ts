/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DepartementDetailComponent } from 'app/entities/departement/departement-detail.component';
import { Departement } from 'app/shared/model/departement.model';

describe('Component Tests', () => {
    describe('Departement Management Detail Component', () => {
        let comp: DepartementDetailComponent;
        let fixture: ComponentFixture<DepartementDetailComponent>;
        const route = ({ data: of({ departement: new Departement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DepartementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DepartementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.departement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
