import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';

@Component({
    selector: 'jhi-classe-delete-dialog',
    templateUrl: './classe-delete-dialog.component.html'
})
export class ClasseDeleteDialogComponent {
    classe: IClasse;

    constructor(protected classeService: ClasseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.classeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'classeListModification',
                content: 'Deleted an classe'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-classe-delete-popup',
    template: ''
})
export class ClasseDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ classe }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ClasseDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.classe = classe;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/classe', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/classe', { outlets: { popup: null } }]);
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
