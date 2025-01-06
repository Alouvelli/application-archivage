/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SiteProfilUpdateComponent } from 'app/entities/site-profil/site-profil-update.component';
import { SiteProfilService } from 'app/entities/site-profil/site-profil.service';
import { SiteProfil } from 'app/shared/model/site-profil.model';

describe('Component Tests', () => {
    describe('SiteProfil Management Update Component', () => {
        let comp: SiteProfilUpdateComponent;
        let fixture: ComponentFixture<SiteProfilUpdateComponent>;
        let service: SiteProfilService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SiteProfilUpdateComponent]
            })
                .overrideTemplate(SiteProfilUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SiteProfilUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteProfilService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SiteProfil(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.siteProfil = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SiteProfil();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.siteProfil = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
