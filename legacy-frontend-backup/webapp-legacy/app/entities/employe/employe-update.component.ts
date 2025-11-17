import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faSave } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { finalize, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EmployeService } from './employe.service';
import { IEmploye, Employe } from 'app/shared/model/employe.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IProfil } from 'app/shared/model/profil.model';
import { ProfilService } from 'app/entities/profil/profil.service';

@Component({
  selector: 'jhi-employe-update',
  standalone: true,
  templateUrl: './employe-update.component.html',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FontAwesomeModule]
})
export class EmployeUpdateComponent implements OnInit {
  isSaving = false;
  employe: IEmploye | null = null;

  users: IUser[] = [];
  profils: IProfil[] = [];

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faSave = faSave;

  private readonly destroyRef = inject(DestroyRef);
  private readonly fb = inject(FormBuilder);

  editForm = this.fb.group({
    id: [{ value: null, disabled: true }],
    telUtilisateur: ['', [Validators.required, Validators.maxLength(50)]],
    etatUtilisateur: [0],
    userId: [null, Validators.required],
    profilId: [null, Validators.required]
  });

  constructor(
    private readonly employeService: EmployeService,
    private readonly userService: UserService,
    private readonly profilService: ProfilService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ employe }) => {
        this.employe = employe ?? null;
        if (employe) {
          this.updateForm(employe);
        }
        this.loadRelationshipsOptions();
      });
  }

  previousState(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  save(): void {
    this.isSaving = true;
    const employe = this.createFromForm();
    const save$ = employe.id !== undefined ? this.employeService.update(employe) : this.employeService.create(employe);

    save$
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => (this.isSaving = false)))
      .subscribe({
        next: () => this.previousState(),
        error: () => {
          // handled globally
        }
      });
  }

  private updateForm(employe: IEmploye): void {
    this.editForm.reset({
      id: { value: employe.id ?? null, disabled: true },
      telUtilisateur: employe.telUtilisateur ?? '',
      etatUtilisateur: employe.etatUtilisateur ?? 0,
      userId: employe.user?.id ?? null,
      profilId: employe.profil?.id ?? null
    });
  }

  private loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(
        map((res: HttpResponse<IUser[]>) => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(users => {
        if (this.employe?.user && !users.find(user => user.id === this.employe!.user!.id)) {
          users.push(this.employe.user);
        }
        this.users = users;
      });

    this.profilService
      .query()
      .pipe(
        map((res: HttpResponse<IProfil[]>) => res.body ?? []),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(profils => {
        if (this.employe?.profil && !profils.find(profil => profil.id === this.employe!.profil!.id)) {
          profils.push(this.employe.profil);
        }
        this.profils = profils;
      });
  }

  private createFromForm(): IEmploye {
    const rawValue = this.editForm.getRawValue();
    const user = this.users.find(option => option.id === rawValue.userId);
    const profil = this.profils.find(option => option.id === rawValue.profilId);

    return new Employe(
      rawValue.id ?? undefined,
      rawValue.telUtilisateur ?? undefined,
      rawValue.etatUtilisateur ?? undefined,
      user,
      profil
    );
  }
}
