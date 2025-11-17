import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtudiant } from 'app/shared/model/etudiant.model';
import { EtudiantService } from './etudiant.service';

@Component({
    selector: 'jhi-etudiant-delete-dialog',
    templateUrl: './etudiant-delete-dialog.component.html'
})
export class EtudiantDeleteDialogComponent {
    etudiant: IEtudiant;

    constructor(protected etudiantService: EtudiantService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.etudiantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'etudiantListModification',
                content: 'Deleted an etudiant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-etudiant-delete-popup',
    template: ''
})
export class EtudiantDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ etudiant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EtudiantDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.etudiant = etudiant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/etudiant', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/etudiant', { outlets: { popup: null } }]);
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
