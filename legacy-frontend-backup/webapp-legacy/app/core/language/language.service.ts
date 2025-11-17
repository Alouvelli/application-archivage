import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class JhiLanguageService {
  constructor(private translateService: TranslateService) {}

  changeLanguage(languageKey: string): void {
    this.translateService.use(languageKey);
  }
}
