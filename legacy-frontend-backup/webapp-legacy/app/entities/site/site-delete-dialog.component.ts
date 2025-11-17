import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';

@Component({
  selector: 'jhi-site-delete-dialog',
  standalone: true,
  templateUrl: './site-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class SiteDeleteDialogComponent {
  site?: ISite;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly siteService: SiteService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.siteService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
