/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { ProfilModuleDeleteDialogComponent } from 'app/entities/profil-module/profil-module-delete-dialog.component';
import { ProfilModuleService } from 'app/entities/profil-module/profil-module.service';

describe('Component Tests', () => {
    describe('ProfilModule Management Delete Component', () => {
        let comp: ProfilModuleDeleteDialogComponent;
        let fixture: ComponentFixture<ProfilModuleDeleteDialogComponent>;
        let service: ProfilModuleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [ProfilModuleDeleteDialogComponent]
            })
                .overrideTemplate(ProfilModuleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProfilModuleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfilModuleService);
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
