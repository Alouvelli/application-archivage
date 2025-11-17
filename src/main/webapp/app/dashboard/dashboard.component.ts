import { Component, OnInit, computed, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { AccountService } from 'app/core/auth/account.service';
import { DashboardService, DashboardStats } from './dashboard.service';

interface MetricCard {
  label: string;
  value: number;
  trend: number;
  hint: string;
  accent: string;
}

interface VolumePoint {
  month: string;
  value: number;
}

interface StatusSlice {
  label: string;
  value: number;
  color: string;
}

interface TimelineItem {
  title: string;
  detail: string;
  time: string;
  status: 'success' | 'info' | 'warning';
}

@Component({
  selector: 'jhi-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [CommonModule, RouterModule, SharedModule],
})
export default class DashboardComponent implements OnInit {
  private readonly accountService = inject(AccountService);
  private readonly dashboardService = inject(DashboardService);

  account = this.accountService.trackCurrentAccount();

  metricCards = signal<MetricCard[]>([]);

  volumeSeries = signal<VolumePoint[]>([]);

  statusSlices = signal<StatusSlice[]>([]);

  timeline = signal<TimelineItem[]>([]);

  quickLinks = [
    { label: 'Nouvelle demande', route: '/document/new' },
    { label: 'Créer un site', route: '/site/new' },
    { label: 'Ajouter une classe', route: '/classe/new' },
    { label: 'Gérer les utilisateurs', route: '/admin/user-management' },
  ];

  ngOnInit(): void {
    this.fetchStats();
  }

  private fetchStats(): void {
    this.dashboardService.getStats().subscribe({
      next: stats => this.populate(stats),
      error: () => this.setFallbackStats(),
    });
  }

  private populate(stats: DashboardStats): void {
    this.metricCards.set([
      {
        label: 'Documents archivés',
        value: stats.documentsTotal,
        trend: 0,
        hint: 'Total global',
        accent: 'primary',
      },
      {
        label: 'Demandes en cours',
        value: stats.documentsEnCours,
        trend: 0,
        hint: 'Documents non validés',
        accent: 'warning',
      },
      {
        label: 'Étudiants actifs',
        value: stats.etudiantsActifs,
        trend: 0,
        hint: 'Tous profils',
        accent: 'info',
      },
      {
        label: 'Classes disponibles',
        value: stats.classesTotal,
        trend: 0,
        hint: 'Réparties par filière',
        accent: 'success',
      },
    ]);

    this.volumeSeries.set(stats.volumeMensuel.map(point => ({ month: point.label, value: point.value })));
    this.statusSlices.set(stats.statutDocuments.map(slice => ({ label: slice.label, value: slice.value, color: slice.color })));
    this.timeline.set(
      stats.activites.map(item => ({
        title: item.title,
        detail: item.detail,
        time: new Date(item.time).toLocaleDateString(),
        status: ((item.status ?? 'info') as TimelineItem['status']),
      }))
    );
  }

  private setFallbackStats(): void {
    this.metricCards.set([
      { label: 'Documents archivés', value: 0, trend: 0, hint: 'Total global', accent: 'primary' },
      { label: 'Demandes en cours', value: 0, trend: 0, hint: 'Documents non validés', accent: 'warning' },
      { label: 'Étudiants actifs', value: 0, trend: 0, hint: 'Tous profils', accent: 'info' },
      { label: 'Classes disponibles', value: 0, trend: 0, hint: 'Réparties par filière', accent: 'success' },
    ]);
    this.volumeSeries.set([]);
    this.statusSlices.set([]);
    this.timeline.set([]);
  }

  donutBackground = computed(() => {
    const slices = this.statusSlices();
    if (!slices.length) {
      return 'conic-gradient(#e5e5e5 0 100%)';
    }
    const total = slices.reduce((acc, slice) => acc + slice.value, 0) || 1;
    let current = 0;
    const gradients: string[] = [];
    slices.forEach(slice => {
      const start = (current / total) * 100;
      current += slice.value;
      const end = (current / total) * 100;
      gradients.push(`${slice.color} ${start}% ${end}%`);
    });
    return `conic-gradient(${gradients.join(', ')})`;
  });

  totalAlerts = computed(() => this.timeline().filter(item => item.status === 'warning').length);

  totalRequests = computed(() => this.statusSlices().reduce((acc, slice) => acc + slice.value, 0));
}
