export const changeDocumentLanguage = (lang: string) => {
  if (document.documentElement.classList.contains(`language-${document.documentElement.lang}`)) {
    document.documentElement.classList.replace(`language-${document.documentElement.lang}`, `language-${lang}`);
  } else {
    document.documentElement.classList.add(`language-${lang}`);
  }

  document.documentElement.lang = lang;
};
