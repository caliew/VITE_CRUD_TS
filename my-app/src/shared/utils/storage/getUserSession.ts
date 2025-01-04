import { appEnvKey } from '@shared/configs/configs/config';

export const getUserSession = (key: string) => {
  const env = appEnvKey();

  const value = window.sessionStorage.getItem(env + key);

  return value || '';
};
