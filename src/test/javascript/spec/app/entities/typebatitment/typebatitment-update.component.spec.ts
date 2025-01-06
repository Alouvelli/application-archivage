/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypebatitmentUpdateComponent } from 'app/entities/typebatitment/typebatitment-update.component';
import { TypebatitmentService } from 'app/entities/typebatitment/typebatitment.service';
import { Typebatitment } from 'app/shared/model/typebatitment.model';

describe('Component Tests', () => {
    describe('Typebatitment Management Update Component', () => {
        let comp: TypebatitmentUpdateComponent;
        let fixture: ComponentFixture<TypebatitmentUpdateComponent>;
        let service: TypebatitmentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypebatitmentUpdateComponent]
            })
                .overrideTemplate(TypebatitmentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypebatitmentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypebatitmentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Typebatitment(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typebatitment = entity;
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
                    const entity = new Typebatitment();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typebatitment = entity;
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
