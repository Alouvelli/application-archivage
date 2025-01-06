/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilMenuUpdateComponent } from 'app/entities/profil-menu/profil-menu-update.component';
import { ProfilMenuService } from 'app/entities/profil-menu/profil-menu.service';
import { ProfilMenu } from 'app/shared/model/profil-menu.model';

describe('Component Tests', () => {
    describe('ProfilMenu Management Update Component', () => {
        let comp: ProfilMenuUpdateComponent;
        let fixture: ComponentFixture<ProfilMenuUpdateComponent>;
        let service: ProfilMenuService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilMenuUpdateComponent]
            })
                .overrideTemplate(ProfilMenuUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProfilMenuUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilMenuService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ProfilMenu(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.profilMenu = entity;
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
                    const entity = new ProfilMenu();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.profilMenu = entity;
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
