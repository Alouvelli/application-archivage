/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypebatitmentDetailComponent } from 'app/entities/typebatitment/typebatitment-detail.component';
import { Typebatitment } from 'app/shared/model/typebatitment.model';

describe('Component Tests', () => {
    describe('Typebatitment Management Detail Component', () => {
        let comp: TypebatitmentDetailComponent;
        let fixture: ComponentFixture<TypebatitmentDetailComponent>;
        const route = ({ data: of({ typebatitment: new Typebatitment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypebatitmentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TypebatitmentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypebatitmentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.typebatitment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
