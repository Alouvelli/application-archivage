/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypeDocumentUpdateComponent } from 'app/entities/type-document/type-document-update.component';
import { TypeDocumentService } from 'app/entities/type-document/type-document.service';
import { TypeDocument } from 'app/shared/model/type-document.model';

describe('Component Tests', () => {
    describe('TypeDocument Management Update Component', () => {
        let comp: TypeDocumentUpdateComponent;
        let fixture: ComponentFixture<TypeDocumentUpdateComponent>;
        let service: TypeDocumentService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypeDocumentUpdateComponent]
            })
                .overrideTemplate(TypeDocumentUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TypeDocumentUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeDocumentService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TypeDocument(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeDocument = entity;
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
                    const entity = new TypeDocument();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.typeDocument = entity;
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
