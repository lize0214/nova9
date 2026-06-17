import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import i18n, { getCurrentLanguage, LANG_KEY, renderTemplate, setCurrentLanguage } from './i18n/index.js';
import mainTemplate from './templates/main.html?raw';
import { bootstrapLegacyModules } from './bootstrapLegacy.js';

export default function App() {
    const [lang, setLang] = useState(() => getCurrentLanguage());
    const [langSwitchHost, setLangSwitchHost] = useState(null);

    const template = useMemo(() => renderTemplate(mainTemplate, lang), [lang]);

    useEffect(() => {
        document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
        i18n.changeLanguage(lang);
        document.title = i18n.t('meta.title');

        const description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute('content', i18n.t('meta.description'));

        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription) ogDescription.setAttribute('content', i18n.t('meta.description'));
    }, [lang]);

    useEffect(() => {
        bootstrapLegacyModules();
        if (window.lucide?.createIcons) {
            window.lucide.createIcons();
        }
    }, []);

    useEffect(() => {
        setLangSwitchHost(document.getElementById('langSwitchHost'));
    }, []);

    function handleLanguageChange(nextLanguage) {
        if (nextLanguage === lang) return;

        setCurrentLanguage(nextLanguage);
        setLang(nextLanguage);
        window.location.reload();
    }

    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: template }} />
            {langSwitchHost && createPortal(
                <div className="inline-flex overflow-hidden rounded-full border border-amber-300/60 bg-black/80 backdrop-blur">
                    <button
                        type="button"
                        onClick={() => handleLanguageChange('en')}
                        className={`px-3 py-1.5 text-xs font-semibold ${lang === 'en' ? 'bg-amber-500/25 text-amber-100' : 'text-amber-200/80'}`}
                    >
                        {i18n.t('common.languageEnglish')}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleLanguageChange('zh')}
                        className={`px-3 py-1.5 text-xs font-semibold ${lang === 'zh' ? 'bg-amber-500/25 text-amber-100' : 'text-amber-200/80'}`}
                    >
                        {i18n.t('common.languageChinese')}
                    </button>
                </div>,
                langSwitchHost
            )}
        </>
    );
}
