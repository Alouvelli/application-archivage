import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IApplication } from 'app/shared/model/application.model';
import { ApplicationService } from './application.service';

@Component({
  selector: 'jhi-application-delete-dialog',
  standalone: true,
  templateUrl: './application-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class ApplicationDeleteDialogComponent {
  application?: IApplication;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly applicationService: ApplicationService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.applicationService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
