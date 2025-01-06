/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypedocumentDetailComponent } from 'app/entities/typedocument/typedocument-detail.component';
import { Typedocument } from 'app/shared/model/typedocument.model';

describe('Component Tests', () => {
    describe('Typedocument Management Detail Component', () => {
        let comp: TypedocumentDetailComponent;
        let fixture: ComponentFixture<TypedocumentDetailComponent>;
        const route = ({ data: of({ typedocument: new Typedocument(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypedocumentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypedocumentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypedocumentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typedocument).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
