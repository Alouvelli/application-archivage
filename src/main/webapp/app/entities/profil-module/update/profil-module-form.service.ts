import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProfilModule, NewProfilModule } from '../profil-module.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProfilModule for edit and NewProfilModuleFormGroupInput for create.
 */
type ProfilModuleFormGroupInput = IProfilModule | PartialWithRequiredKeyOf<NewProfilModule>;

type ProfilModuleFormDefaults = Pick<NewProfilModule, 'id' | 'encours'>;

type ProfilModuleFormGroupContent = {
  id: FormControl<IProfilModule['id'] | NewProfilModule['id']>;
  encours: FormControl<IProfilModule['encours']>;
  profil: FormControl<IProfilModule['profil']>;
  module: FormControl<IProfilModule['module']>;
  siteProfil: FormControl<IProfilModule['siteProfil']>;
};

export type ProfilModuleFormGroup = FormGroup<ProfilModuleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProfilModuleFormService {
  createProfilModuleFormGroup(profilModule: ProfilModuleFormGroupInput = { id: null }): ProfilModuleFormGroup {
    const profilModuleRawValue = {
      ...this.getFormDefaults(),
      ...profilModule,
    };
    return new FormGroup<ProfilModuleFormGroupContent>({
      id: new FormControl(
        { value: profilModuleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      encours: new FormControl(profilModuleRawValue.encours),
      profil: new FormControl(profilModuleRawValue.profil),
      module: new FormControl(profilModuleRawValue.module),
      siteProfil: new FormControl(profilModuleRawValue.siteProfil),
    });
  }

  getProfilModule(form: ProfilModuleFormGroup): IProfilModule | NewProfilModule {
    return form.getRawValue() as IProfilModule | NewProfilModule;
  }

  resetForm(form: ProfilModuleFormGroup, profilModule: ProfilModuleFormGroupInput): void {
    const profilModuleRawValue = { ...this.getFormDefaults(), ...profilModule };
    form.reset(
      {
        ...profilModuleRawValue,
        id: { value: profilModuleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProfilModuleFormDefaults {
    return {
      id: null,
      encours: false,
    };
  }
}
