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
import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';
import { EmployeDeleteDialogComponent } from './employe-delete-dialog.component';

@Component({
  selector: 'jhi-employe',
  standalone: true,
  templateUrl: './employe.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbPaginationModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    EmployeDeleteDialogComponent,
    RouterLink
  ]
})
export class EmployeComponent implements OnInit {
  employes: IEmploye[] = [];
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
    private readonly employeService: EmployeService,
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

  trackId = (_index: number, item: IEmploye): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.employeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<IEmploye[]>) => {
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

  delete(employe: IEmploye): void {
    const modalRef = this.modalService.open(EmployeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.employe = employe;
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

  protected onSuccess(data: IEmploye[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
    this.employes = data ?? [];
  }
}
