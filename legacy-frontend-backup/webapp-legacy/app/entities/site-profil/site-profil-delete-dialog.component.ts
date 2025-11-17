import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISiteProfil } from 'app/shared/model/site-profil.model';
import { SiteProfilService } from './site-profil.service';

@Component({
    selector: 'jhi-site-profil-delete-dialog',
    templateUrl: './site-profil-delete-dialog.component.html'
})
export class SiteProfilDeleteDialogComponent {
    siteProfil: ISiteProfil;

    constructor(
        protected siteProfilService: SiteProfilService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.siteProfilService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'siteProfilListModification',
                content: 'Deleted an siteProfil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-site-profil-delete-popup',
    template: ''
})
export class SiteProfilDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ siteProfil }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SiteProfilDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.siteProfil = siteProfil;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/site-profil', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/site-profil', { outlets: { popup: null } }]);
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
