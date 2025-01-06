/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { ModelecontratUpdateComponent } from 'app/entities/modelecontrat/modelecontrat-update.component';
import { ModelecontratService } from 'app/entities/modelecontrat/modelecontrat.service';
import { Modelecontrat } from 'app/shared/model/modelecontrat.model';

describe('Component Tests', () => {
    describe('Modelecontrat Management Update Component', () => {
        let comp: ModelecontratUpdateComponent;
        let fixture: ComponentFixture<ModelecontratUpdateComponent>;
        let service: ModelecontratService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ModelecontratUpdateComponent]
            })
                .overrideTemplate(ModelecontratUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ModelecontratUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModelecontratService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Modelecontrat(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelecontrat = entity;
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
                    const entity = new Modelecontrat();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.modelecontrat = entity;
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
