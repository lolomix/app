import i18n from "i18next";
import { format, formatDistance } from "date-fns";
import { de, enUS, fr, it } from "date-fns/locale";
import transEn from "./i18n/en/translation";
import { initReactI18next } from "react-i18next";

const dateLang = {
  en: enUS,
  de: de,
  fr: fr,
  it: it,
};

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18nextdate-xhr-backend
  //.use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  //.use(LanguageDetector)
  // pass the i18n instance to the react-i18next components.
  // Alternative use the I18nextProvider: https://react.i18next.com/components/i18nextprovider
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: "en",
    cleanCode: true,
    lowerCaseLng: true,
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      format: function (value, formatting, lng) {
        var makedate = (value) => {
          if (value instanceof Date) {
            return value;
          } else {
            var d = new Date(0);
            d.setUTCSeconds(value);
            return d;
          }
        };
        var now = new Date();
        switch (formatting) {
          case "distance":
            switch (lng) {
              case "de":
                value = makedate(value);
                return (
                  (value.getTime() > now.getTime() ? "in " : "vor ") +
                  formatDistance(value, now, {
                    locale: dateLang[lng],
                  })
                );
              case "en":
              default:
                value = makedate(value);
                return (
                  formatDistance(value, now, {
                    locale: dateLang[lng],
                  }) + (value.getTime() > now.getTime() ? " remaining" : " ago")
                );
            }
          case "date":
            return format(makedate(value), "dd.MM.yyyy", {
              locale: dateLang[lng],
            });
          case "datetime":
            return format(makedate(value), "dd.MM.yyyy hh:mm", {
              locale: dateLang[lng],
            });
          default:
            if (value instanceof Date)
              return format(value, formatting, { locale: dateLang[lng] });
            else return value;
        }
      },
    },
    keySeparator: ".",
    react: {
      wait: true,
    },
    resources: {
      en: { translation: transEn },
    },
  });

export default i18n;
