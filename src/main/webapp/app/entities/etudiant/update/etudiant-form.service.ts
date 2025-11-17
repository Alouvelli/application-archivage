import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IEtudiant, NewEtudiant } from '../etudiant.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEtudiant for edit and NewEtudiantFormGroupInput for create.
 */
type EtudiantFormGroupInput = IEtudiant | PartialWithRequiredKeyOf<NewEtudiant>;

type EtudiantFormDefaults = Pick<NewEtudiant, 'id' | 'etat'>;

type EtudiantFormGroupContent = {
  id: FormControl<IEtudiant['id'] | NewEtudiant['id']>;
  nom: FormControl<IEtudiant['nom']>;
  prenom: FormControl<IEtudiant['prenom']>;
  dateNaissance: FormControl<IEtudiant['dateNaissance']>;
  tel: FormControl<IEtudiant['tel']>;
  email: FormControl<IEtudiant['email']>;
  adresse: FormControl<IEtudiant['adresse']>;
  etat: FormControl<IEtudiant['etat']>;
  matricule: FormControl<IEtudiant['matricule']>;
};

export type EtudiantFormGroup = FormGroup<EtudiantFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EtudiantFormService {
  createEtudiantFormGroup(etudiant: EtudiantFormGroupInput = { id: null }): EtudiantFormGroup {
    const etudiantRawValue = {
      ...this.getFormDefaults(),
      ...etudiant,
    };
    return new FormGroup<EtudiantFormGroupContent>({
      id: new FormControl(
        { value: etudiantRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      nom: new FormControl(etudiantRawValue.nom, {
        validators: [Validators.required],
      }),
      prenom: new FormControl(etudiantRawValue.prenom, {
        validators: [Validators.required],
      }),
      dateNaissance: new FormControl(etudiantRawValue.dateNaissance),
      tel: new FormControl(etudiantRawValue.tel),
      email: new FormControl(etudiantRawValue.email),
      adresse: new FormControl(etudiantRawValue.adresse),
      etat: new FormControl(etudiantRawValue.etat),
      matricule: new FormControl(etudiantRawValue.matricule, {
        validators: [Validators.required],
      }),
    });
  }

  getEtudiant(form: EtudiantFormGroup): IEtudiant | NewEtudiant {
    return form.getRawValue() as IEtudiant | NewEtudiant;
  }

  resetForm(form: EtudiantFormGroup, etudiant: EtudiantFormGroupInput): void {
    const etudiantRawValue = { ...this.getFormDefaults(), ...etudiant };
    form.reset(
      {
        ...etudiantRawValue,
        id: { value: etudiantRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): EtudiantFormDefaults {
    return {
      id: null,
      etat: false,
    };
  }
}
