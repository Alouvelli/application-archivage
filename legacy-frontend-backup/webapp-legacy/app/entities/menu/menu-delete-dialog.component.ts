import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from './menu.service';

@Component({
  selector: 'jhi-menu-delete-dialog',
  standalone: true,
  templateUrl: './menu-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class MenuDeleteDialogComponent {
  menu?: IMenu;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(private readonly menuService: MenuService, public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.menuService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
