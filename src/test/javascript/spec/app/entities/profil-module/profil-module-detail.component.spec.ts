/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilModuleDetailComponent } from 'app/entities/profil-module/profil-module-detail.component';
import { ProfilModule } from 'app/shared/model/profil-module.model';

describe('Component Tests', () => {
    describe('ProfilModule Management Detail Component', () => {
        let comp: ProfilModuleDetailComponent;
        let fixture: ComponentFixture<ProfilModuleDetailComponent>;
        const route = ({ data: of({ profilModule: new ProfilModule(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilModuleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProfilModuleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProfilModuleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.profilModule).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
