import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';

@Component({
    selector: 'jhi-employe-delete-dialog',
    templateUrl: './employe-delete-dialog.component.html'
})
export class EmployeDeleteDialogComponent {
    employe: IEmploye;

    constructor(protected employeService: EmployeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.employeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'employeListModification',
                content: 'Deleted an employe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-employe-delete-popup',
    template: ''
})
export class EmployeDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ employe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EmployeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.employe = employe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/employe', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/employe', { outlets: { popup: null } }]);
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
