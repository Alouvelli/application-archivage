import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { INiveau } from '../niveau.model';
import { NiveauService } from '../service/niveau.service';

@Component({
  templateUrl: './niveau-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class NiveauDeleteDialogComponent {
  niveau?: INiveau;

  protected niveauService = inject(NiveauService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.niveauService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
