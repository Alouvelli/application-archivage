import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IFiliere } from 'app/shared/model/filiere.model';
import { FiliereService } from './filiere.service';

@Component({
  selector: 'jhi-filiere-delete-dialog',
  standalone: true,
  templateUrl: './filiere-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class FiliereDeleteDialogComponent {
  filiere?: IFiliere;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly filiereService: FiliereService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.filiereService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
