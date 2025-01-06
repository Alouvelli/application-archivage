/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SpecialiteUpdateComponent } from 'app/entities/specialite/specialite-update.component';
import { SpecialiteService } from 'app/entities/specialite/specialite.service';
import { Specialite } from 'app/shared/model/specialite.model';

describe('Component Tests', () => {
    describe('Specialite Management Update Component', () => {
        let comp: SpecialiteUpdateComponent;
        let fixture: ComponentFixture<SpecialiteUpdateComponent>;
        let service: SpecialiteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SpecialiteUpdateComponent]
            })
                .overrideTemplate(SpecialiteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpecialiteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialiteService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Specialite(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specialite = entity;
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
                    const entity = new Specialite();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specialite = entity;
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
