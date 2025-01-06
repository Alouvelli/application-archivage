/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { SpecialitecycleDeleteDialogComponent } from 'app/entities/specialitecycle/specialitecycle-delete-dialog.component';
import { SpecialitecycleService } from 'app/entities/specialitecycle/specialitecycle.service';

describe('Component Tests', () => {
    describe('Specialitecycle Management Delete Component', () => {
        let comp: SpecialitecycleDeleteDialogComponent;
        let fixture: ComponentFixture<SpecialitecycleDeleteDialogComponent>;
        let service: SpecialitecycleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SpecialitecycleDeleteDialogComponent]
            })
                .overrideTemplate(SpecialitecycleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SpecialitecycleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SpecialitecycleService);
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
