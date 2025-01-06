/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { SemestreDeleteDialogComponent } from 'app/entities/semestre/semestre-delete-dialog.component';
import { SemestreService } from 'app/entities/semestre/semestre.service';

describe('Component Tests', () => {
    describe('Semestre Management Delete Component', () => {
        let comp: SemestreDeleteDialogComponent;
        let fixture: ComponentFixture<SemestreDeleteDialogComponent>;
        let service: SemestreService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SemestreDeleteDialogComponent]
            })
                .overrideTemplate(SemestreDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SemestreDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SemestreService);
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
