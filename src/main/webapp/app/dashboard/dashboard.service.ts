import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';

export interface DashboardStats {
  documentsTotal: number;
  documentsEnCours: number;
  etudiantsActifs: number;
  classesTotal: number;
  volumeMensuel: MonthlyPoint[];
  statutDocuments: StatusSlice[];
  activites: ActivityItem[];
}

export interface MonthlyPoint {
  label: string;
  value: number;
}

export interface StatusSlice {
  label: string;
  value: number;
  color: string;
}

export interface ActivityItem {
  title: string;
  detail: string;
  time: string;
  status: 'success' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(ApplicationConfigService);

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.appConfig.getEndpointFor('api/dashboard'));
  }
}
