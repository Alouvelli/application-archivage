import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAnneescolaire } from '../anneescolaire.model';
import { AnneescolaireService } from '../service/anneescolaire.service';

@Component({
  templateUrl: './anneescolaire-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AnneescolaireDeleteDialogComponent {
  anneescolaire?: IAnneescolaire;

  protected anneescolaireService = inject(AnneescolaireService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.anneescolaireService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
