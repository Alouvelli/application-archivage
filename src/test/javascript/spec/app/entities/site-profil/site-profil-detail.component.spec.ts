/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SiteProfilDetailComponent } from 'app/entities/site-profil/site-profil-detail.component';
import { SiteProfil } from 'app/shared/model/site-profil.model';

describe('Component Tests', () => {
    describe('SiteProfil Management Detail Component', () => {
        let comp: SiteProfilDetailComponent;
        let fixture: ComponentFixture<SiteProfilDetailComponent>;
        const route = ({ data: of({ siteProfil: new SiteProfil(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SiteProfilDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SiteProfilDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SiteProfilDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.siteProfil).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
