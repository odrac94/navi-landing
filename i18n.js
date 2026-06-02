// Translation system for Navi Lyrics
class LanguageManager {
  constructor() {
    this.currentLanguage = this.getInitialLanguage();
    this.translations = {};
    this.init();
  }

  getInitialLanguage() {
    // Intenta obtener el idioma guardado
    const saved = localStorage.getItem('navi-language');
    if (saved) return saved;
    
    // Intenta detectar el idioma del navegador
    const browserLang = navigator.language.split('-')[0];
    return ['es', 'en'].includes(browserLang) ? browserLang : 'en';
  }

  async init() {
    try {
      const response = await fetch('translations.json');
      this.translations = await response.json();
      this.applyLanguage(this.currentLanguage);
      this.setupLanguageSwitcher();
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }

  setLanguage(lang) {
    if (['en', 'es'].includes(lang)) {
      this.currentLanguage = lang;
      localStorage.setItem('navi-language', lang);
      this.applyLanguage(lang);
    }
  }

  getText(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  }

  applyLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getText(key);
      element.textContent = text;
    });

    const attrElements = document.querySelectorAll('[data-i18n-attr]');
    attrElements.forEach(element => {
      const attrData = element.getAttribute('data-i18n-attr');
      const pairs = attrData.split('|');
      
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':');
        const text = this.getText(key);
        element.setAttribute(attr, text);
      });
    });

    // Actualizar indicador de idioma activo
    this.updateLanguageSwitcher();
  }

  setupLanguageSwitcher() {
    const switcher = document.getElementById('language-switcher');
    if (!switcher) return;

    const enBtn = switcher.querySelector('[data-lang="en"]');
    const esBtn = switcher.querySelector('[data-lang="es"]');

    if (enBtn) {
      enBtn.addEventListener('click', () => {
        this.setLanguage('en');
      });
    }

    if (esBtn) {
      esBtn.addEventListener('click', () => {
        this.setLanguage('es');
      });
    }

    this.updateLanguageSwitcher();
  }

  updateLanguageSwitcher() {
    const switcher = document.getElementById('language-switcher');
    if (!switcher) return;

    const enBtn = switcher.querySelector('[data-lang="en"]');
    const esBtn = switcher.querySelector('[data-lang="es"]');

    if (enBtn) {
      if (this.currentLanguage === 'en') {
        enBtn.classList.add('active');
        enBtn.classList.remove('inactive');
      } else {
        enBtn.classList.remove('active');
        enBtn.classList.add('inactive');
      }
    }

    if (esBtn) {
      if (this.currentLanguage === 'es') {
        esBtn.classList.add('active');
        esBtn.classList.remove('inactive');
      } else {
        esBtn.classList.remove('active');
        esBtn.classList.add('inactive');
      }
    }
  }
}

// Inicializar cuando el documento esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
  });
} else {
  window.languageManager = new LanguageManager();
}
