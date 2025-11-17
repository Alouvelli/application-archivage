import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEcole } from '../ecole.model';
import { EcoleService } from '../service/ecole.service';

@Component({
  templateUrl: './ecole-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EcoleDeleteDialogComponent {
  ecole?: IEcole;

  protected ecoleService = inject(EcoleService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ecoleService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
