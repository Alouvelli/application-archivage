import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilModule } from 'app/shared/model/profil-module.model';
import { ProfilModuleService } from './profil-module.service';

@Component({
    selector: 'jhi-profil-module-delete-dialog',
    templateUrl: './profil-module-delete-dialog.component.html'
})
export class ProfilModuleDeleteDialogComponent {
    profilModule: IProfilModule;

    constructor(
        protected profilModuleService: ProfilModuleService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.profilModuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'profilModuleListModification',
                content: 'Deleted an profilModule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-profil-module-delete-popup',
    template: ''
})
export class ProfilModuleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profilModule }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProfilModuleDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.profilModule = profilModule;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/profil-module', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/profil-module', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
