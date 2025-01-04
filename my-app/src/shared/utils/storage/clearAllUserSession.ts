import { persistor } from '@shared/stores';

export const clearAllUserSession = () => {
  persistor.pause();
  persistor.purge();

  window.sessionStorage.clear();
  window.localStorage.clear();
};
