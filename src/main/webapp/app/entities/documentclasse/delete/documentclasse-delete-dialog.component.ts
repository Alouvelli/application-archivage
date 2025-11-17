import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDocumentclasse } from '../documentclasse.model';
import { DocumentclasseService } from '../service/documentclasse.service';

@Component({
  templateUrl: './documentclasse-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DocumentclasseDeleteDialogComponent {
  documentclasse?: IDocumentclasse;

  protected documentclasseService = inject(DocumentclasseService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentclasseService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
