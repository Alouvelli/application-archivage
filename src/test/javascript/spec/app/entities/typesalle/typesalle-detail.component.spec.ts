/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypesalleDetailComponent } from 'app/entities/typesalle/typesalle-detail.component';
import { Typesalle } from 'app/shared/model/typesalle.model';

describe('Component Tests', () => {
    describe('Typesalle Management Detail Component', () => {
        let comp: TypesalleDetailComponent;
        let fixture: ComponentFixture<TypesalleDetailComponent>;
        const route = ({ data: of({ typesalle: new Typesalle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypesalleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypesalleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypesalleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typesalle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
