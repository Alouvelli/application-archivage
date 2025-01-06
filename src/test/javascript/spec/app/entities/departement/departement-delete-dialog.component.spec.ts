/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { DepartementDeleteDialogComponent } from 'app/entities/departement/departement-delete-dialog.component';
import { DepartementService } from 'app/entities/departement/departement.service';

describe('Component Tests', () => {
    describe('Departement Management Delete Component', () => {
        let comp: DepartementDeleteDialogComponent;
        let fixture: ComponentFixture<DepartementDeleteDialogComponent>;
        let service: DepartementService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [DepartementDeleteDialogComponent]
            })
                .overrideTemplate(DepartementDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DepartementDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DepartementService);
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
