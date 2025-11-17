import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IProfilModule } from '../profil-module.model';

@Component({
  selector: 'jhi-profil-module-detail',
  templateUrl: './profil-module-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ProfilModuleDetailComponent {
  profilModule = input<IProfilModule | null>(null);

  previousState(): void {
    window.history.back();
  }
}
