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
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from './menu.service';
import { MenuDeleteDialogComponent } from './menu-delete-dialog.component';

@Component({
  selector: 'jhi-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbPaginationModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    MenuDeleteDialogComponent,
    RouterLink
  ]
})
export class MenuComponent implements OnInit {
  menus: IMenu[] = [];
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
    private readonly menuService: MenuService,
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

  trackId = (_index: number, item: IMenu): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.menuService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<IMenu[]>) => {
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

  toggleActive(menu: IMenu): void {
    const nextValue = menu.etatMenu === 1 ? 0 : 1;
    const updatedMenu: IMenu = { ...menu, etatMenu: nextValue };
    this.menuService.update(updatedMenu).subscribe({
      next: () => {
        menu.etatMenu = nextValue;
      }
    });
  }

  delete(menu: IMenu): void {
    const modalRef = this.modalService.open(MenuDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.menu = menu;
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

  protected onSuccess(data: IMenu[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
    this.menus = data ?? [];
  }
}
