import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IEcole, NewEcole } from '../ecole.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEcole for edit and NewEcoleFormGroupInput for create.
 */
type EcoleFormGroupInput = IEcole | PartialWithRequiredKeyOf<NewEcole>;

type EcoleFormDefaults = Pick<NewEcole, 'id'>;

type EcoleFormGroupContent = {
  id: FormControl<IEcole['id'] | NewEcole['id']>;
  codeEcole: FormControl<IEcole['codeEcole']>;
  logoEcole: FormControl<IEcole['logoEcole']>;
  enteteEcole: FormControl<IEcole['enteteEcole']>;
  basPageEcole: FormControl<IEcole['basPageEcole']>;
  nineaEcole: FormControl<IEcole['nineaEcole']>;
  adresseEcole: FormControl<IEcole['adresseEcole']>;
  telephoneEcole: FormControl<IEcole['telephoneEcole']>;
  emailEcole: FormControl<IEcole['emailEcole']>;
  sigleEcole: FormControl<IEcole['sigleEcole']>;
  faxEcole: FormControl<IEcole['faxEcole']>;
  etatEcole: FormControl<IEcole['etatEcole']>;
  encours: FormControl<IEcole['encours']>;
  rang: FormControl<IEcole['rang']>;
  application: FormControl<IEcole['application']>;
};

export type EcoleFormGroup = FormGroup<EcoleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EcoleFormService {
  createEcoleFormGroup(ecole: EcoleFormGroupInput = { id: null }): EcoleFormGroup {
    const ecoleRawValue = {
      ...this.getFormDefaults(),
      ...ecole,
    };
    return new FormGroup<EcoleFormGroupContent>({
      id: new FormControl(
        { value: ecoleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codeEcole: new FormControl(ecoleRawValue.codeEcole),
      logoEcole: new FormControl(ecoleRawValue.logoEcole),
      enteteEcole: new FormControl(ecoleRawValue.enteteEcole),
      basPageEcole: new FormControl(ecoleRawValue.basPageEcole),
      nineaEcole: new FormControl(ecoleRawValue.nineaEcole),
      adresseEcole: new FormControl(ecoleRawValue.adresseEcole),
      telephoneEcole: new FormControl(ecoleRawValue.telephoneEcole),
      emailEcole: new FormControl(ecoleRawValue.emailEcole),
      sigleEcole: new FormControl(ecoleRawValue.sigleEcole),
      faxEcole: new FormControl(ecoleRawValue.faxEcole),
      etatEcole: new FormControl(ecoleRawValue.etatEcole),
      encours: new FormControl(ecoleRawValue.encours),
      rang: new FormControl(ecoleRawValue.rang),
      application: new FormControl(ecoleRawValue.application),
    });
  }

  getEcole(form: EcoleFormGroup): IEcole | NewEcole {
    return form.getRawValue() as IEcole | NewEcole;
  }

  resetForm(form: EcoleFormGroup, ecole: EcoleFormGroupInput): void {
    const ecoleRawValue = { ...this.getFormDefaults(), ...ecole };
    form.reset(
      {
        ...ecoleRawValue,
        id: { value: ecoleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EcoleFormDefaults {
    return {
      id: null,
    };
  }
}
