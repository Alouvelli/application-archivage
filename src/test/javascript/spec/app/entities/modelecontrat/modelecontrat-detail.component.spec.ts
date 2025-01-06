/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ModelecontratDetailComponent } from 'app/entities/modelecontrat/modelecontrat-detail.component';
import { Modelecontrat } from 'app/shared/model/modelecontrat.model';

describe('Component Tests', () => {
    describe('Modelecontrat Management Detail Component', () => {
        let comp: ModelecontratDetailComponent;
        let fixture: ComponentFixture<ModelecontratDetailComponent>;
        const route = ({ data: of({ modelecontrat: new Modelecontrat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ModelecontratDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ModelecontratDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ModelecontratDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.modelecontrat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
