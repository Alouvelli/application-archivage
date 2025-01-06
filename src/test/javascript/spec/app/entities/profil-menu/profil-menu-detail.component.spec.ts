/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilMenuDetailComponent } from 'app/entities/profil-menu/profil-menu-detail.component';
import { ProfilMenu } from 'app/shared/model/profil-menu.model';

describe('Component Tests', () => {
    describe('ProfilMenu Management Detail Component', () => {
        let comp: ProfilMenuDetailComponent;
        let fixture: ComponentFixture<ProfilMenuDetailComponent>;
        const route = ({ data: of({ profilMenu: new ProfilMenu(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilMenuDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProfilMenuDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProfilMenuDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.profilMenu).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
