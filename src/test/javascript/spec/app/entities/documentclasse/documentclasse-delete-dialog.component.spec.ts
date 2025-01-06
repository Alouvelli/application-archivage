/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { DocumentclasseDeleteDialogComponent } from 'app/entities/documentclasse/documentclasse-delete-dialog.component';
import { DocumentclasseService } from 'app/entities/documentclasse/documentclasse.service';

describe('Component Tests', () => {
    describe('Documentclasse Management Delete Component', () => {
        let comp: DocumentclasseDeleteDialogComponent;
        let fixture: ComponentFixture<DocumentclasseDeleteDialogComponent>;
        let service: DocumentclasseService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DocumentclasseDeleteDialogComponent]
            })
                .overrideTemplate(DocumentclasseDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DocumentclasseDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DocumentclasseService);
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
