import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';

@Component({
    selector: 'jhi-departement-delete-dialog',
    templateUrl: './departement-delete-dialog.component.html'
})
export class DepartementDeleteDialogComponent {
    departement: IDepartement;

    constructor(
        protected departementService: DepartementService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.departementService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'departementListModification',
                content: 'Deleted an departement'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-departement-delete-popup',
    template: ''
})
export class DepartementDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ departement }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DepartementDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.departement = departement;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/departement', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/departement', { outlets: { popup: null } }]);
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
