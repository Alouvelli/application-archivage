import { enableProdMode } from '@angular/core';
import { environment } from '../../../environments/environment';

export function ProdConfig() {
    // disable debug data on prod profile to improve performance
    if (!environment.DEBUG_INFO_ENABLED) {
        enableProdMode();
    }
}
