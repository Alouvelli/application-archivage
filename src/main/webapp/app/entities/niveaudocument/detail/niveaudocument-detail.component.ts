import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { INiveaudocument } from '../niveaudocument.model';

@Component({
  selector: 'jhi-niveaudocument-detail',
  templateUrl: './niveaudocument-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class NiveaudocumentDetailComponent {
  niveaudocument = input<INiveaudocument | null>(null);

  previousState(): void {
    window.history.back();
  }
}
