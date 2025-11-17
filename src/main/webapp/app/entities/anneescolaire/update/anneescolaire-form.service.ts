import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IAnneescolaire, NewAnneescolaire } from '../anneescolaire.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAnneescolaire for edit and NewAnneescolaireFormGroupInput for create.
 */
type AnneescolaireFormGroupInput = IAnneescolaire | PartialWithRequiredKeyOf<NewAnneescolaire>;

type AnneescolaireFormDefaults = Pick<NewAnneescolaire, 'id'>;

type AnneescolaireFormGroupContent = {
  id: FormControl<IAnneescolaire['id'] | NewAnneescolaire['id']>;
  libelle: FormControl<IAnneescolaire['libelle']>;
  encours: FormControl<IAnneescolaire['encours']>;
  etat: FormControl<IAnneescolaire['etat']>;
};

export type AnneescolaireFormGroup = FormGroup<AnneescolaireFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AnneescolaireFormService {
  createAnneescolaireFormGroup(anneescolaire: AnneescolaireFormGroupInput = { id: null }): AnneescolaireFormGroup {
    const anneescolaireRawValue = {
      ...this.getFormDefaults(),
      ...anneescolaire,
    };
    return new FormGroup<AnneescolaireFormGroupContent>({
      id: new FormControl(
        { value: anneescolaireRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      libelle: new FormControl(anneescolaireRawValue.libelle),
      encours: new FormControl(anneescolaireRawValue.encours),
      etat: new FormControl(anneescolaireRawValue.etat),
    });
  }

  getAnneescolaire(form: AnneescolaireFormGroup): IAnneescolaire | NewAnneescolaire {
    return form.getRawValue() as IAnneescolaire | NewAnneescolaire;
  }

  resetForm(form: AnneescolaireFormGroup, anneescolaire: AnneescolaireFormGroupInput): void {
    const anneescolaireRawValue = { ...this.getFormDefaults(), ...anneescolaire };
    form.reset(
      {
        ...anneescolaireRawValue,
        id: { value: anneescolaireRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): AnneescolaireFormDefaults {
    return {
      id: null,
    };
  }
}
