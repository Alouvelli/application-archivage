import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PaginationUtil {
  parsePage(page: string | null | undefined): number {
    const parsed = parseInt(page ?? '1', 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  }

  parsePredicate(sort: string | null | undefined): string {
    return (sort ?? 'id').split(',')[0];
  }

  parseAscending(sort: string | null | undefined): boolean {
    const direction = (sort ?? 'id,asc').split(',')[1];
    return direction?.toLowerCase() !== 'desc';
  }
}

@Injectable({ providedIn: 'root' })
export class ResolvePagingParams implements Resolve<{ page: number; predicate: string; ascending: boolean; sort: string }> {
  private readonly paginationUtil = inject(PaginationUtil);

  resolve(route: ActivatedRouteSnapshot): { page: number; predicate: string; ascending: boolean; sort: string } {
    const page = route.queryParamMap.get('page');
    const sort = route.queryParamMap.get('sort') ?? route.data?.['defaultSort'] ?? 'id,asc';

    const parsedPage = this.paginationUtil.parsePage(page);
    const predicate = this.paginationUtil.parsePredicate(sort);
    const ascending = this.paginationUtil.parseAscending(sort);

    return {
      page: parsedPage,
      predicate,
      ascending,
      sort: `${predicate},${ascending ? 'asc' : 'desc'}`,
    };
  }
}
