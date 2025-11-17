import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRubrique } from 'app/entities/rubrique/rubrique.model';
import { RubriqueService } from 'app/entities/rubrique/service/rubrique.service';
import { IMenu } from '../menu.model';
import { MenuService } from '../service/menu.service';
import { MenuFormGroup, MenuFormService } from './menu-form.service';

@Component({
  selector: 'jhi-menu-update',
  templateUrl: './menu-update.component.html',
  styleUrl: './menu-update.component.scss',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class MenuUpdateComponent implements OnInit {
  isSaving = false;
  menu: IMenu | null = null;

  rubriquesSharedCollection: IRubrique[] = [];

  protected menuService = inject(MenuService);
  protected menuFormService = inject(MenuFormService);
  protected rubriqueService = inject(RubriqueService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: MenuFormGroup = this.menuFormService.createMenuFormGroup();

  compareRubrique = (o1: IRubrique | null, o2: IRubrique | null): boolean => this.rubriqueService.compareRubrique(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ menu }) => {
      this.menu = menu;
      if (menu) {
        this.updateForm(menu);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const menu = this.menuFormService.getMenu(this.editForm);
    if (menu.id !== null) {
      this.subscribeToSaveResponse(this.menuService.update(menu));
    } else {
      this.subscribeToSaveResponse(this.menuService.create(menu));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMenu>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(menu: IMenu): void {
    this.menu = menu;
    this.menuFormService.resetForm(this.editForm, menu);

    this.rubriquesSharedCollection = this.rubriqueService.addRubriqueToCollectionIfMissing<IRubrique>(
      this.rubriquesSharedCollection,
      menu.rubrique,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.rubriqueService
      .query()
      .pipe(map((res: HttpResponse<IRubrique[]>) => res.body ?? []))
      .pipe(
        map((rubriques: IRubrique[]) => this.rubriqueService.addRubriqueToCollectionIfMissing<IRubrique>(rubriques, this.menu?.rubrique)),
      )
      .subscribe((rubriques: IRubrique[]) => (this.rubriquesSharedCollection = rubriques));
  }
}
