import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProfilModule } from 'app/shared/model/profil-module.model';
import { AccountService } from 'app/core';
import { ProfilModuleService } from './profil-module.service';

@Component({
    selector: 'jhi-profil-module',
    templateUrl: './profil-module.component.html'
})
export class ProfilModuleComponent implements OnInit, OnDestroy {
    profilModules: IProfilModule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected profilModuleService: ProfilModuleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.profilModuleService
            .query()
            .pipe(
                filter((res: HttpResponse<IProfilModule[]>) => res.ok),
                map((res: HttpResponse<IProfilModule[]>) => res.body)
            )
            .subscribe(
                (res: IProfilModule[]) => {
                    this.profilModules = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProfilModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProfilModule) {
        return item.id;
    }

    registerChangeInProfilModules() {
        this.eventSubscriber = this.eventManager.subscribe('profilModuleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
