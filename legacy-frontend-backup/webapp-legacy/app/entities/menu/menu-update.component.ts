import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MenuService } from './menu.service';
import { RubriqueService } from 'app/entities/rubrique/rubrique.service';
import { IMenu, Menu } from 'app/shared/model/menu.model';
import { IRubrique } from 'app/shared/model/rubrique.model';

@Component({
  selector: 'jhi-menu-update',
  standalone: true,
  templateUrl: './menu-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class MenuUpdateComponent implements OnInit {
  isSaving = false;
  menu: IMenu | null = null;

  rubriques: IRubrique[] = [];

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    codeMenu: ['', [Validators.required, Validators.maxLength(50)]],
    libelleMenu: ['', [Validators.required, Validators.maxLength(100)]],
    rangMenu: [''],
    urlMenu: [''],
    iconeMenu: [''],
    etatMenu: [1],
    rubriqueId: [null, Validators.required]
  });

  constructor(
    private readonly menuService: MenuService,
    private readonly rubriqueService: RubriqueService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ menu }) => {
        this.menu = menu ?? null;
        if (menu) {
          this.updateForm(menu);
        }
        this.loadRubriques();
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const menu = this.createFromForm();
    const save$ = menu.id !== undefined ? this.menuService.update(menu) : this.menuService.create(menu);

    save$
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled by global interceptor
        }
      });
  }

  private loadRubriques(): void {
    this.rubriqueService
      .query()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: HttpResponse<IRubrique[]>) => {
        const rubriques = res.body ?? [];
        if (this.menu?.rubrique && !rubriques.find(r => r.id === this.menu!.rubrique!.id)) {
          rubriques.push(this.menu.rubrique);
        }
        this.rubriques = rubriques;
      });
  }

  private updateForm(menu: IMenu): void {
    this.editForm.reset({
      id: { value: menu.id ?? null, disabled: true },
      codeMenu: menu.codeMenu ?? '',
      libelleMenu: menu.libelleMenu ?? '',
      rangMenu: menu.rangMenu ?? '',
      urlMenu: menu.urlMenu ?? '',
      iconeMenu: menu.iconeMenu ?? '',
      etatMenu: menu.etatMenu ?? 1,
      rubriqueId: menu.rubrique?.id ?? null
    });
  }

  private createFromForm(): IMenu {
    const rawValue = this.editForm.getRawValue();
    const rubrique = this.rubriques.find(option => option.id === rawValue.rubriqueId);
    return new Menu(
      rawValue.id ?? undefined,
      rawValue.codeMenu ?? undefined,
      rawValue.libelleMenu ?? undefined,
      rawValue.rangMenu ?? undefined,
      rawValue.urlMenu ?? undefined,
      rawValue.iconeMenu ?? undefined,
      rawValue.etatMenu ?? 1,
      undefined,
      rubrique
    );
  }
}
