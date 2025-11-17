import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgbModal, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faPencilAlt,
  faPlus,
  faSort,
  faSync,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';
import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { SortByDirective, SortDirective } from 'app/shared/sort';
import ItemCountComponent from 'app/shared/pagination/item-count.component';
import { AnneescolaireDeleteDialogComponent } from './anneescolaire-delete-dialog.component';
import { AnneescolaireService } from './anneescolaire.service';

@Component({
  selector: 'jhi-anneescolaire',
  standalone: true,
  templateUrl: './anneescolaire.component.html',
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    FontAwesomeModule,
    NgbModalModule,
    NgbPaginationModule,
    SortDirective,
    SortByDirective,
    ItemCountComponent,
    AnneescolaireDeleteDialogComponent,
    NgFor,
    NgIf
  ]
})
export class AnneescolaireComponent implements OnInit {
  anneescolaires: IAnneescolaire[] = [];
  isLoading = false;

  predicate = 'id';
  ascending = true;

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  protected readonly faSync = faSync;
  protected readonly faPlus = faPlus;
  protected readonly faSort = faSort;
  protected readonly faEye = faEye;
  protected readonly faPencil = faPencilAlt;
  protected readonly faTrash = faTrash;

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly anneescolaireService: AnneescolaireService,
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
        const [predicate, order] = sort.split(',');

        this.page = page;
        this.predicate = predicate;
        this.ascending = order === 'asc';
        this.load();
      });
  }

  trackId = (_index: number, item: IAnneescolaire): number => item.id!;

  load(): void {
    this.isLoading = true;
    this.anneescolaireService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: HttpResponse<IAnneescolaire[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  navigateToPage(page = this.page): void {
    this.page = page;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        page,
        size: this.itemsPerPage,
        sort: `${this.predicate},${this.ascending ? 'asc' : 'desc'}`
      }
    });
  }

  delete(anneescolaire: IAnneescolaire): void {
    const modalRef = this.modalService.open(AnneescolaireDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.anneescolaire = anneescolaire;
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

  protected onSuccess(data: IAnneescolaire[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.anneescolaires = data ?? [];
  }
}
