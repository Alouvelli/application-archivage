/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilMenuDeleteDialogComponent } from 'app/entities/profil-menu/profil-menu-delete-dialog.component';
import { ProfilMenuService } from 'app/entities/profil-menu/profil-menu.service';

describe('Component Tests', () => {
    describe('ProfilMenu Management Delete Component', () => {
        let comp: ProfilMenuDeleteDialogComponent;
        let fixture: ComponentFixture<ProfilMenuDeleteDialogComponent>;
        let service: ProfilMenuService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilMenuDeleteDialogComponent]
            })
                .overrideTemplate(ProfilMenuDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProfilMenuDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilMenuService);
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
