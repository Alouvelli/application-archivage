import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRubriqueProfil, NewRubriqueProfil } from '../rubrique-profil.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRubriqueProfil for edit and NewRubriqueProfilFormGroupInput for create.
 */
type RubriqueProfilFormGroupInput = IRubriqueProfil | PartialWithRequiredKeyOf<NewRubriqueProfil>;

type RubriqueProfilFormDefaults = Pick<NewRubriqueProfil, 'id' | 'encours'>;

type RubriqueProfilFormGroupContent = {
  id: FormControl<IRubriqueProfil['id'] | NewRubriqueProfil['id']>;
  encours: FormControl<IRubriqueProfil['encours']>;
  profil: FormControl<IRubriqueProfil['profil']>;
  rubrique: FormControl<IRubriqueProfil['rubrique']>;
  profilModule: FormControl<IRubriqueProfil['profilModule']>;
};

export type RubriqueProfilFormGroup = FormGroup<RubriqueProfilFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RubriqueProfilFormService {
  createRubriqueProfilFormGroup(rubriqueProfil: RubriqueProfilFormGroupInput = { id: null }): RubriqueProfilFormGroup {
    const rubriqueProfilRawValue = {
      ...this.getFormDefaults(),
      ...rubriqueProfil,
    };
    return new FormGroup<RubriqueProfilFormGroupContent>({
      id: new FormControl(
        { value: rubriqueProfilRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      encours: new FormControl(rubriqueProfilRawValue.encours),
      profil: new FormControl(rubriqueProfilRawValue.profil),
      rubrique: new FormControl(rubriqueProfilRawValue.rubrique),
      profilModule: new FormControl(rubriqueProfilRawValue.profilModule),
    });
  }

  getRubriqueProfil(form: RubriqueProfilFormGroup): IRubriqueProfil | NewRubriqueProfil {
    return form.getRawValue() as IRubriqueProfil | NewRubriqueProfil;
  }

  resetForm(form: RubriqueProfilFormGroup, rubriqueProfil: RubriqueProfilFormGroupInput): void {
    const rubriqueProfilRawValue = { ...this.getFormDefaults(), ...rubriqueProfil };
    form.reset(
      {
        ...rubriqueProfilRawValue,
        id: { value: rubriqueProfilRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RubriqueProfilFormDefaults {
    return {
      id: null,
      encours: false,
    };
  }
}
