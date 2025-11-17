declare const SERVER_API_URL: string | undefined;

export const environment = {
  VERSION: 'DEV',
  DEBUG_INFO_ENABLED: true,
  SERVER_API_URL: typeof SERVER_API_URL === 'string' ? SERVER_API_URL : 'http://localhost:8082/',
};
