import { ModuleWithProviders, NgModule } from '@angular/core';

export { EventManager as JhiEventManager, EventWithContent as JhiEventWithContent, JhiEvent } from '../util/event-manager.service';
export type { JhiEventWithContent } from '../util/event-manager.service';
export { ParseLinks as JhiParseLinks } from '../util/parse-links.service';
export { AlertService as JhiAlertService } from '../util/alert.service';
export { DataUtils as JhiDataUtils } from '../util/data-util.service';
export {
  PaginationUtil as JhiPaginationUtil,
  ResolvePagingParams as JhiResolvePagingParams,
} from '../util/pagination-util.service';
export { JhiLanguageService } from '../language/language.service';
export { JhiLanguageHelper } from '../language/language.helper';

@NgModule({})
export class NgJhipsterModule {
  static forRoot(
    _config?: { alertAsToast?: boolean; alertTimeout?: number; i18nEnabled?: boolean; defaultI18nLang?: string },
  ): ModuleWithProviders<NgJhipsterModule> {
    return {
      ngModule: NgJhipsterModule,
    };
  }
}
