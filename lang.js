let currentLang = 'en';
const translations = {};
const elements = [];

// Load translations and initialize
async function initI18n() {
  // Load translations
  const response = await fetch('translate.json');
  Object.assign(translations, await response.json());
  
  // Get all translatable elements
  elements.push(...document.querySelectorAll('[data-i18n]'));
  elements.push(...document.querySelectorAll('[data-i18n-attr]'));
  
  // Set initial language
  const savedLang = localStorage.getItem('lang');
  const browserLang = navigator.language.split('-')[0];
  const lang = savedLang || (['en', 'fr', 'ar'].includes(browserLang) ? browserLang : 'en');
  
  setLanguage(lang);
}

// Set language
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  // Update content
  elements.forEach(el => {
    const key = el.dataset.i18n || el.dataset.i18nAttr;
    const value = getNestedTranslation(translations[lang], key);
    
    if (el.dataset.i18n) {
      el.textContent = value;
    } else if (el.dataset.i18nAttr) {
      const attr = el.dataset.i18nAttr;
      el.setAttribute(attr, value);
    }
  });
  
  // Handle RTL
  document.body.classList.toggle('rtl', lang === 'ar');
  document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
}

// Helper to get nested translations
function getNestedTranslation(obj, path) {
  return path.split('.').reduce((o, p) => o?.[p], obj) || `[${path}]`;
}

// Language switcher
function createLanguageSwitcher() {
  const container = document.createElement('div');
  container.className = 'language-switcher';
  container.innerHTML = `
    <button data-lang="en">EN</button>
    <button data-lang="fr">FR</button>
    <button data-lang="ar">AR</button>
  `;
  
  container.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
      setLanguage(e.target.dataset.lang);
    }
  });
  
  return container;
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  
  // Add switcher to navbar
  const navbar = document.querySelector('.navbar-collapse');
  if (navbar) {
    navbar.appendChild(createLanguageSwitcher());
  }
});