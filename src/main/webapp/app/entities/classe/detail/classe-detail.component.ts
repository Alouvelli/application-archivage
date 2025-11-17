import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { IClasse } from '../classe.model';

@Component({
  selector: 'jhi-classe-detail',
  templateUrl: './classe-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class ClasseDetailComponent {
  classe = input<IClasse | null>(null);

  previousState(): void {
    window.history.back();
  }
}
