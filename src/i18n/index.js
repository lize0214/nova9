import i18next from 'i18next';
import en from './locales/en.js';
import zh from './locales/zh.js';

export const LANG_KEY = 'nova9-lang';

const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en', 'zh'];
const LANGUAGE_LOCALES = {
    en: 'en-SG',
    zh: 'zh-CN'
};

export function getCurrentLanguage() {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

    const storedLanguage = window.localStorage.getItem(LANG_KEY);
    return SUPPORTED_LANGUAGES.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
}

export function setCurrentLanguage(lang) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LANG_KEY, SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE);
}

export function getLanguageLocale(lang = i18next.resolvedLanguage || i18next.language) {
    return LANGUAGE_LOCALES[SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE];
}

export async function initI18n() {
    if (i18next.isInitialized) return i18next;

    await i18next.init({
        resources: {
            en: { translation: en },
            zh: { translation: zh }
        },
        lng: getCurrentLanguage(),
        fallbackLng: DEFAULT_LANGUAGE,
        supportedLngs: SUPPORTED_LANGUAGES,
        interpolation: {
            escapeValue: false
        }
    });

    return i18next;
}

export function renderTemplate(template, lang = getCurrentLanguage()) {
    const translator = i18next.getFixedT(lang);

    return template.replace(/\{\{\s*([\w.-]+)\s*\}\}/g, (_, key) => {
        return translator(key, { defaultValue: key });
    });
}

export default i18next;
