import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { environment } from '../environments/environment';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: () => import('./admin/admin.module').then(m => m.GestionEcoleAdminModule)
                },
                {
                    path: 'entities',
                    loadChildren: () => import('./entities/entity.module').then(m => m.GestionEcoleEntityModule)
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: environment.DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class GestionEcoleAppRoutingModule {}
