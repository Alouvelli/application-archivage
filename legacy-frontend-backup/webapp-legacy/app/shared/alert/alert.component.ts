import { Component, OnDestroy, OnInit } from '@angular/core';
import { JhiAlertService } from 'ng-jhipster';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'app/core/util/alert.service';

@Component({
    selector: 'jhi-alert',
    standalone: true,
    imports: [
        NgForOf,
        NgClass,
        NgIf,
        NgbAlertModule
    ],
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
export class JhiAlertComponent implements OnInit, OnDestroy {
    alerts: Alert[] = [];

    constructor(private alertService: JhiAlertService) {}

    ngOnInit() {
        this.alerts = this.alertService.get();
    }

    setClasses(alert: Alert): Record<string, boolean> {
        const positionClass = alert.position ?? 'top';
        return {
            toast: !!alert.toast,
            [positionClass]: true
        };
    }

    close(alert: Alert): void {
        alert.close?.(this.alerts);
    }

    ngOnDestroy() {
        this.alerts = [];
    }
}
