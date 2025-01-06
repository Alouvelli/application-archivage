/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypefraisDetailComponent } from 'app/entities/typefrais/typefrais-detail.component';
import { Typefrais } from 'app/shared/model/typefrais.model';

describe('Component Tests', () => {
    describe('Typefrais Management Detail Component', () => {
        let comp: TypefraisDetailComponent;
        let fixture: ComponentFixture<TypefraisDetailComponent>;
        const route = ({ data: of({ typefrais: new Typefrais(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypefraisDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypefraisDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypefraisDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typefrais).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
