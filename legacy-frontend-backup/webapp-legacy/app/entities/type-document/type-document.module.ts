import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { typeDocumentRoute } from './type-document.route';

@NgModule({
  imports: [RouterModule.forChild(typeDocumentRoute)]
})
export class GestionEcoleTypeDocumentModule {}
