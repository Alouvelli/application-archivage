/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { NiveaudocumentDetailComponent } from 'app/entities/niveaudocument/niveaudocument-detail.component';
import { Niveaudocument } from 'app/shared/model/niveaudocument.model';

describe('Component Tests', () => {
    describe('Niveaudocument Management Detail Component', () => {
        let comp: NiveaudocumentDetailComponent;
        let fixture: ComponentFixture<NiveaudocumentDetailComponent>;
        const route = ({ data: of({ niveaudocument: new Niveaudocument(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [NiveaudocumentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(NiveaudocumentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiveaudocumentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.niveaudocument).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
