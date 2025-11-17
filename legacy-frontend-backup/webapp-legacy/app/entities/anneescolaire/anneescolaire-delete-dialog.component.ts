import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBan, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';

import { IAnneescolaire } from 'app/shared/model/anneescolaire.model';
import { AnneescolaireService } from './anneescolaire.service';

@Component({
  selector: 'jhi-anneescolaire-delete-dialog',
  standalone: true,
  templateUrl: './anneescolaire-delete-dialog.component.html',
  imports: [CommonModule, TranslateModule, FontAwesomeModule]
})
export class AnneescolaireDeleteDialogComponent {
  anneescolaire?: IAnneescolaire;

  protected readonly faBan = faBan;
  protected readonly faTrash = faTrash;

  constructor(
    private readonly anneescolaireService: AnneescolaireService,
    public activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id?: number): void {
    if (id === undefined) {
      return;
    }
    this.anneescolaireService.delete(id).subscribe(() => this.activeModal.close('deleted'));
  }
}
