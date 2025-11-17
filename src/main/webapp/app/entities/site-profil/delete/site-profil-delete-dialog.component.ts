import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ISiteProfil } from '../site-profil.model';
import { SiteProfilService } from '../service/site-profil.service';

@Component({
  templateUrl: './site-profil-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class SiteProfilDeleteDialogComponent {
  siteProfil?: ISiteProfil;

  protected siteProfilService = inject(SiteProfilService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.siteProfilService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
