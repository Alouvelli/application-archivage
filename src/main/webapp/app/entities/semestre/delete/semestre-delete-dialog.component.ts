import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISemestre } from '../semestre.model';
import { SemestreService } from '../service/semestre.service';

@Component({
  templateUrl: './semestre-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SemestreDeleteDialogComponent {
  semestre?: ISemestre;

  protected semestreService = inject(SemestreService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.semestreService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
