import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentexcel } from 'app/shared/model/documentexcel.model';
import { DocumentexcelService } from './documentexcel.service';

@Component({
    selector: 'jhi-documentexcel-delete-dialog',
    templateUrl: './documentexcel-delete-dialog.component.html'
})
export class DocumentexcelDeleteDialogComponent {
    documentexcel: IDocumentexcel;

    constructor(
        protected documentexcelService: DocumentexcelService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentexcelService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentexcelListModification',
                content: 'Deleted an documentexcel'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentexcel-delete-popup',
    template: ''
})
export class DocumentexcelDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentexcel }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentexcelDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentexcel = documentexcel;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/documentexcel', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/documentexcel', { outlets: { popup: null } }]);
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
