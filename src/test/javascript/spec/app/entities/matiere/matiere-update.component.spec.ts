/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { MatiereUpdateComponent } from 'app/entities/matiere/matiere-update.component';
import { MatiereService } from 'app/entities/matiere/matiere.service';
import { Matiere } from 'app/shared/model/matiere.model';

describe('Component Tests', () => {
    describe('Matiere Management Update Component', () => {
        let comp: MatiereUpdateComponent;
        let fixture: ComponentFixture<MatiereUpdateComponent>;
        let service: MatiereService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [MatiereUpdateComponent]
            })
                .overrideTemplate(MatiereUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MatiereUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatiereService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Matiere(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.matiere = entity;
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
                    const entity = new Matiere();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.matiere = entity;
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
