/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DocumentclasseUpdateComponent } from 'app/entities/documentclasse/documentclasse-update.component';
import { DocumentclasseService } from 'app/entities/documentclasse/documentclasse.service';
import { Documentclasse } from 'app/shared/model/documentclasse.model';

describe('Component Tests', () => {
    describe('Documentclasse Management Update Component', () => {
        let comp: DocumentclasseUpdateComponent;
        let fixture: ComponentFixture<DocumentclasseUpdateComponent>;
        let service: DocumentclasseService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DocumentclasseUpdateComponent]
            })
                .overrideTemplate(DocumentclasseUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentclasseUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentclasseService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Documentclasse(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentclasse = entity;
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
                    const entity = new Documentclasse();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentclasse = entity;
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
