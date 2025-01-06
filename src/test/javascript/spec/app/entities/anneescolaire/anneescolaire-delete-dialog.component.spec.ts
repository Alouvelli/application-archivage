/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { AnneescolaireDeleteDialogComponent } from 'app/entities/anneescolaire/anneescolaire-delete-dialog.component';
import { AnneescolaireService } from 'app/entities/anneescolaire/anneescolaire.service';

describe('Component Tests', () => {
    describe('Anneescolaire Management Delete Component', () => {
        let comp: AnneescolaireDeleteDialogComponent;
        let fixture: ComponentFixture<AnneescolaireDeleteDialogComponent>;
        let service: AnneescolaireService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [AnneescolaireDeleteDialogComponent]
            })
                .overrideTemplate(AnneescolaireDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnneescolaireDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnneescolaireService);
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
