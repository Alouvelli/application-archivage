/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { InscriptionDetailComponent } from 'app/entities/inscription/inscription-detail.component';
import { Inscription } from 'app/shared/model/inscription.model';

describe('Component Tests', () => {
    describe('Inscription Management Detail Component', () => {
        let comp: InscriptionDetailComponent;
        let fixture: ComponentFixture<InscriptionDetailComponent>;
        const route = ({ data: of({ inscription: new Inscription(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [InscriptionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InscriptionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InscriptionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.inscription).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
