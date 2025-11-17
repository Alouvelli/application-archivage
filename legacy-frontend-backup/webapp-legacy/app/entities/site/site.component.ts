import { CommonModule } from '@angular/common';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faPlus, faRedo, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ITEMS_PER_PAGE, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import ItemCountComponent from 'app/shared/pagination/item-count.component';
import { SortByDirective, SortDirective } from 'app/shared/sort';
import { SortState } from 'app/shared/sort/sort-state';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { SiteDeleteDialogComponent } from './site-delete-dialog.component';

interface SitePermissions {
  ajouter: boolean;
  modifier: boolean;
  supprimer: boolean;
  voir: boolean;
}

@Component({
  selector: 'jhi-site',
  standalone: true,
  templateUrl: './site.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    NgbPaginationModule,
    NgbModalModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    RouterLink,
    SiteDeleteDialogComponent
  ]
})
export class SiteComponent implements OnInit {
  sites: ISite[] = [];
  isLoading = false;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  predicate = 'id';
  ascending = true;

  permissions: SitePermissions = { ajouter: true, modifier: true, supprimer: true, voir: true };

  protected readonly faPlus = faPlus;
  protected readonly faRedo = faRedo;
  protected readonly faSort = faSort;
  protected readonly faEye = faEye;
  protected readonly faPen = faPen;
  protected readonly faTrash = faTrash;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly siteService: SiteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    combineLatest([this.activatedRoute.paramMap, this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([paramMap, queryParamMap, data]) => {
        this.permissions = this.extractPermissions(paramMap);

        const page = Number(queryParamMap.get('page')) || 1;
        const sort = queryParamMap.get('sort') ?? (data['defaultSort'] ?? 'id,asc');
        const [predicate, direction] = sort.split(',');

        this.page = page;
        this.predicate = predicate;
        this.ascending = direction === 'asc';
        this.load();
      });
  }

  trackId = (_index: number, item: ISite): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.siteService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<ISite[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  navigateToPage(page = this.page): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page,
        size: this.itemsPerPage,
        sort: `${this.predicate},${this.ascending ? 'asc' : 'desc'}`
      }
    });
  }

  toggleActive(site: ISite): void {
    const updatedSite: ISite = { ...site, etatSite: site.etatSite === 1 ? 0 : 1 };
    this.siteService
      .update(updatedSite)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          site.etatSite = updatedSite.etatSite;
        }
      });
  }

  onSortChange(sortState: SortState): void {
    this.predicate = sortState.predicate;
    this.ascending = sortState.order === 'asc';
    this.navigateToPage(1);
  }

  delete(site: ISite): void {
    const modalRef = this.modalService.open(SiteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.site = site;
    modalRef.closed.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(reason => {
      if (reason === 'deleted') {
        this.load();
      }
    });
  }

  protected sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? 'asc' : 'desc'}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ISite[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
    this.sites = data ?? [];
    this.enrichSitesWithModules();
  }

  private enrichSitesWithModules(): void {
    this.sites.forEach(site => {
      if (!site.id) {
        return;
      }
      this.siteService
        .getModule(site.id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(response => {
          site.modules = response.body ?? [];
        });
    });
  }

  private extractPermissions(paramMap: ParamMap): SitePermissions {
    const toBoolean = (value: string | null): boolean => {
      if (value === null) {
        return true;
      }
      return value === '1' || value.toLowerCase() === 'true';
    };

    return {
      ajouter: toBoolean(paramMap.get('ajouter')),
      modifier: toBoolean(paramMap.get('modifier')),
      supprimer: toBoolean(paramMap.get('supprimer')),
      voir: toBoolean(paramMap.get('voir'))
    };
  }
}
