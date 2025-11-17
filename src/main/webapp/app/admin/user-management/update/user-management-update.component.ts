import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import SharedModule from 'app/shared/shared.module';
import { LANGUAGES } from 'app/config/language.constants';
import { IUser } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';

const userTemplate = {} as IUser;

const newUser: IUser = {
  langKey: 'fr',
  activated: true,
} as IUser;

@Component({
  selector: 'jhi-user-mgmt-update',
  templateUrl: './user-management-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export default class UserManagementUpdateComponent implements OnInit {
  languages = LANGUAGES;
  authorities = signal<string[]>([]);
  isSaving = signal(false);

  editForm = new FormGroup({
    id: new FormControl(userTemplate.id ?? null),
    login: new FormControl(userTemplate.login, {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
      ],
    }),
    firstName: new FormControl(userTemplate.firstName, { validators: [Validators.maxLength(50)] }),
    lastName: new FormControl(userTemplate.lastName, { validators: [Validators.maxLength(50)] }),
    email: new FormControl(userTemplate.email, {
      nonNullable: true,
      validators: [Validators.minLength(5), Validators.maxLength(254), Validators.email],
    }),
    activated: new FormControl(userTemplate.activated, { nonNullable: true }),
    langKey: new FormControl(userTemplate.langKey, { nonNullable: true }),
    authorities: new FormControl(userTemplate.authorities, { nonNullable: true }),
  });

  private readonly userService = inject(UserManagementService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.data.subscribe(({ user }) => {
      if (user) {
        this.editForm.reset(user);
      } else {
        this.editForm.reset(newUser);
      }
    });
    this.userService.authorities().subscribe(authorities => this.authorities.set(authorities));
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving.set(true);
    const user = this.editForm.getRawValue();
    const isUpdate = user.id != null;
    const request$ = isUpdate ? this.userService.update(user) : this.userService.create(user);

    request$.subscribe({
      next: () => this.onSaveSuccess(isUpdate),
      error: () => this.onSaveError(),
    });
  }

  private onSaveSuccess(isUpdate: boolean): void {
    this.isSaving.set(false);
    Swal.fire({
      icon: 'success',
      title: isUpdate ? 'Utilisateur mis à jour' : 'Utilisateur créé',
      timer: 1800,
      showConfirmButton: false,
    }).then(() => this.previousState());
  }

  private onSaveError(): void {
    this.isSaving.set(false);
    Swal.fire({
      icon: 'error',
      title: 'Une erreur est survenue',
      text: 'Merci de vérifier les informations saisies.',
    });
  }
}
