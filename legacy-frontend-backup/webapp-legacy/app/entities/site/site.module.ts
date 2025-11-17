import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { siteRoute } from './site.route';

@NgModule({
  imports: [RouterModule.forChild(siteRoute)]
})
export class GestionEcoleSiteModule {}
