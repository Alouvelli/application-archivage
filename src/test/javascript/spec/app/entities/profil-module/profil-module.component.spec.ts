/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilModuleComponent } from 'app/entities/profil-module/profil-module.component';
import { ProfilModuleService } from 'app/entities/profil-module/profil-module.service';
import { ProfilModule } from 'app/shared/model/profil-module.model';

describe('Component Tests', () => {
    describe('ProfilModule Management Component', () => {
        let comp: ProfilModuleComponent;
        let fixture: ComponentFixture<ProfilModuleComponent>;
        let service: ProfilModuleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilModuleComponent],
                providers: []
            })
                .overrideTemplate(ProfilModuleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProfilModuleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilModuleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ProfilModule(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.profilModules[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
