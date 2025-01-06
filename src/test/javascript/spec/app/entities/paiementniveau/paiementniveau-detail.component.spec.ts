/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementniveauDetailComponent } from 'app/entities/paiementniveau/paiementniveau-detail.component';
import { Paiementniveau } from 'app/shared/model/paiementniveau.model';

describe('Component Tests', () => {
    describe('Paiementniveau Management Detail Component', () => {
        let comp: PaiementniveauDetailComponent;
        let fixture: ComponentFixture<PaiementniveauDetailComponent>;
        const route = ({ data: of({ paiementniveau: new Paiementniveau(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementniveauDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PaiementniveauDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaiementniveauDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.paiementniveau).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
