import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IClasse } from 'app/shared/model/classe.model';
import { ClasseService } from './classe.service';

@Component({
  selector: 'jhi-classe-delete-dialog',
  standalone: true,
  templateUrl: './classe-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class ClasseDeleteDialogComponent {
  classe?: IClasse;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly classeService: ClasseService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.classeService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
