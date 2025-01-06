/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementtypefraisDetailComponent } from 'app/entities/paiementtypefrais/paiementtypefrais-detail.component';
import { Paiementtypefrais } from 'app/shared/model/paiementtypefrais.model';

describe('Component Tests', () => {
    describe('Paiementtypefrais Management Detail Component', () => {
        let comp: PaiementtypefraisDetailComponent;
        let fixture: ComponentFixture<PaiementtypefraisDetailComponent>;
        const route = ({ data: of({ paiementtypefrais: new Paiementtypefrais(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementtypefraisDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PaiementtypefraisDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaiementtypefraisDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paiementtypefrais).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
