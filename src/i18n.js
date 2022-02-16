import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { format, formatDistance } from "date-fns";
import { de, enUS, fr, it } from "date-fns/locale";
import enTranslation from "./i18n/en/translation";
import enContract from "./i18n/en/contract";

const dateLang = {
  en: enUS,
  de: de,
  fr: fr,
  it: it,
};

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: "en",
    fallbackLng: "en",
    resources: {
      en: {
        translation: enTranslation,
        contract: enContract,
      },
    },
    cleanCode: true,
    lowerCaseLng: true,
    debug: false,
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      // @todo abstract this mess below and make sure the app uses it
      format: function (value, formatting, lng) {
        let makedate = (value) => {
          if (value instanceof Date) {
            return value;
          } else {
            var d = new Date(0);
            d.setUTCSeconds(value);
            return d;
          }
        };
        let now = new Date();
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
  });

export default i18n;
