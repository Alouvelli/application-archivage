import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IClasse, NewClasse } from '../classe.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IClasse for edit and NewClasseFormGroupInput for create.
 */
type ClasseFormGroupInput = IClasse | PartialWithRequiredKeyOf<NewClasse>;

type ClasseFormDefaults = Pick<NewClasse, 'id' | 'etat'>;

type ClasseFormGroupContent = {
  id: FormControl<IClasse['id'] | NewClasse['id']>;
  description: FormControl<IClasse['description']>;
  etat: FormControl<IClasse['etat']>;
  code: FormControl<IClasse['code']>;
  libelle: FormControl<IClasse['libelle']>;
  filiere: FormControl<IClasse['filiere']>;
  niveau: FormControl<IClasse['niveau']>;
};

export type ClasseFormGroup = FormGroup<ClasseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ClasseFormService {
  createClasseFormGroup(classe: ClasseFormGroupInput = { id: null }): ClasseFormGroup {
    const classeRawValue = {
      ...this.getFormDefaults(),
      ...classe,
    };
    return new FormGroup<ClasseFormGroupContent>({
      id: new FormControl(
        { value: classeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      description: new FormControl(classeRawValue.description),
      etat: new FormControl(classeRawValue.etat),
      code: new FormControl(classeRawValue.code, {
        validators: [Validators.required],
      }),
      libelle: new FormControl(classeRawValue.libelle, {
        validators: [Validators.required],
      }),
      filiere: new FormControl(classeRawValue.filiere),
      niveau: new FormControl(classeRawValue.niveau),
    });
  }

  getClasse(form: ClasseFormGroup): IClasse | NewClasse {
    return form.getRawValue() as IClasse | NewClasse;
  }

  resetForm(form: ClasseFormGroup, classe: ClasseFormGroupInput): void {
    const classeRawValue = { ...this.getFormDefaults(), ...classe };
    form.reset(
      {
        ...classeRawValue,
        id: { value: classeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): ClasseFormDefaults {
    return {
      id: null,
      etat: false,
    };
  }
}
