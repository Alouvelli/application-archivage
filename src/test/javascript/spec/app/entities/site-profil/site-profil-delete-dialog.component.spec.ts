/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GestionEcoleTestModule } from '../../../test.module';
import { SiteProfilDeleteDialogComponent } from 'app/entities/site-profil/site-profil-delete-dialog.component';
import { SiteProfilService } from 'app/entities/site-profil/site-profil.service';

describe('Component Tests', () => {
    describe('SiteProfil Management Delete Component', () => {
        let comp: SiteProfilDeleteDialogComponent;
        let fixture: ComponentFixture<SiteProfilDeleteDialogComponent>;
        let service: SiteProfilService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GestionEcoleTestModule],
                declarations: [SiteProfilDeleteDialogComponent]
            })
                .overrideTemplate(SiteProfilDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SiteProfilDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SiteProfilService);
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
