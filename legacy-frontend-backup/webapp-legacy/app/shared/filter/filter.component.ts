import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import TranslateDirective from '../language/translate.directive';
import { IFilterOptions } from './filter.model';

@Component({
  selector: 'jhi-filter',
  standalone: true,
  imports: [CommonModule, TranslateModule, TranslateDirective, FontAwesomeModule],
  templateUrl: './filter.component.html'
})
export default class FilterComponent {
  readonly filters = input.required<IFilterOptions>();

  clearAllFilters(): void {
    this.filters().clear();
  }

  clearFilter(filterName: string, value: string): void {
    this.filters().removeFilter(filterName, value);
  }
}
