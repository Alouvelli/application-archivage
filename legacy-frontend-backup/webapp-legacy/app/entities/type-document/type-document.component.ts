import { CommonModule } from '@angular/common';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEye, faPen, faPlus, faRedo, faSort, faToggleOff, faToggleOn, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ITEMS_PER_PAGE, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import ItemCountComponent from 'app/shared/pagination/item-count.component';
import { SortByDirective, SortDirective } from 'app/shared/sort';
import { ITypeDocument } from 'app/shared/model/type-document.model';
import { TypeDocumentService } from './type-document.service';
import { SortState } from 'app/shared/sort/sort-state';
import { TypeDocumentDeleteDialogComponent } from './type-document-delete-dialog.component';

@Component({
  selector: 'jhi-type-document',
  standalone: true,
  templateUrl: './type-document.component.html',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    FontAwesomeModule,
    NgbModalModule,
    NgbPaginationModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    TypeDocumentDeleteDialogComponent
  ]
})
export class TypeDocumentComponent implements OnInit {
  typeDocuments: ITypeDocument[] = [];
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
  protected readonly faToggleOn = faToggleOn;
  protected readonly faToggleOff = faToggleOff;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly typeDocumentService: TypeDocumentService,
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

  onSortChange(sortState: SortState): void {
    this.predicate = sortState.predicate;
    this.ascending = sortState.order === 'asc';
    this.navigateToPage(1);
  }

  trackId = (_index: number, item: ITypeDocument): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.typeDocumentService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<ITypeDocument[]>) => {
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

  toggleEtat(typeDocument: ITypeDocument): void {
    const updated: ITypeDocument = { ...typeDocument, etat: !(typeDocument.etat ?? false) };
    this.typeDocumentService.update(updated).subscribe({
      next: () => {
        typeDocument.etat = updated.etat;
      }
    });
  }

  delete(typeDocument: ITypeDocument): void {
    const modalRef = this.modalService.open(TypeDocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.typeDocument = typeDocument;
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

  protected onSuccess(data: ITypeDocument[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
    this.typeDocuments = data ?? [];
  }
}
