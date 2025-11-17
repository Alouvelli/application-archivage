import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRubrique, NewRubrique } from '../rubrique.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRubrique for edit and NewRubriqueFormGroupInput for create.
 */
type RubriqueFormGroupInput = IRubrique | PartialWithRequiredKeyOf<NewRubrique>;

type RubriqueFormDefaults = Pick<NewRubrique, 'id'>;

type RubriqueFormGroupContent = {
  id: FormControl<IRubrique['id'] | NewRubrique['id']>;
  libelleRubrique: FormControl<IRubrique['libelleRubrique']>;
  rangRubrique: FormControl<IRubrique['rangRubrique']>;
  iconeRubrique: FormControl<IRubrique['iconeRubrique']>;
  etatRubrique: FormControl<IRubrique['etatRubrique']>;
  rang: FormControl<IRubrique['rang']>;
  module: FormControl<IRubrique['module']>;
};

export type RubriqueFormGroup = FormGroup<RubriqueFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RubriqueFormService {
  createRubriqueFormGroup(rubrique: RubriqueFormGroupInput = { id: null }): RubriqueFormGroup {
    const rubriqueRawValue = {
      ...this.getFormDefaults(),
      ...rubrique,
    };
    return new FormGroup<RubriqueFormGroupContent>({
      id: new FormControl(
        { value: rubriqueRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      libelleRubrique: new FormControl(rubriqueRawValue.libelleRubrique),
      rangRubrique: new FormControl(rubriqueRawValue.rangRubrique),
      iconeRubrique: new FormControl(rubriqueRawValue.iconeRubrique),
      etatRubrique: new FormControl(rubriqueRawValue.etatRubrique),
      rang: new FormControl(rubriqueRawValue.rang),
      module: new FormControl(rubriqueRawValue.module),
    });
  }

  getRubrique(form: RubriqueFormGroup): IRubrique | NewRubrique {
    return form.getRawValue() as IRubrique | NewRubrique;
  }

  resetForm(form: RubriqueFormGroup, rubrique: RubriqueFormGroupInput): void {
    const rubriqueRawValue = { ...this.getFormDefaults(), ...rubrique };
    form.reset(
      {
        ...rubriqueRawValue,
        id: { value: rubriqueRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RubriqueFormDefaults {
    return {
      id: null,
    };
  }
}
