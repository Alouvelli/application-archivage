import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { INiveaudocument, NewNiveaudocument } from '../niveaudocument.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts INiveaudocument for edit and NewNiveaudocumentFormGroupInput for create.
 */
type NiveaudocumentFormGroupInput = INiveaudocument | PartialWithRequiredKeyOf<NewNiveaudocument>;

type NiveaudocumentFormDefaults = Pick<NewNiveaudocument, 'id' | 'etat'>;

type NiveaudocumentFormGroupContent = {
  id: FormControl<INiveaudocument['id'] | NewNiveaudocument['id']>;
  etat: FormControl<INiveaudocument['etat']>;
  niveau: FormControl<INiveaudocument['niveau']>;
  document: FormControl<INiveaudocument['document']>;
};

export type NiveaudocumentFormGroup = FormGroup<NiveaudocumentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class NiveaudocumentFormService {
  createNiveaudocumentFormGroup(niveaudocument: NiveaudocumentFormGroupInput = { id: null }): NiveaudocumentFormGroup {
    const niveaudocumentRawValue = {
      ...this.getFormDefaults(),
      ...niveaudocument,
    };
    return new FormGroup<NiveaudocumentFormGroupContent>({
      id: new FormControl(
        { value: niveaudocumentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      etat: new FormControl(niveaudocumentRawValue.etat),
      niveau: new FormControl(niveaudocumentRawValue.niveau),
      document: new FormControl(niveaudocumentRawValue.document),
    });
  }

  getNiveaudocument(form: NiveaudocumentFormGroup): INiveaudocument | NewNiveaudocument {
    return form.getRawValue() as INiveaudocument | NewNiveaudocument;
  }

  resetForm(form: NiveaudocumentFormGroup, niveaudocument: NiveaudocumentFormGroupInput): void {
    const niveaudocumentRawValue = { ...this.getFormDefaults(), ...niveaudocument };
    form.reset(
      {
        ...niveaudocumentRawValue,
        id: { value: niveaudocumentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): NiveaudocumentFormDefaults {
    return {
      id: null,
      etat: false,
    };
  }
}
