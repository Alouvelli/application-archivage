/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueProfilUpdateComponent } from 'app/entities/rubrique-profil/rubrique-profil-update.component';
import { RubriqueProfilService } from 'app/entities/rubrique-profil/rubrique-profil.service';
import { RubriqueProfil } from 'app/shared/model/rubrique-profil.model';

describe('Component Tests', () => {
    describe('RubriqueProfil Management Update Component', () => {
        let comp: RubriqueProfilUpdateComponent;
        let fixture: ComponentFixture<RubriqueProfilUpdateComponent>;
        let service: RubriqueProfilService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueProfilUpdateComponent]
            })
                .overrideTemplate(RubriqueProfilUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RubriqueProfilUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubriqueProfilService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RubriqueProfil(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubriqueProfil = entity;
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
                    const entity = new RubriqueProfil();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubriqueProfil = entity;
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
