/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypeserieUpdateComponent } from 'app/entities/typeserie/typeserie-update.component';
import { TypeserieService } from 'app/entities/typeserie/typeserie.service';
import { Typeserie } from 'app/shared/model/typeserie.model';

describe('Component Tests', () => {
    describe('Typeserie Management Update Component', () => {
        let comp: TypeserieUpdateComponent;
        let fixture: ComponentFixture<TypeserieUpdateComponent>;
        let service: TypeserieService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypeserieUpdateComponent]
            })
                .overrideTemplate(TypeserieUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeserieUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeserieService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Typeserie(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeserie = entity;
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
                    const entity = new Typeserie();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeserie = entity;
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
