import { Component, OnDestroy } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'app/core/util/alert.service';

@Component({
    selector: 'jhi-alert-error',
    standalone: true,
    imports: [NgForOf, NgIf, NgClass, NgbAlertModule],
    template: `
        <div class="alerts" role="alert">
            <div *ngFor="let alert of alerts" [ngClass]="setClasses(alert)">
                <ngb-alert *ngIf="alert && alert.type && alert.message" [type]="alert.type" (close)="close(alert)">
                    <pre [innerHTML]="alert.message"></pre>
                </ngb-alert>
            </div>
        </div>
    `
})
export class JhiAlertErrorComponent implements OnDestroy {
    alerts: Alert[] = [];
    cleanHttpErrorListener?: Subscription;
    /* tslint:disable */
    constructor(private alertService: JhiAlertService, private eventManager: JhiEventManager, private translateService: TranslateService) {
        /* tslint:enable */
        this.cleanHttpErrorListener = eventManager.subscribe('gestionEcoleApp.httpError', response => {
            let i;
            const httpErrorResponse = response.content as HttpErrorResponse;
            if (!httpErrorResponse) {
                return;
            }
            switch (httpErrorResponse.status) {
                // connection refused, server not reachable
                case 0:
                    this.addErrorAlert('Server not reachable', 'error.server.not.reachable');
                    break;

                case 400:
                    const arr = httpErrorResponse.headers.keys();
                    let errorHeader = null;
                    let entityKey = null;
                    arr.forEach((entry: string) => {
                        if (entry.toLowerCase().endsWith('app-error')) {
                            errorHeader = httpErrorResponse.headers.get(entry);
                        } else if (entry.toLowerCase().endsWith('app-params')) {
                            entityKey = httpErrorResponse.headers.get(entry);
                        }
                    });
                    if (errorHeader) {
                        const entityName = translateService.instant('global.menu.entities.' + entityKey);
                        this.addErrorAlert(errorHeader, errorHeader, { entityName });
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.fieldErrors) {
                        const fieldErrors = httpErrorResponse.error.fieldErrors;
                        for (i = 0; i < fieldErrors.length; i++) {
                            const fieldError = fieldErrors[i];
                            if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                                fieldError.message = 'Size';
                            }
                            // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                            const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                            const fieldName = translateService.instant('gestionEcoleApp.' + fieldError.objectName + '.' + convertedField);
                            this.addErrorAlert('Error on field "' + fieldName + '"', 'error.' + fieldError.message, { fieldName });
                        }
                    } else if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.message,
                            httpErrorResponse.error.params
                        );
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
                    break;

                case 404:
                    this.addErrorAlert('Not found', 'error.url.not.found');
                    break;

                default:
                    if (httpErrorResponse.error !== '' && httpErrorResponse.error.message) {
                        this.addErrorAlert(httpErrorResponse.error.message);
                    } else {
                        this.addErrorAlert(httpErrorResponse.error);
                    }
            }
        });
    }

    setClasses(alert: Alert): Record<string, boolean> {
        const positionClass = alert.position ?? 'top';
        return {
            toast: !!alert.toast,
            [positionClass]: true
        };
    }

    ngOnDestroy() {
        if (this.cleanHttpErrorListener) {
            this.eventManager.destroy(this.cleanHttpErrorListener);
            this.alerts = [];
        }
    }

    addErrorAlert(message: string, key?: string, data?: Record<string, unknown>): void {
        const alertMessage = key ?? message;

        const newAlert: Alert = {
            type: 'danger',
            message: alertMessage,
            translationKey: key ?? undefined,
            translationParams: data,
            timeout: 5000,
            toast: false,
            scoped: true
        };

        this.alerts.push(this.alertService.addAlert(newAlert, this.alerts));
    }

    close(alert: Alert): void {
        alert.close?.(this.alerts);
    }
}
