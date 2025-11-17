import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IModule, NewModule } from '../module.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IModule for edit and NewModuleFormGroupInput for create.
 */
type ModuleFormGroupInput = IModule | PartialWithRequiredKeyOf<NewModule>;

type ModuleFormDefaults = Pick<NewModule, 'id' | 'sites'>;

type ModuleFormGroupContent = {
  id: FormControl<IModule['id'] | NewModule['id']>;
  libelleModule: FormControl<IModule['libelleModule']>;
  logoModule: FormControl<IModule['logoModule']>;
  etatModule: FormControl<IModule['etatModule']>;
  rang: FormControl<IModule['rang']>;
  sites: FormControl<IModule['sites']>;
};

export type ModuleFormGroup = FormGroup<ModuleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ModuleFormService {
  createModuleFormGroup(module: ModuleFormGroupInput = { id: null }): ModuleFormGroup {
    const moduleRawValue = {
      ...this.getFormDefaults(),
      ...module,
    };
    return new FormGroup<ModuleFormGroupContent>({
      id: new FormControl(
        { value: moduleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      libelleModule: new FormControl(moduleRawValue.libelleModule),
      logoModule: new FormControl(moduleRawValue.logoModule),
      etatModule: new FormControl(moduleRawValue.etatModule),
      rang: new FormControl(moduleRawValue.rang),
      sites: new FormControl(moduleRawValue.sites ?? []),
    });
  }

  getModule(form: ModuleFormGroup): IModule | NewModule {
    return form.getRawValue() as IModule | NewModule;
  }

  resetForm(form: ModuleFormGroup, module: ModuleFormGroupInput): void {
    const moduleRawValue = { ...this.getFormDefaults(), ...module };
    form.reset(
      {
        ...moduleRawValue,
        id: { value: moduleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ModuleFormDefaults {
    return {
      id: null,
      sites: [],
    };
  }
}
