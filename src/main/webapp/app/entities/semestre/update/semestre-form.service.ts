import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISemestre, NewSemestre } from '../semestre.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISemestre for edit and NewSemestreFormGroupInput for create.
 */
type SemestreFormGroupInput = ISemestre | PartialWithRequiredKeyOf<NewSemestre>;

type SemestreFormDefaults = Pick<NewSemestre, 'id'>;

type SemestreFormGroupContent = {
  id: FormControl<ISemestre['id'] | NewSemestre['id']>;
  libelle: FormControl<ISemestre['libelle']>;
  etat: FormControl<ISemestre['etat']>;
};

export type SemestreFormGroup = FormGroup<SemestreFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SemestreFormService {
  createSemestreFormGroup(semestre: SemestreFormGroupInput = { id: null }): SemestreFormGroup {
    const semestreRawValue = {
      ...this.getFormDefaults(),
      ...semestre,
    };
    return new FormGroup<SemestreFormGroupContent>({
      id: new FormControl(
        { value: semestreRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      libelle: new FormControl(semestreRawValue.libelle),
      etat: new FormControl(semestreRawValue.etat),
    });
  }

  getSemestre(form: SemestreFormGroup): ISemestre | NewSemestre {
    return form.getRawValue() as ISemestre | NewSemestre;
  }

  resetForm(form: SemestreFormGroup, semestre: SemestreFormGroupInput): void {
    const semestreRawValue = { ...this.getFormDefaults(), ...semestre };
    form.reset(
      {
        ...semestreRawValue,
        id: { value: semestreRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SemestreFormDefaults {
    return {
      id: null,
    };
  }
}
