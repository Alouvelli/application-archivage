import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDocumentclasse, NewDocumentclasse } from '../documentclasse.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocumentclasse for edit and NewDocumentclasseFormGroupInput for create.
 */
type DocumentclasseFormGroupInput = IDocumentclasse | PartialWithRequiredKeyOf<NewDocumentclasse>;

type DocumentclasseFormDefaults = Pick<NewDocumentclasse, 'id'>;

type DocumentclasseFormGroupContent = {
  id: FormControl<IDocumentclasse['id'] | NewDocumentclasse['id']>;
  document1: FormControl<IDocumentclasse['document1']>;
  document1ContentType: FormControl<IDocumentclasse['document1ContentType']>;
  ref: FormControl<IDocumentclasse['ref']>;
  nomdocument: FormControl<IDocumentclasse['nomdocument']>;
  classe: FormControl<IDocumentclasse['classe']>;
  semestre: FormControl<IDocumentclasse['semestre']>;
};

export type DocumentclasseFormGroup = FormGroup<DocumentclasseFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentclasseFormService {
  createDocumentclasseFormGroup(documentclasse: DocumentclasseFormGroupInput = { id: null }): DocumentclasseFormGroup {
    const documentclasseRawValue = {
      ...this.getFormDefaults(),
      ...documentclasse,
    };
    return new FormGroup<DocumentclasseFormGroupContent>({
      id: new FormControl(
        { value: documentclasseRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      document1: new FormControl(documentclasseRawValue.document1),
      document1ContentType: new FormControl(documentclasseRawValue.document1ContentType),
      ref: new FormControl(documentclasseRawValue.ref),
      nomdocument: new FormControl(documentclasseRawValue.nomdocument),
      classe: new FormControl(documentclasseRawValue.classe),
      semestre: new FormControl(documentclasseRawValue.semestre),
    });
  }

  getDocumentclasse(form: DocumentclasseFormGroup): IDocumentclasse | NewDocumentclasse {
    return form.getRawValue() as IDocumentclasse | NewDocumentclasse;
  }

  resetForm(form: DocumentclasseFormGroup, documentclasse: DocumentclasseFormGroupInput): void {
    const documentclasseRawValue = { ...this.getFormDefaults(), ...documentclasse };
    form.reset(
      {
        ...documentclasseRawValue,
        id: { value: documentclasseRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DocumentclasseFormDefaults {
    return {
      id: null,
    };
  }
}
