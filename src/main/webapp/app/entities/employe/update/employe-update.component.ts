import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/service/user.service';
import { IProfil } from 'app/entities/profil/profil.model';
import { ProfilService } from 'app/entities/profil/service/profil.service';
import { EmployeService } from '../service/employe.service';
import { IEmploye } from '../employe.model';
import { EmployeFormGroup, EmployeFormService } from './employe-form.service';

@Component({
  selector: 'jhi-employe-update',
  templateUrl: './employe-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class EmployeUpdateComponent implements OnInit {
  isSaving = false;
  employe: IEmploye | null = null;

  usersSharedCollection: IUser[] = [];
  profilsSharedCollection: IProfil[] = [];

  protected employeService = inject(EmployeService);
  protected employeFormService = inject(EmployeFormService);
  protected userService = inject(UserService);
  protected profilService = inject(ProfilService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: EmployeFormGroup = this.employeFormService.createEmployeFormGroup();

  compareUser = (o1: IUser | null, o2: IUser | null): boolean => this.userService.compareUser(o1, o2);

  compareProfil = (o1: IProfil | null, o2: IProfil | null): boolean => this.profilService.compareProfil(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ employe }) => {
      this.employe = employe;
      if (employe) {
        this.updateForm(employe);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const employe = this.employeFormService.getEmploye(this.editForm);
    if (employe.id !== null) {
      this.subscribeToSaveResponse(this.employeService.update(employe));
    } else {
      this.subscribeToSaveResponse(this.employeService.create(employe));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmploye>>): void {
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

  protected updateForm(employe: IEmploye): void {
    this.employe = employe;
    this.employeFormService.resetForm(this.editForm, employe);

    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing<IUser>(this.usersSharedCollection, employe.user);
    this.profilsSharedCollection = this.profilService.addProfilToCollectionIfMissing<IProfil>(this.profilsSharedCollection, employe.profil);
  }

  protected loadRelationshipsOptions(): void {
    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing<IUser>(users, this.employe?.user)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));

    this.profilService
      .query()
      .pipe(map((res: HttpResponse<IProfil[]>) => res.body ?? []))
      .pipe(map((profils: IProfil[]) => this.profilService.addProfilToCollectionIfMissing<IProfil>(profils, this.employe?.profil)))
      .subscribe((profils: IProfil[]) => (this.profilsSharedCollection = profils));
  }
}
