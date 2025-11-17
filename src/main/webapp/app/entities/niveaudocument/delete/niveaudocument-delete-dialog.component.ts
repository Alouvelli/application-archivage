import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INiveaudocument } from '../niveaudocument.model';
import { NiveaudocumentService } from '../service/niveaudocument.service';

@Component({
  templateUrl: './niveaudocument-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NiveaudocumentDeleteDialogComponent {
  niveaudocument?: INiveaudocument;

  protected niveaudocumentService = inject(NiveaudocumentService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveaudocumentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
