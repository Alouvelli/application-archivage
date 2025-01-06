/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { CycleDeleteDialogComponent } from 'app/entities/cycle/cycle-delete-dialog.component';
import { CycleService } from 'app/entities/cycle/cycle.service';

describe('Component Tests', () => {
    describe('Cycle Management Delete Component', () => {
        let comp: CycleDeleteDialogComponent;
        let fixture: ComponentFixture<CycleDeleteDialogComponent>;
        let service: CycleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [CycleDeleteDialogComponent]
            })
                .overrideTemplate(CycleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CycleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CycleService);
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
