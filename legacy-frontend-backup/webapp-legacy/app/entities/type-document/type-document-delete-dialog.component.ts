import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { ITypeDocument } from 'app/shared/model/type-document.model';
import { TypeDocumentService } from './type-document.service';

@Component({
  selector: 'jhi-type-document-delete-dialog',
  standalone: true,
  templateUrl: './type-document-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class TypeDocumentDeleteDialogComponent {
  typeDocument?: ITypeDocument;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly typeDocumentService: TypeDocumentService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.typeDocumentService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
