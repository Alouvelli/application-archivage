import { NgModule, LOCALE_ID } from '@angular/core';
import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import locale from '@angular/common/locales/fr';
import {AccountService} from "./auth/account.service";

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        AccountService,
        Title,
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        },
        DatePipe
    ]
})
export class GestionEcoleCoreModule {
    constructor() {
        registerLocaleData(locale);
    }
}
