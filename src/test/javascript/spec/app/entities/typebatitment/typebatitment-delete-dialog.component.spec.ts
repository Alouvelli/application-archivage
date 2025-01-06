/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { TypebatitmentDeleteDialogComponent } from 'app/entities/typebatitment/typebatitment-delete-dialog.component';
import { TypebatitmentService } from 'app/entities/typebatitment/typebatitment.service';

describe('Component Tests', () => {
    describe('Typebatitment Management Delete Component', () => {
        let comp: TypebatitmentDeleteDialogComponent;
        let fixture: ComponentFixture<TypebatitmentDeleteDialogComponent>;
        let service: TypebatitmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [TypebatitmentDeleteDialogComponent]
            })
                .overrideTemplate(TypebatitmentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TypebatitmentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypebatitmentService);
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
