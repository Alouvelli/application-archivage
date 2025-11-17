import { Component, NgZone, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Observable, Subscription, combineLatest, filter, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { IRubriqueProfil } from '../rubrique-profil.model';
import { EntityArrayResponseType, RubriqueProfilService } from '../service/rubrique-profil.service';
import { RubriqueProfilDeleteDialogComponent } from '../delete/rubrique-profil-delete-dialog.component';

@Component({
  selector: 'jhi-rubrique-profil',
  templateUrl: './rubrique-profil.component.html',
  imports: [RouterModule, SharedModule, SortDirective, SortByDirective],
})
export class RubriqueProfilComponent implements OnInit {
  subscription: Subscription | null = null;
  rubriqueProfils = signal<IRubriqueProfil[]>([]);
  isLoading = false;

  sortState = sortStateSignal({});

  public readonly router = inject(Router);
  protected readonly rubriqueProfilService = inject(RubriqueProfilService);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly sortService = inject(SortService);
  protected modalService = inject(NgbModal);
  protected ngZone = inject(NgZone);

  trackId = (item: IRubriqueProfil): number => this.rubriqueProfilService.getRubriqueProfilIdentifier(item);

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => {
          if (this.rubriqueProfils().length === 0) {
            this.load();
          } else {
            this.rubriqueProfils.set(this.refineData(this.rubriqueProfils()));
          }
        }),
      )
      .subscribe();
  }

  delete(rubriqueProfil: IRubriqueProfil): void {
    const modalRef = this.modalService.open(RubriqueProfilDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rubriqueProfil = rubriqueProfil;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(event);
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.rubriqueProfils.set(this.refineData(dataFromBody));
  }

  protected refineData(data: IRubriqueProfil[]): IRubriqueProfil[] {
    const { predicate, order } = this.sortState();
    return predicate && order ? data.sort(this.sortService.startSort({ predicate, order })) : data;
  }

  protected fillComponentAttributesFromResponseBody(data: IRubriqueProfil[] | null): IRubriqueProfil[] {
    return data ?? [];
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    this.isLoading = true;
    const queryObject = {
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.rubriqueProfilService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(sortState: SortState): void {
    const queryParamsObj = {
      sort: this.sortService.buildSortParam(sortState),
    };

    this.ngZone.run(() => {
      this.router.navigate(['./'], {
        relativeTo: this.activatedRoute,
        queryParams: queryParamsObj,
      });
    });
  }
}
