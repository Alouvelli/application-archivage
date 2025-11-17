import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRubrique } from 'app/shared/model/rubrique.model';
import { RubriqueService } from './rubrique.service';

@Component({
    selector: 'jhi-rubrique-delete-dialog',
    templateUrl: './rubrique-delete-dialog.component.html'
})
export class RubriqueDeleteDialogComponent {
    rubrique: IRubrique;

    constructor(protected rubriqueService: RubriqueService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rubriqueService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rubriqueListModification',
                content: 'Deleted an rubrique'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rubrique-delete-popup',
    template: ''
})
export class RubriqueDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rubrique }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RubriqueDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rubrique = rubrique;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/rubrique', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/rubrique', { outlets: { popup: null } }]);
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
