/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { NiveaudocumentUpdateComponent } from 'app/entities/niveaudocument/niveaudocument-update.component';
import { NiveaudocumentService } from 'app/entities/niveaudocument/niveaudocument.service';
import { Niveaudocument } from 'app/shared/model/niveaudocument.model';

describe('Component Tests', () => {
    describe('Niveaudocument Management Update Component', () => {
        let comp: NiveaudocumentUpdateComponent;
        let fixture: ComponentFixture<NiveaudocumentUpdateComponent>;
        let service: NiveaudocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [NiveaudocumentUpdateComponent]
            })
                .overrideTemplate(NiveaudocumentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NiveaudocumentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveaudocumentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Niveaudocument(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niveaudocument = entity;
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
                    const entity = new Niveaudocument();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.niveaudocument = entity;
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
