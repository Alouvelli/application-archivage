import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IDepartement } from 'app/shared/model/departement.model';
import { DepartementService } from './departement.service';

@Component({
  selector: 'jhi-departement-delete-dialog',
  standalone: true,
  templateUrl: './departement-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class DepartementDeleteDialogComponent {
  departement?: IDepartement;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly departementService: DepartementService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.departementService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
