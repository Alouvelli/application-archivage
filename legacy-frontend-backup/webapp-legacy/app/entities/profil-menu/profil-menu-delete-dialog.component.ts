import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProfilMenu } from 'app/shared/model/profil-menu.model';
import { ProfilMenuService } from './profil-menu.service';

@Component({
    selector: 'jhi-profil-menu-delete-dialog',
    templateUrl: './profil-menu-delete-dialog.component.html'
})
export class ProfilMenuDeleteDialogComponent {
    profilMenu: IProfilMenu;

    constructor(
        protected profilMenuService: ProfilMenuService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.profilMenuService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'profilMenuListModification',
                content: 'Deleted an profilMenu'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-profil-menu-delete-popup',
    template: ''
})
export class ProfilMenuDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ profilMenu }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ProfilMenuDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.profilMenu = profilMenu;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/profil-menu', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/profil-menu', { outlets: { popup: null } }]);
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
