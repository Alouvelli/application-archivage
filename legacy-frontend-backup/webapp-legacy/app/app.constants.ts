// src/main/webapp/app/app.constants.ts
// Ces constantes sont normalement injectées par webpack (via DefinePlugin) dans un projet JHipster.
// Si tu n'utilises pas la config webpack fournie, remplace l'usage par les fichiers environment (recommended for Angular CLI).

import { environment } from '../environments/environment';
import { Employe } from './shared/model/employe.model';

type ProcessEnv = Record<string, string | boolean | undefined>;

const processEnv: ProcessEnv =
  typeof process !== 'undefined' && process?.env ? (process.env as ProcessEnv) : {};

const normalizeBoolean = (value: string | boolean | undefined): boolean | undefined => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return undefined;
};

export const VERSION: string | undefined = (processEnv.VERSION as string | undefined) ?? environment.VERSION;
export const DEBUG_INFO_ENABLED: boolean =
  normalizeBoolean(processEnv.DEBUG_INFO_ENABLED) ?? environment.DEBUG_INFO_ENABLED;

// Ajouter le slash final est pratique pour startsWith et concatener des chemins
const rawServerApiUrl =
  (processEnv.SERVER_API_URL as string | undefined) ?? environment.SERVER_API_URL ?? window.location.origin;
export const SERVER_API_URL: string = rawServerApiUrl.endsWith('/') ? rawServerApiUrl : `${rawServerApiUrl}/`;

export const BUILD_TIMESTAMP: string | undefined = processEnv.BUILD_TIMESTAMP as string | undefined;

// variables d'application
export let isLogin: boolean = true;
export let anneeScolaire: string = '2025/2026';

// IMPORTANT: si tu utilises strictNullChecks, typer comme Employe | null
export let userCurrent: Employe | null = null;
