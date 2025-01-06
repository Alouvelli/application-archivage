/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypesalleUpdateComponent } from 'app/entities/typesalle/typesalle-update.component';
import { TypesalleService } from 'app/entities/typesalle/typesalle.service';
import { Typesalle } from 'app/shared/model/typesalle.model';

describe('Component Tests', () => {
    describe('Typesalle Management Update Component', () => {
        let comp: TypesalleUpdateComponent;
        let fixture: ComponentFixture<TypesalleUpdateComponent>;
        let service: TypesalleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypesalleUpdateComponent]
            })
                .overrideTemplate(TypesalleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypesalleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypesalleService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Typesalle(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typesalle = entity;
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
                    const entity = new Typesalle();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typesalle = entity;
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
