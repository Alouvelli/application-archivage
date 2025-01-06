/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { CycleUpdateComponent } from 'app/entities/cycle/cycle-update.component';
import { CycleService } from 'app/entities/cycle/cycle.service';
import { Cycle } from 'app/shared/model/cycle.model';

describe('Component Tests', () => {
    describe('Cycle Management Update Component', () => {
        let comp: CycleUpdateComponent;
        let fixture: ComponentFixture<CycleUpdateComponent>;
        let service: CycleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [CycleUpdateComponent]
            })
                .overrideTemplate(CycleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CycleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CycleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Cycle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cycle = entity;
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
                    const entity = new Cycle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.cycle = entity;
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
