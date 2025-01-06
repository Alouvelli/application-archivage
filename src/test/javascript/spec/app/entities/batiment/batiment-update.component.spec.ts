/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { BatimentUpdateComponent } from 'app/entities/batiment/batiment-update.component';
import { BatimentService } from 'app/entities/batiment/batiment.service';
import { Batiment } from 'app/shared/model/batiment.model';

describe('Component Tests', () => {
    describe('Batiment Management Update Component', () => {
        let comp: BatimentUpdateComponent;
        let fixture: ComponentFixture<BatimentUpdateComponent>;
        let service: BatimentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [BatimentUpdateComponent]
            })
                .overrideTemplate(BatimentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(BatimentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BatimentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Batiment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.batiment = entity;
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
                    const entity = new Batiment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.batiment = entity;
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
