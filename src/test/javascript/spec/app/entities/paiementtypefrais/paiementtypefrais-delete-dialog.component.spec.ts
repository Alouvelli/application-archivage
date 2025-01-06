/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { PaiementtypefraisDeleteDialogComponent } from 'app/entities/paiementtypefrais/paiementtypefrais-delete-dialog.component';
import { PaiementtypefraisService } from 'app/entities/paiementtypefrais/paiementtypefrais.service';

describe('Component Tests', () => {
    describe('Paiementtypefrais Management Delete Component', () => {
        let comp: PaiementtypefraisDeleteDialogComponent;
        let fixture: ComponentFixture<PaiementtypefraisDeleteDialogComponent>;
        let service: PaiementtypefraisService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [PaiementtypefraisDeleteDialogComponent]
            })
                .overrideTemplate(PaiementtypefraisDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PaiementtypefraisDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaiementtypefraisService);
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
