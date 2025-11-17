import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IEmploye, NewEmploye } from '../employe.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmploye for edit and NewEmployeFormGroupInput for create.
 */
type EmployeFormGroupInput = IEmploye | PartialWithRequiredKeyOf<NewEmploye>;

type EmployeFormDefaults = Pick<NewEmploye, 'id'>;

type EmployeFormGroupContent = {
  id: FormControl<IEmploye['id'] | NewEmploye['id']>;
  telUtilisateur: FormControl<IEmploye['telUtilisateur']>;
  etatUtilisateur: FormControl<IEmploye['etatUtilisateur']>;
  user: FormControl<IEmploye['user']>;
  profil: FormControl<IEmploye['profil']>;
};

export type EmployeFormGroup = FormGroup<EmployeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmployeFormService {
  createEmployeFormGroup(employe: EmployeFormGroupInput = { id: null }): EmployeFormGroup {
    const employeRawValue = {
      ...this.getFormDefaults(),
      ...employe,
    };
    return new FormGroup<EmployeFormGroupContent>({
      id: new FormControl(
        { value: employeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      telUtilisateur: new FormControl(employeRawValue.telUtilisateur),
      etatUtilisateur: new FormControl(employeRawValue.etatUtilisateur),
      user: new FormControl(employeRawValue.user),
      profil: new FormControl(employeRawValue.profil),
    });
  }

  getEmploye(form: EmployeFormGroup): IEmploye | NewEmploye {
    return form.getRawValue() as IEmploye | NewEmploye;
  }

  resetForm(form: EmployeFormGroup, employe: EmployeFormGroupInput): void {
    const employeRawValue = { ...this.getFormDefaults(), ...employe };
    form.reset(
      {
        ...employeRawValue,
        id: { value: employeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EmployeFormDefaults {
    return {
      id: null,
    };
  }
}
