/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueProfilDetailComponent } from 'app/entities/rubrique-profil/rubrique-profil-detail.component';
import { RubriqueProfil } from 'app/shared/model/rubrique-profil.model';

describe('Component Tests', () => {
    describe('RubriqueProfil Management Detail Component', () => {
        let comp: RubriqueProfilDetailComponent;
        let fixture: ComponentFixture<RubriqueProfilDetailComponent>;
        const route = ({ data: of({ rubriqueProfil: new RubriqueProfil(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueProfilDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RubriqueProfilDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RubriqueProfilDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.rubriqueProfil).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
