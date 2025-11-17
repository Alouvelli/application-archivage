import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IProfilMenu, NewProfilMenu } from '../profil-menu.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IProfilMenu for edit and NewProfilMenuFormGroupInput for create.
 */
type ProfilMenuFormGroupInput = IProfilMenu | PartialWithRequiredKeyOf<NewProfilMenu>;

type ProfilMenuFormDefaults = Pick<NewProfilMenu, 'id'>;

type ProfilMenuFormGroupContent = {
  id: FormControl<IProfilMenu['id'] | NewProfilMenu['id']>;
  voir: FormControl<IProfilMenu['voir']>;
  ajouter: FormControl<IProfilMenu['ajouter']>;
  supprimer: FormControl<IProfilMenu['supprimer']>;
  modifier: FormControl<IProfilMenu['modifier']>;
  imprimer: FormControl<IProfilMenu['imprimer']>;
  profil: FormControl<IProfilMenu['profil']>;
  menu: FormControl<IProfilMenu['menu']>;
  rubriqueProfil: FormControl<IProfilMenu['rubriqueProfil']>;
};

export type ProfilMenuFormGroup = FormGroup<ProfilMenuFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ProfilMenuFormService {
  createProfilMenuFormGroup(profilMenu: ProfilMenuFormGroupInput = { id: null }): ProfilMenuFormGroup {
    const profilMenuRawValue = {
      ...this.getFormDefaults(),
      ...profilMenu,
    };
    return new FormGroup<ProfilMenuFormGroupContent>({
      id: new FormControl(
        { value: profilMenuRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      voir: new FormControl(profilMenuRawValue.voir),
      ajouter: new FormControl(profilMenuRawValue.ajouter),
      supprimer: new FormControl(profilMenuRawValue.supprimer),
      modifier: new FormControl(profilMenuRawValue.modifier),
      imprimer: new FormControl(profilMenuRawValue.imprimer),
      profil: new FormControl(profilMenuRawValue.profil),
      menu: new FormControl(profilMenuRawValue.menu),
      rubriqueProfil: new FormControl(profilMenuRawValue.rubriqueProfil),
    });
  }

  getProfilMenu(form: ProfilMenuFormGroup): IProfilMenu | NewProfilMenu {
    return form.getRawValue() as IProfilMenu | NewProfilMenu;
  }

  resetForm(form: ProfilMenuFormGroup, profilMenu: ProfilMenuFormGroupInput): void {
    const profilMenuRawValue = { ...this.getFormDefaults(), ...profilMenu };
    form.reset(
      {
        ...profilMenuRawValue,
        id: { value: profilMenuRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ProfilMenuFormDefaults {
    return {
      id: null,
    };
  }
}
