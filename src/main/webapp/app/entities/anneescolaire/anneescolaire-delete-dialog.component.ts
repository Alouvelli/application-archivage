import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';

@Component({
    selector: 'jhi-anneescolaire-delete-dialog',
    templateUrl: './anneescolaire-delete-dialog.component.html'
})
export class AnneescolaireDeleteDialogComponent {
    anneescolaire: IAnneescolaire;

    constructor(
        protected anneescolaireService: AnneescolaireService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.anneescolaireService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'anneescolaireListModification',
                content: 'Deleted an anneescolaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-anneescolaire-delete-popup',
    template: ''
})
export class AnneescolaireDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ anneescolaire }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AnneescolaireDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.anneescolaire = anneescolaire;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/anneescolaire', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/anneescolaire', { outlets: { popup: null } }]);
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
