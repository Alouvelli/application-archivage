/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypeserieDetailComponent } from 'app/entities/typeserie/typeserie-detail.component';
import { Typeserie } from 'app/shared/model/typeserie.model';

describe('Component Tests', () => {
    describe('Typeserie Management Detail Component', () => {
        let comp: TypeserieDetailComponent;
        let fixture: ComponentFixture<TypeserieDetailComponent>;
        const route = ({ data: of({ typeserie: new Typeserie(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypeserieDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypeserieDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypeserieDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typeserie).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
