/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypefraisUpdateComponent } from 'app/entities/typefrais/typefrais-update.component';
import { TypefraisService } from 'app/entities/typefrais/typefrais.service';
import { Typefrais } from 'app/shared/model/typefrais.model';

describe('Component Tests', () => {
    describe('Typefrais Management Update Component', () => {
        let comp: TypefraisUpdateComponent;
        let fixture: ComponentFixture<TypefraisUpdateComponent>;
        let service: TypefraisService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypefraisUpdateComponent]
            })
                .overrideTemplate(TypefraisUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypefraisUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypefraisService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Typefrais(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typefrais = entity;
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
                    const entity = new Typefrais();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typefrais = entity;
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
