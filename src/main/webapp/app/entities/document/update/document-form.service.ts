import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDocument, NewDocument } from '../document.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocument for edit and NewDocumentFormGroupInput for create.
 */
type DocumentFormGroupInput = IDocument | PartialWithRequiredKeyOf<NewDocument>;

type DocumentFormDefaults = Pick<NewDocument, 'id' | 'etat'>;

type DocumentFormGroupContent = {
  id: FormControl<IDocument['id'] | NewDocument['id']>;
  etat: FormControl<IDocument['etat']>;
  document1: FormControl<IDocument['document1']>;
  document1ContentType: FormControl<IDocument['document1ContentType']>;
  document2: FormControl<IDocument['document2']>;
  ref: FormControl<IDocument['ref']>;
  typeDocument: FormControl<IDocument['typeDocument']>;
};

export type DocumentFormGroup = FormGroup<DocumentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentFormService {
  createDocumentFormGroup(document: DocumentFormGroupInput = { id: null }): DocumentFormGroup {
    const documentRawValue = {
      ...this.getFormDefaults(),
      ...document,
    };
    return new FormGroup<DocumentFormGroupContent>({
      id: new FormControl(
        { value: documentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      etat: new FormControl(documentRawValue.etat),
      document1: new FormControl(documentRawValue.document1),
      document1ContentType: new FormControl(documentRawValue.document1ContentType),
      document2: new FormControl(documentRawValue.document2),
      ref: new FormControl(documentRawValue.ref),
      typeDocument: new FormControl(documentRawValue.typeDocument),
    });
  }

  getDocument(form: DocumentFormGroup): IDocument | NewDocument {
    return form.getRawValue() as IDocument | NewDocument;
  }

  resetForm(form: DocumentFormGroup, document: DocumentFormGroupInput): void {
    const documentRawValue = { ...this.getFormDefaults(), ...document };
    form.reset(
      {
        ...documentRawValue,
        id: { value: documentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DocumentFormDefaults {
    return {
      id: null,
      etat: false,
    };
  }
}
