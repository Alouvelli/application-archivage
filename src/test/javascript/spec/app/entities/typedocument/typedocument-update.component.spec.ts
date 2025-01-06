/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypedocumentUpdateComponent } from 'app/entities/typedocument/typedocument-update.component';
import { TypedocumentService } from 'app/entities/typedocument/typedocument.service';
import { Typedocument } from 'app/shared/model/typedocument.model';

describe('Component Tests', () => {
    describe('Typedocument Management Update Component', () => {
        let comp: TypedocumentUpdateComponent;
        let fixture: ComponentFixture<TypedocumentUpdateComponent>;
        let service: TypedocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypedocumentUpdateComponent]
            })
                .overrideTemplate(TypedocumentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypedocumentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypedocumentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Typedocument(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typedocument = entity;
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
                    const entity = new Typedocument();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typedocument = entity;
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
