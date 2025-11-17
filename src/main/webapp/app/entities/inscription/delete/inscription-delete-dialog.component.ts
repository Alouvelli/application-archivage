import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IInscription } from '../inscription.model';
import { InscriptionService } from '../service/inscription.service';

@Component({
  templateUrl: './inscription-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class InscriptionDeleteDialogComponent {
  inscription?: IInscription;

  protected inscriptionService = inject(InscriptionService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.inscriptionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
