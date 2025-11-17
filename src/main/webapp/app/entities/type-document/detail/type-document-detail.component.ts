import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { ITypeDocument } from '../type-document.model';

@Component({
  selector: 'jhi-type-document-detail',
  templateUrl: './type-document-detail.component.html',
  imports: [SharedModule, RouterModule],
})
export class TypeDocumentDetailComponent {
  typeDocument = input<ITypeDocument | null>(null);

  previousState(): void {
    window.history.back();
  }
}
