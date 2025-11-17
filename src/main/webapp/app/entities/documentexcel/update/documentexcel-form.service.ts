import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IDocumentexcel, NewDocumentexcel } from '../documentexcel.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDocumentexcel for edit and NewDocumentexcelFormGroupInput for create.
 */
type DocumentexcelFormGroupInput = IDocumentexcel | PartialWithRequiredKeyOf<NewDocumentexcel>;

type DocumentexcelFormDefaults = Pick<NewDocumentexcel, 'id'>;

type DocumentexcelFormGroupContent = {
  id: FormControl<IDocumentexcel['id'] | NewDocumentexcel['id']>;
  excel: FormControl<IDocumentexcel['excel']>;
  excelContentType: FormControl<IDocumentexcel['excelContentType']>;
};

export type DocumentexcelFormGroup = FormGroup<DocumentexcelFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DocumentexcelFormService {
  createDocumentexcelFormGroup(documentexcel: DocumentexcelFormGroupInput = { id: null }): DocumentexcelFormGroup {
    const documentexcelRawValue = {
      ...this.getFormDefaults(),
      ...documentexcel,
    };
    return new FormGroup<DocumentexcelFormGroupContent>({
      id: new FormControl(
        { value: documentexcelRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      excel: new FormControl(documentexcelRawValue.excel),
      excelContentType: new FormControl(documentexcelRawValue.excelContentType),
    });
  }

  getDocumentexcel(form: DocumentexcelFormGroup): IDocumentexcel | NewDocumentexcel {
    return form.getRawValue() as IDocumentexcel | NewDocumentexcel;
  }

  resetForm(form: DocumentexcelFormGroup, documentexcel: DocumentexcelFormGroupInput): void {
    const documentexcelRawValue = { ...this.getFormDefaults(), ...documentexcel };
    form.reset(
      {
        ...documentexcelRawValue,
        id: { value: documentexcelRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): DocumentexcelFormDefaults {
    return {
      id: null,
    };
  }
}
