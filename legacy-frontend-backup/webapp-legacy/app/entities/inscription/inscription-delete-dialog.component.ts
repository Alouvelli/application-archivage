import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IInscription } from 'app/shared/model/inscription.model';
import { InscriptionService } from './inscription.service';

@Component({
    selector: 'jhi-inscription-delete-dialog',
    templateUrl: './inscription-delete-dialog.component.html'
})
export class InscriptionDeleteDialogComponent {
    inscription: IInscription;

    constructor(
        protected inscriptionService: InscriptionService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.inscriptionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'inscriptionListModification',
                content: 'Deleted an inscription'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-inscription-delete-popup',
    template: ''
})
export class InscriptionDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ inscription }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(InscriptionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.inscription = inscription;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/inscription', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/inscription', { outlets: { popup: null } }]);
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
