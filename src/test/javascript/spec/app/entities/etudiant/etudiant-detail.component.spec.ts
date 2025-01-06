/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EtudiantDetailComponent } from 'app/entities/etudiant/etudiant-detail.component';
import { Etudiant } from 'app/shared/model/etudiant.model';

describe('Component Tests', () => {
    describe('Etudiant Management Detail Component', () => {
        let comp: EtudiantDetailComponent;
        let fixture: ComponentFixture<EtudiantDetailComponent>;
        const route = ({ data: of({ etudiant: new Etudiant(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EtudiantDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(EtudiantDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(EtudiantDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.etudiant).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
