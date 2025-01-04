import { appEnvKey } from '@shared/configs/configs/config';

export const removeUserSession = (key: string) => {
  const env = appEnvKey();

  window.sessionStorage.removeItem(env + key);
};
