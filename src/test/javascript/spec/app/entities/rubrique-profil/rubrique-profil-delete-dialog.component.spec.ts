/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { RubriqueProfilDeleteDialogComponent } from 'app/entities/rubrique-profil/rubrique-profil-delete-dialog.component';
import { RubriqueProfilService } from 'app/entities/rubrique-profil/rubrique-profil.service';

describe('Component Tests', () => {
    describe('RubriqueProfil Management Delete Component', () => {
        let comp: RubriqueProfilDeleteDialogComponent;
        let fixture: ComponentFixture<RubriqueProfilDeleteDialogComponent>;
        let service: RubriqueProfilService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [RubriqueProfilDeleteDialogComponent]
            })
                .overrideTemplate(RubriqueProfilDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RubriqueProfilDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RubriqueProfilService);
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
