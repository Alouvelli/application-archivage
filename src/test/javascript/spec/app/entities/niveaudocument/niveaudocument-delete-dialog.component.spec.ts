/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { NiveaudocumentDeleteDialogComponent } from 'app/entities/niveaudocument/niveaudocument-delete-dialog.component';
import { NiveaudocumentService } from 'app/entities/niveaudocument/niveaudocument.service';

describe('Component Tests', () => {
    describe('Niveaudocument Management Delete Component', () => {
        let comp: NiveaudocumentDeleteDialogComponent;
        let fixture: ComponentFixture<NiveaudocumentDeleteDialogComponent>;
        let service: NiveaudocumentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [NiveaudocumentDeleteDialogComponent]
            })
                .overrideTemplate(NiveaudocumentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(NiveaudocumentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NiveaudocumentService);
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
