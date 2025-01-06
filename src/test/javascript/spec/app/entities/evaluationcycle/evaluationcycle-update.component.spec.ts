/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EvaluationcycleUpdateComponent } from 'app/entities/evaluationcycle/evaluationcycle-update.component';
import { EvaluationcycleService } from 'app/entities/evaluationcycle/evaluationcycle.service';
import { Evaluationcycle } from 'app/shared/model/evaluationcycle.model';

describe('Component Tests', () => {
    describe('Evaluationcycle Management Update Component', () => {
        let comp: EvaluationcycleUpdateComponent;
        let fixture: ComponentFixture<EvaluationcycleUpdateComponent>;
        let service: EvaluationcycleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EvaluationcycleUpdateComponent]
            })
                .overrideTemplate(EvaluationcycleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EvaluationcycleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EvaluationcycleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Evaluationcycle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.evaluationcycle = entity;
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
                    const entity = new Evaluationcycle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.evaluationcycle = entity;
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
