import { CommonModule, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbDropdownModule, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService } from 'ng-jhipster';
import { SessionStorageService } from 'ngx-webstorage';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { VERSION } from 'app/app.constants';
import { JhiLanguageHelper, AccountService, LoginModalService, LoginService } from 'app/core';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import TranslateDirective from 'app/shared/language/translate.directive';
import { FindLanguageFromKeyPipe, HasAnyAuthorityDirective } from 'app/shared';
import { ActiveMenuDirective } from './active-menu.directive';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['navbar.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        NgbDropdownModule,
        NgbCollapseModule,
        NgIf,
        NgForOf,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        FontAwesomeModule,
        TranslateModule,
        TranslateDirective,
        FindLanguageFromKeyPipe,
        HasAnyAuthorityDirective,
        ActiveMenuDirective
    ]
})
export class NavbarComponent implements OnInit {
    inProduction = false;
    isNavbarCollapsed = true;
    languages: any[] = [];
    swaggerEnabled = false;
    modalRef?: NgbModalRef | null;
    version = VERSION ? 'v' + VERSION : '';

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private sessionStorage: SessionStorageService,
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router
    ) {}

    ngOnInit() {
        this.languageHelper.getAll().then(languages => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    changeLanguage(languageKey: string) {
        this.sessionStorage.store('locale', languageKey);
        this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.accountService.getImageUrl() : null;
    }
}
