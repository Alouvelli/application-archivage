/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueUpdateComponent } from 'app/entities/rubrique/rubrique-update.component';
import { RubriqueService } from 'app/entities/rubrique/rubrique.service';
import { Rubrique } from 'app/shared/model/rubrique.model';

describe('Component Tests', () => {
    describe('Rubrique Management Update Component', () => {
        let comp: RubriqueUpdateComponent;
        let fixture: ComponentFixture<RubriqueUpdateComponent>;
        let service: RubriqueService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueUpdateComponent]
            })
                .overrideTemplate(RubriqueUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RubriqueUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubriqueService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Rubrique(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubrique = entity;
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
                    const entity = new Rubrique();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.rubrique = entity;
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
