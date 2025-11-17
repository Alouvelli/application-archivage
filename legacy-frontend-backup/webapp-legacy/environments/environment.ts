declare const __VERSION__: string | undefined;
declare const SERVER_API_URL: string | undefined;

export const environment = {
  VERSION: typeof __VERSION__ === 'string' ? __VERSION__ : undefined,
  DEBUG_INFO_ENABLED: false,
  SERVER_API_URL: typeof SERVER_API_URL === 'string' ? SERVER_API_URL : '/',
};
