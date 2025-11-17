import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { INiveau } from '../niveau.model';

@Component({
  selector: 'jhi-niveau-detail',
  templateUrl: './niveau-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class NiveauDetailComponent {
  niveau = input<INiveau | null>(null);

  previousState(): void {
    window.history.back();
  }
}
