import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRubriqueProfil } from 'app/shared/model/rubrique-profil.model';
import { AccountService } from 'app/core';
import { RubriqueProfilService } from './rubrique-profil.service';

@Component({
    selector: 'jhi-rubrique-profil',
    templateUrl: './rubrique-profil.component.html'
})
export class RubriqueProfilComponent implements OnInit, OnDestroy {
    rubriqueProfils: IRubriqueProfil[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected rubriqueProfilService: RubriqueProfilService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.rubriqueProfilService
            .query()
            .pipe(
                filter((res: HttpResponse<IRubriqueProfil[]>) => res.ok),
                map((res: HttpResponse<IRubriqueProfil[]>) => res.body)
            )
            .subscribe(
                (res: IRubriqueProfil[]) => {
                    this.rubriqueProfils = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRubriqueProfils();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRubriqueProfil) {
        return item.id;
    }

    registerChangeInRubriqueProfils() {
        this.eventSubscriber = this.eventManager.subscribe('rubriqueProfilListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
