import { i18n, I18N_KEY } from 'i18n';

export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
  localStorage.setItem(I18N_KEY, language);
};
