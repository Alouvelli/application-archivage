import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { RubriqueProfilService } from './rubrique-profil.service';

@Component({
    selector: 'jhi-rubrique-profil-delete-dialog',
    templateUrl: './rubrique-profil-delete-dialog.component.html'
})
export class RubriqueProfilDeleteDialogComponent {
    rubriqueProfil: IRubriqueProfil;

    constructor(
        protected rubriqueProfilService: RubriqueProfilService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rubriqueProfilService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rubriqueProfilListModification',
                content: 'Deleted an rubriqueProfil'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rubrique-profil-delete-popup',
    template: ''
})
export class RubriqueProfilDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rubriqueProfil }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RubriqueProfilDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.rubriqueProfil = rubriqueProfil;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/rubrique-profil', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/rubrique-profil', { outlets: { popup: null } }]);
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
