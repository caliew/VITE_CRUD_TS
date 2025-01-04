import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { changeDocumentLanguage } from '@shared/utils/multiLanguage';

enum LanguageCode {
  en = 'en',
  zh = 'zh',
  ms = 'ms',
  ta = 'ta',
}
const DEFAULT_LANG = LanguageCode.en;
const ORIG_LANG_KEY = 'orgLng';
const I18N_KEY = 'languageCode';

const supportedLngs = {
  [LanguageCode.en]: 'English',
  [LanguageCode.zh]: 'Chinese',
  [LanguageCode.ms]: 'Malay',
  [LanguageCode.ta]: 'Tamil',
};

const backendOptions = {
  loadPath: `/i18n/{{lng}}/{{ns}}.json`,
  defaultns: 'translation',
};

i18n
  .use(initReactI18next)
  .use(HttpApi)
  .init({
    supportedLngs: Object.keys(supportedLngs), // only allow supported languages to be detected
    fallbackLng: LanguageCode.en,
    fallbackNS: 'translation', // fallback translation file
    backend: backendOptions,
  });

i18n.on('languageChanged', (lang) => {
  changeDocumentLanguage(lang);
});

export { i18n, LanguageCode, DEFAULT_LANG, ORIG_LANG_KEY, I18N_KEY };
