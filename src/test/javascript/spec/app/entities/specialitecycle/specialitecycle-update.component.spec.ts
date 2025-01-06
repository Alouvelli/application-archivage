/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { SpecialitecycleUpdateComponent } from 'app/entities/specialitecycle/specialitecycle-update.component';
import { SpecialitecycleService } from 'app/entities/specialitecycle/specialitecycle.service';
import { Specialitecycle } from 'app/shared/model/specialitecycle.model';

describe('Component Tests', () => {
    describe('Specialitecycle Management Update Component', () => {
        let comp: SpecialitecycleUpdateComponent;
        let fixture: ComponentFixture<SpecialitecycleUpdateComponent>;
        let service: SpecialitecycleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SpecialitecycleUpdateComponent]
            })
                .overrideTemplate(SpecialitecycleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SpecialitecycleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialitecycleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Specialitecycle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specialitecycle = entity;
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
                    const entity = new Specialitecycle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.specialitecycle = entity;
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
