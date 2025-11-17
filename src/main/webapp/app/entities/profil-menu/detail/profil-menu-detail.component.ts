import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IProfilMenu } from '../profil-menu.model';

@Component({
  selector: 'jhi-profil-menu-detail',
  templateUrl: './profil-menu-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ProfilMenuDetailComponent {
  profilMenu = input<IProfilMenu | null>(null);

  previousState(): void {
    window.history.back();
  }
}
