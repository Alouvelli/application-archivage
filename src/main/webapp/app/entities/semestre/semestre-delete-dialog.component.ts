import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISemestre } from 'app/shared/model/semestre.model';
import { SemestreService } from './semestre.service';

@Component({
    selector: 'jhi-semestre-delete-dialog',
    templateUrl: './semestre-delete-dialog.component.html'
})
export class SemestreDeleteDialogComponent {
    semestre: ISemestre;

    constructor(protected semestreService: SemestreService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.semestreService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'semestreListModification',
                content: 'Deleted an semestre'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-semestre-delete-popup',
    template: ''
})
export class SemestreDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ semestre }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SemestreDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.semestre = semestre;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/semestre', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/semestre', { outlets: { popup: null } }]);
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
