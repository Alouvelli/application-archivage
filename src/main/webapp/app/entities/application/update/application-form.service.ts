import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IApplication, NewApplication } from '../application.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IApplication for edit and NewApplicationFormGroupInput for create.
 */
type ApplicationFormGroupInput = IApplication | PartialWithRequiredKeyOf<NewApplication>;

type ApplicationFormDefaults = Pick<NewApplication, 'id'>;

type ApplicationFormGroupContent = {
  id: FormControl<IApplication['id'] | NewApplication['id']>;
  nomApplication: FormControl<IApplication['nomApplication']>;
  versionApplication: FormControl<IApplication['versionApplication']>;
  logoApplication: FormControl<IApplication['logoApplication']>;
  coutApplication: FormControl<IApplication['coutApplication']>;
  dateVente: FormControl<IApplication['dateVente']>;
  maintenance: FormControl<IApplication['maintenance']>;
  contratMaintenance: FormControl<IApplication['contratMaintenance']>;
  dateDebut: FormControl<IApplication['dateDebut']>;
  dateFin: FormControl<IApplication['dateFin']>;
  etatApplication: FormControl<IApplication['etatApplication']>;
};

export type ApplicationFormGroup = FormGroup<ApplicationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ApplicationFormService {
  createApplicationFormGroup(application: ApplicationFormGroupInput = { id: null }): ApplicationFormGroup {
    const applicationRawValue = {
      ...this.getFormDefaults(),
      ...application,
    };
    return new FormGroup<ApplicationFormGroupContent>({
      id: new FormControl(
        { value: applicationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nomApplication: new FormControl(applicationRawValue.nomApplication),
      versionApplication: new FormControl(applicationRawValue.versionApplication),
      logoApplication: new FormControl(applicationRawValue.logoApplication),
      coutApplication: new FormControl(applicationRawValue.coutApplication),
      dateVente: new FormControl(applicationRawValue.dateVente),
      maintenance: new FormControl(applicationRawValue.maintenance),
      contratMaintenance: new FormControl(applicationRawValue.contratMaintenance),
      dateDebut: new FormControl(applicationRawValue.dateDebut),
      dateFin: new FormControl(applicationRawValue.dateFin),
      etatApplication: new FormControl(applicationRawValue.etatApplication),
    });
  }

  getApplication(form: ApplicationFormGroup): IApplication | NewApplication {
    return form.getRawValue() as IApplication | NewApplication;
  }

  resetForm(form: ApplicationFormGroup, application: ApplicationFormGroupInput): void {
    const applicationRawValue = { ...this.getFormDefaults(), ...application };
    form.reset(
      {
        ...applicationRawValue,
        id: { value: applicationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ApplicationFormDefaults {
    return {
      id: null,
    };
  }
}
