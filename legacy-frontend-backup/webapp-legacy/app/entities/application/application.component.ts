import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faPlus, faRedo, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ITEMS_PER_PAGE, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import ItemCountComponent from 'app/shared/pagination/item-count.component';
import { SortByDirective, SortDirective } from 'app/shared/sort';
import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';
import { ApplicationDeleteDialogComponent } from './application-delete-dialog.component';

@Component({
  selector: 'jhi-application',
  standalone: true,
  templateUrl: './application.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbPaginationModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    ApplicationDeleteDialogComponent,
    RouterLink
  ]
})
export class ApplicationComponent implements OnInit {
  applications: IApplication[] = [];
  isLoading = false;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;
  predicate = 'id';
  ascending = true;

  protected readonly faPlus = faPlus;
  protected readonly faRedo = faRedo;
  protected readonly faSort = faSort;
  protected readonly faEye = faEye;
  protected readonly faPen = faPen;
  protected readonly faTrash = faTrash;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly applicationService: ApplicationService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly modalService: NgbModal
  ) {}

  ngOnInit(): void {
    combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([params, data]) => {
        const page = Number(params.get('page')) || 1;
        const sort = params.get('sort') ?? (data['defaultSort'] ?? 'id,asc');
        const [predicate, direction] = sort.split(',');

        this.page = page;
        this.predicate = predicate;
        this.ascending = direction === 'asc';
        this.load();
      });
  }

  trackId = (_index: number, item: IApplication): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.applicationService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<IApplication[]>) => {
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

  delete(application: IApplication): void {
    const modalRef = this.modalService.open(ApplicationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.application = application;
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

  protected onSuccess(data: IApplication[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
    this.applications = data ?? [];
  }
}
