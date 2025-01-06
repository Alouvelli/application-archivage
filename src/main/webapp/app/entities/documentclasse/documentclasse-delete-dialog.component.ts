import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentclasse } from 'app/shared/model/documentclasse.model';
import { DocumentclasseService } from './documentclasse.service';

@Component({
    selector: 'jhi-documentclasse-delete-dialog',
    templateUrl: './documentclasse-delete-dialog.component.html'
})
export class DocumentclasseDeleteDialogComponent {
    documentclasse: IDocumentclasse;

    constructor(
        protected documentclasseService: DocumentclasseService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentclasseService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentclasseListModification',
                content: 'Deleted an documentclasse'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentclasse-delete-popup',
    template: ''
})
export class DocumentclasseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentclasse }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentclasseDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentclasse = documentclasse;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/documentclasse', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/documentclasse', { outlets: { popup: null } }]);
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
