import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IInscription, NewInscription } from '../inscription.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInscription for edit and NewInscriptionFormGroupInput for create.
 */
type InscriptionFormGroupInput = IInscription | PartialWithRequiredKeyOf<NewInscription>;

type InscriptionFormDefaults = Pick<NewInscription, 'id' | 'manquant' | 'documents'>;

type InscriptionFormGroupContent = {
  id: FormControl<IInscription['id'] | NewInscription['id']>;
  date: FormControl<IInscription['date']>;
  manquant: FormControl<IInscription['manquant']>;
  etudiant: FormControl<IInscription['etudiant']>;
  classe: FormControl<IInscription['classe']>;
  anneescolaire: FormControl<IInscription['anneescolaire']>;
  documents: FormControl<IInscription['documents']>;
};

export type InscriptionFormGroup = FormGroup<InscriptionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InscriptionFormService {
  createInscriptionFormGroup(inscription: InscriptionFormGroupInput = { id: null }): InscriptionFormGroup {
    const inscriptionRawValue = {
      ...this.getFormDefaults(),
      ...inscription,
    };
    return new FormGroup<InscriptionFormGroupContent>({
      id: new FormControl(
        { value: inscriptionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      date: new FormControl(inscriptionRawValue.date),
      manquant: new FormControl(inscriptionRawValue.manquant),
      etudiant: new FormControl(inscriptionRawValue.etudiant),
      classe: new FormControl(inscriptionRawValue.classe),
      anneescolaire: new FormControl(inscriptionRawValue.anneescolaire),
      documents: new FormControl(inscriptionRawValue.documents ?? []),
    });
  }

  getInscription(form: InscriptionFormGroup): IInscription | NewInscription {
    return form.getRawValue() as IInscription | NewInscription;
  }

  resetForm(form: InscriptionFormGroup, inscription: InscriptionFormGroupInput): void {
    const inscriptionRawValue = { ...this.getFormDefaults(), ...inscription };
    form.reset(
      {
        ...inscriptionRawValue,
        id: { value: inscriptionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InscriptionFormDefaults {
    return {
      id: null,
      manquant: false,
      documents: [],
    };
  }
}
