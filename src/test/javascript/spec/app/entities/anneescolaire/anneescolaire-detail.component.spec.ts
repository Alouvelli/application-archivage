/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { AnneescolaireDetailComponent } from 'app/entities/anneescolaire/anneescolaire-detail.component';
import { Anneescolaire } from 'app/shared/model/anneescolaire.model';

describe('Component Tests', () => {
    describe('Anneescolaire Management Detail Component', () => {
        let comp: AnneescolaireDetailComponent;
        let fixture: ComponentFixture<AnneescolaireDetailComponent>;
        const route = ({ data: of({ anneescolaire: new Anneescolaire(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [AnneescolaireDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AnneescolaireDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnneescolaireDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.anneescolaire).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
