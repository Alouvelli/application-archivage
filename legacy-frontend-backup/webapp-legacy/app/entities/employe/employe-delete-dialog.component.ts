import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IEmploye } from 'app/shared/model/employe.model';
import { EmployeService } from './employe.service';

@Component({
  selector: 'jhi-employe-delete-dialog',
  standalone: true,
  templateUrl: './employe-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class EmployeDeleteDialogComponent {
  employe?: IEmploye;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly employeService: EmployeService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.employeService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
