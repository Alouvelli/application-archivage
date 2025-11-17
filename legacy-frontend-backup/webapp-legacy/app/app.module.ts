import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { FindLanguageFromKeyPipe, GestionEcoleSharedModule } from 'app/shared';
import { GestionEcoleCoreModule } from 'app/core';
import { GestionEcoleAppRoutingModule } from './app-routing.module';
import { GestionEcoleHomeModule } from 'app/home';
import { GestionEcoleAccountModule } from './account/account.module';
import { GestionEcoleEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { ErrorComponent } from './layouts';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { JhiMainComponent } from './layouts/main/main.component';
import {HomeComponent} from "app/home";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        FontAwesomeModule,
        TranslateModule,
        FindLanguageFromKeyPipe,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'fr'
        }),
        GestionEcoleSharedModule,
        JhiMainComponent,
        NavbarComponent,
        PageRibbonComponent,
        FooterComponent,
        GestionEcoleCoreModule,
        GestionEcoleHomeModule,
        GestionEcoleAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        GestionEcoleEntityModule,
        GestionEcoleAppRoutingModule
    ],
    declarations: [ HomeComponent, ErrorComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent],

    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GestionEcoleAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
