/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypedocumentDeleteDialogComponent } from 'app/entities/typedocument/typedocument-delete-dialog.component';
import { TypedocumentService } from 'app/entities/typedocument/typedocument.service';

describe('Component Tests', () => {
    describe('Typedocument Management Delete Component', () => {
        let comp: TypedocumentDeleteDialogComponent;
        let fixture: ComponentFixture<TypedocumentDeleteDialogComponent>;
        let service: TypedocumentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypedocumentDeleteDialogComponent]
            })
                .overrideTemplate(TypedocumentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypedocumentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypedocumentService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
