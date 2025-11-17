import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ISiteProfil } from '../site-profil.model';

@Component({
  selector: 'jhi-site-profil-detail',
  templateUrl: './site-profil-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class SiteProfilDetailComponent {
  siteProfil = input<ISiteProfil | null>(null);

  previousState(): void {
    window.history.back();
  }
}
