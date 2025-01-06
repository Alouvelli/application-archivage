/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { GestionEcoleTestModule } from '../../../test.module';
import { DocumentexcelUpdateComponent } from 'app/entities/documentexcel/documentexcel-update.component';
import { DocumentexcelService } from 'app/entities/documentexcel/documentexcel.service';
import { Documentexcel } from 'app/shared/model/documentexcel.model';

describe('Component Tests', () => {
    describe('Documentexcel Management Update Component', () => {
        let comp: DocumentexcelUpdateComponent;
        let fixture: ComponentFixture<DocumentexcelUpdateComponent>;
        let service: DocumentexcelService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DocumentexcelUpdateComponent]
            })
                .overrideTemplate(DocumentexcelUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DocumentexcelUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentexcelService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Documentexcel(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentexcel = entity;
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
                    const entity = new Documentexcel();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.documentexcel = entity;
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
