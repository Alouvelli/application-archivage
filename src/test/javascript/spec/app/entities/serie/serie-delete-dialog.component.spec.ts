/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { SerieDeleteDialogComponent } from 'app/entities/serie/serie-delete-dialog.component';
import { SerieService } from 'app/entities/serie/serie.service';

describe('Component Tests', () => {
    describe('Serie Management Delete Component', () => {
        let comp: SerieDeleteDialogComponent;
        let fixture: ComponentFixture<SerieDeleteDialogComponent>;
        let service: SerieService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SerieDeleteDialogComponent]
            })
                .overrideTemplate(SerieDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SerieDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SerieService);
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
