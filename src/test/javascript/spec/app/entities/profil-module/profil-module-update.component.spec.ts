/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilModuleUpdateComponent } from 'app/entities/profil-module/profil-module-update.component';
import { ProfilModuleService } from 'app/entities/profil-module/profil-module.service';
import { ProfilModule } from 'app/shared/model/profil-module.model';

describe('Component Tests', () => {
    describe('ProfilModule Management Update Component', () => {
        let comp: ProfilModuleUpdateComponent;
        let fixture: ComponentFixture<ProfilModuleUpdateComponent>;
        let service: ProfilModuleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilModuleUpdateComponent]
            })
                .overrideTemplate(ProfilModuleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProfilModuleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilModuleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProfilModule(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.profilModule = entity;
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
                    const entity = new ProfilModule();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.profilModule = entity;
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
