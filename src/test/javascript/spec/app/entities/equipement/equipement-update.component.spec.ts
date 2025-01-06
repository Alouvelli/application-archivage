/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { EquipementUpdateComponent } from 'app/entities/equipement/equipement-update.component';
import { EquipementService } from 'app/entities/equipement/equipement.service';
import { Equipement } from 'app/shared/model/equipement.model';

describe('Component Tests', () => {
    describe('Equipement Management Update Component', () => {
        let comp: EquipementUpdateComponent;
        let fixture: ComponentFixture<EquipementUpdateComponent>;
        let service: EquipementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [EquipementUpdateComponent]
            })
                .overrideTemplate(EquipementUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EquipementUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EquipementService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Equipement(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equipement = entity;
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
                    const entity = new Equipement();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.equipement = entity;
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
