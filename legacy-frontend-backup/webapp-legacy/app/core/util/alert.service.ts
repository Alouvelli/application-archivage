import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Alert {
  id?: number;
  type: string;
  message: string;
  translationKey?: string;        // AJOUT: Support pour les clés de traduction
  translationParams?: any;        // AJOUT: Paramètres de traduction
  timeout?: number;
  toast?: boolean;
  position?: string;
  scoped?: boolean;
  close?: (alerts: Alert[]) => void;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertId = 0;
  private alerts: Alert[] = [];
  private alertSubject = new Subject<Alert[]>();

  public alerts$ = this.alertSubject.asObservable();

  addAlert(alert: Alert, extAlerts?: Alert[]): Alert {
    alert.id = this.alertId++;

    if (alert.timeout && alert.timeout > 0) {
      setTimeout(() => {
        this.closeAlert(alert.id!, extAlerts);
      }, alert.timeout);
    }

    const alerts = extAlerts || this.alerts;
    alerts.push(alert);
    this.alertSubject.next([...alerts]);

    return alert;
  }

  closeAlert(alertId: number, extAlerts?: Alert[]): void {
    const alerts = extAlerts || this.alerts;
    const index = alerts.findIndex(alert => alert.id === alertId);
    if (index >= 0) {
      alerts.splice(index, 1);
      this.alertSubject.next([...alerts]);
    }
  }

  closeAlertByIndex(index: number, extAlerts?: Alert[]): void {
    const alerts = extAlerts || this.alerts;
    if (index >= 0 && index < alerts.length) {
      alerts.splice(index, 1);
      this.alertSubject.next([...alerts]);
    }
  }

  clear(): void {
    this.alerts.splice(0);
    this.alertSubject.next([]);
  }

  get(): Alert[] {
    return this.alerts;
  }

  success(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'success',
      message: msg,
      timeout: 5000,
      toast: true,
      position
    });
  }

  error(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'danger',
      message: msg,
      timeout: 5000,
      toast: true,
      position
    });
  }

  warning(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'warning',
      message: msg,
      timeout: 5000,
      toast: true,
      position
    });
  }

  info(msg: string, params?: any, position?: string): Alert {
    return this.addAlert({
      type: 'info',
      message: msg,
      timeout: 5000,
      toast: true,
      position
    });
  }

  // AJOUT: Méthode pour les alertes avec clés de traduction
  addTranslatedAlert(type: string, translationKey: string, translationParams?: any, position?: string): Alert {
    return this.addAlert({
      type,
      message: translationKey, // Fallback si pas de traduction
      translationKey,
      translationParams,
      timeout: 5000,
      toast: true,
      position
    });
  }
}
