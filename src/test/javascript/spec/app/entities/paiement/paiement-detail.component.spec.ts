/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementDetailComponent } from 'app/entities/paiement/paiement-detail.component';
import { Paiement } from 'app/shared/model/paiement.model';

describe('Component Tests', () => {
    describe('Paiement Management Detail Component', () => {
        let comp: PaiementDetailComponent;
        let fixture: ComponentFixture<PaiementDetailComponent>;
        const route = ({ data: of({ paiement: new Paiement(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PaiementDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaiementDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paiement).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
