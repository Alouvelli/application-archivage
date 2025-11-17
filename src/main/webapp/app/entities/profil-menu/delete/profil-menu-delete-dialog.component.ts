import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IProfilMenu } from '../profil-menu.model';
import { ProfilMenuService } from '../service/profil-menu.service';

@Component({
  templateUrl: './profil-menu-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class ProfilMenuDeleteDialogComponent {
  profilMenu?: IProfilMenu;

  protected profilMenuService = inject(ProfilMenuService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.profilMenuService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
