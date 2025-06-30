import { DOM } from '../utils/dom-helpers.js';

export class LanguageManager {
    constructor(langData, chartManager) {
        this.langData = langData;
        this.chartManager = chartManager;
        this.currentLang = 'en';
        
        this.initLanguageToggle();
    }
    
    initLanguageToggle() {
        DOM.findAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.dataset.lang);
            });
        });
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        
        // Update all text elements
        DOM.findAll('[data-lang-key]').forEach(el => {
            const key = el.dataset.langKey;
            if (this.langData[lang] && this.langData[lang][key]) {
                el.innerHTML = this.langData[lang][key];
            }
        });
        
        // Update button states
        DOM.findAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update charts
        if (this.chartManager) {
            this.chartManager.updateLanguage(lang);
        }
        
        // Update quote hints
        const quoteHintEn = DOM.findById('quote-hint-en');
        const quoteHintZh = DOM.findById('quote-hint-zh');
        if (quoteHintEn) quoteHintEn.style.display = lang === 'en' ? 'block' : 'none';
        if (quoteHintZh) quoteHintZh.style.display = lang === 'zh' ? 'block' : 'none';
    }
}
