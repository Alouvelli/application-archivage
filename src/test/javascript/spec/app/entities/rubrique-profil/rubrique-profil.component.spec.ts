/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueProfilComponent } from 'app/entities/rubrique-profil/rubrique-profil.component';
import { RubriqueProfilService } from 'app/entities/rubrique-profil/rubrique-profil.service';
import { RubriqueProfil } from 'app/shared/model/rubrique-profil.model';

describe('Component Tests', () => {
    describe('RubriqueProfil Management Component', () => {
        let comp: RubriqueProfilComponent;
        let fixture: ComponentFixture<RubriqueProfilComponent>;
        let service: RubriqueProfilService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueProfilComponent],
                providers: []
            })
                .overrideTemplate(RubriqueProfilComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RubriqueProfilComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubriqueProfilService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new RubriqueProfil(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.rubriqueProfils[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
