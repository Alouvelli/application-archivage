import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ISiteProfil, NewSiteProfil } from '../site-profil.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ISiteProfil for edit and NewSiteProfilFormGroupInput for create.
 */
type SiteProfilFormGroupInput = ISiteProfil | PartialWithRequiredKeyOf<NewSiteProfil>;

type SiteProfilFormDefaults = Pick<NewSiteProfil, 'id' | 'encours'>;

type SiteProfilFormGroupContent = {
  id: FormControl<ISiteProfil['id'] | NewSiteProfil['id']>;
  encours: FormControl<ISiteProfil['encours']>;
  site: FormControl<ISiteProfil['site']>;
  profil: FormControl<ISiteProfil['profil']>;
};

export type SiteProfilFormGroup = FormGroup<SiteProfilFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class SiteProfilFormService {
  createSiteProfilFormGroup(siteProfil: SiteProfilFormGroupInput = { id: null }): SiteProfilFormGroup {
    const siteProfilRawValue = {
      ...this.getFormDefaults(),
      ...siteProfil,
    };
    return new FormGroup<SiteProfilFormGroupContent>({
      id: new FormControl(
        { value: siteProfilRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      encours: new FormControl(siteProfilRawValue.encours),
      site: new FormControl(siteProfilRawValue.site),
      profil: new FormControl(siteProfilRawValue.profil),
    });
  }

  getSiteProfil(form: SiteProfilFormGroup): ISiteProfil | NewSiteProfil {
    return form.getRawValue() as ISiteProfil | NewSiteProfil;
  }

  resetForm(form: SiteProfilFormGroup, siteProfil: SiteProfilFormGroupInput): void {
    const siteProfilRawValue = { ...this.getFormDefaults(), ...siteProfil };
    form.reset(
      {
        ...siteProfilRawValue,
        id: { value: siteProfilRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): SiteProfilFormDefaults {
    return {
      id: null,
      encours: false,
    };
  }
}
