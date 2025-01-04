import { appEnvKey } from '@shared/configs/configs/config';

export const setUserSession = (key: string, value: string) => {
  const env = appEnvKey();

  window.sessionStorage.setItem(env + key, value);
};
