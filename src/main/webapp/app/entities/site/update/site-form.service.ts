import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISite, NewSite } from '../site.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISite for edit and NewSiteFormGroupInput for create.
 */
type SiteFormGroupInput = ISite | PartialWithRequiredKeyOf<NewSite>;

type SiteFormDefaults = Pick<NewSite, 'id' | 'modules'>;

type SiteFormGroupContent = {
  id: FormControl<ISite['id'] | NewSite['id']>;
  codeSite: FormControl<ISite['codeSite']>;
  logoSite: FormControl<ISite['logoSite']>;
  enteteSite: FormControl<ISite['enteteSite']>;
  basPageSite: FormControl<ISite['basPageSite']>;
  nineaSite: FormControl<ISite['nineaSite']>;
  adresseSite: FormControl<ISite['adresseSite']>;
  telephone: FormControl<ISite['telephone']>;
  emailSite: FormControl<ISite['emailSite']>;
  sigleSite: FormControl<ISite['sigleSite']>;
  faxEcole: FormControl<ISite['faxEcole']>;
  etatSite: FormControl<ISite['etatSite']>;
  encours: FormControl<ISite['encours']>;
  rang: FormControl<ISite['rang']>;
  ecole: FormControl<ISite['ecole']>;
  modules: FormControl<ISite['modules']>;
};

export type SiteFormGroup = FormGroup<SiteFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SiteFormService {
  createSiteFormGroup(site: SiteFormGroupInput = { id: null }): SiteFormGroup {
    const siteRawValue = {
      ...this.getFormDefaults(),
      ...site,
    };
    return new FormGroup<SiteFormGroupContent>({
      id: new FormControl(
        { value: siteRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      codeSite: new FormControl(siteRawValue.codeSite),
      logoSite: new FormControl(siteRawValue.logoSite),
      enteteSite: new FormControl(siteRawValue.enteteSite),
      basPageSite: new FormControl(siteRawValue.basPageSite),
      nineaSite: new FormControl(siteRawValue.nineaSite),
      adresseSite: new FormControl(siteRawValue.adresseSite),
      telephone: new FormControl(siteRawValue.telephone),
      emailSite: new FormControl(siteRawValue.emailSite),
      sigleSite: new FormControl(siteRawValue.sigleSite),
      faxEcole: new FormControl(siteRawValue.faxEcole),
      etatSite: new FormControl(siteRawValue.etatSite),
      encours: new FormControl(siteRawValue.encours),
      rang: new FormControl(siteRawValue.rang),
      ecole: new FormControl(siteRawValue.ecole),
      modules: new FormControl(siteRawValue.modules ?? []),
    });
  }

  getSite(form: SiteFormGroup): ISite | NewSite {
    return form.getRawValue() as ISite | NewSite;
  }

  resetForm(form: SiteFormGroup, site: SiteFormGroupInput): void {
    const siteRawValue = { ...this.getFormDefaults(), ...site };
    form.reset(
      {
        ...siteRawValue,
        id: { value: siteRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SiteFormDefaults {
    return {
      id: null,
      modules: [],
    };
  }
}
