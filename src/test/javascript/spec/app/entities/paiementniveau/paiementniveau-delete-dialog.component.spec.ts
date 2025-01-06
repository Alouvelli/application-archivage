/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementniveauDeleteDialogComponent } from 'app/entities/paiementniveau/paiementniveau-delete-dialog.component';
import { PaiementniveauService } from 'app/entities/paiementniveau/paiementniveau.service';

describe('Component Tests', () => {
    describe('Paiementniveau Management Delete Component', () => {
        let comp: PaiementniveauDeleteDialogComponent;
        let fixture: ComponentFixture<PaiementniveauDeleteDialogComponent>;
        let service: PaiementniveauService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementniveauDeleteDialogComponent]
            })
                .overrideTemplate(PaiementniveauDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaiementniveauDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaiementniveauService);
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
