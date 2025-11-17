import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { GestionEcoleAppModule } from './app/app.module';
import { environment } from './environments/environment';

import './app/vendor.ts';

if (!environment.DEBUG_INFO_ENABLED) {
  enableProdMode();
}

const bootstrap = () =>
  platformBrowserDynamic()
    .bootstrapModule(GestionEcoleAppModule, { preserveWhitespaces: true })
    .catch(err => console.error(err));

const hmr = (import.meta as unknown as { hot?: { accept(): void; dispose(cb: () => void): void } }).hot;

if (hmr) {
  hmr.accept();
  hmr.dispose(() => window.location.reload());
}

bootstrap();
