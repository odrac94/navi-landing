# Sistema de Traducción Multi-idioma - Navi Lyrics

## ¿Cómo funciona?

El sitio ahora tiene un sistema de traducción basado en **JSON** que permite cambiar entre **inglés (EN)** y **español (ES)** con un botón selector en la navegación.

## Archivos creados/modificados

### 1. **translations.json**
Contiene todas las traducciones en formato de estructura anidada:
```json
{
  "en": { ... },
  "es": { ... }
}
```

### 2. **i18n.js**
Motor de traducción que:
- Carga automáticamente las traducciones
- Detecta el idioma del navegador (fallback a inglés)
- Guarda la preferencia de idioma en `localStorage`
- Reemplaza el contenido usando atributos `data-i18n`

### 3. **index.html** (actualizado)
- Se agregó `<script src="i18n.js"></script>` en el `<head>`
- Se agregó selector de idioma en la navegación (botones EN/ES)
- Todos los textos dinámicos tienen `data-i18n="clave.subkey"`

## Cómo agregar nuevas traducciones

### Paso 1: Agregar la traducción en `translations.json`

```json
{
  "en": {
    "seccion": {
      "clave": "English text"
    }
  },
  "es": {
    "seccion": {
      "clave": "Texto en español"
    }
  }
}
```

### Paso 2: Agregar el atributo en el HTML

```html
<h1 data-i18n="seccion.clave">English text</h1>
```

## Caracteres especiales en traducciones

Para textos con múltiples partes (como títulos con estilos), divide el contenido:

```html
<h1>
  <span data-i18n="hero.heading1">The tool your productivity</span>
  <span data-i18n="hero.heading2">didn't ask for</span>
  <!-- etc -->
</h1>
```

## Atributos dinámicos

Si necesitas traducir atributos (como `title` o `placeholder`), usa `data-i18n-attr`:

```html
<input 
  type="text"
  data-i18n-attr="placeholder:form.email|title:form.emailTitle"
  placeholder="Enter your email"
/>
```

## Cambiar idioma programáticamente

```javascript
// Cambiar a español
window.languageManager.setLanguage('es');

// Cambiar a inglés
window.languageManager.setLanguage('en');

// Obtener idioma actual
console.log(window.languageManager.currentLanguage);

// Obtener texto traducido
const texto = window.languageManager.getText('nav.features');
```

## Características del sistema

✅ **Auto-detección**: Detecta automáticamente el idioma del navegador  
✅ **Persistencia**: Guarda la preferencia en localStorage  
✅ **Rendimiento**: Carga las traducciones una sola vez  
✅ **Facilidad**: Solo necesitas agregar atributos `data-i18n`  
✅ **Selector visual**: Botones EN/ES que muestran el idioma activo  

## Cómo extender a más idiomas

1. Agrega la estructura en `translations.json`:
```json
{
  "en": { ... },
  "es": { ... },
  "fr": { ... }  // Nuevo idioma
}
```

2. Actualiza el selector en el HTML:
```html
<div class="language-switcher" id="language-switcher">
  <button data-lang="en" class="active">EN</button>
  <button data-lang="es" class="inactive">ES</button>
  <button data-lang="fr" class="inactive">FR</button>
</div>
```

3. El sistema funcionará automáticamente sin cambios adicionales en `i18n.js`

## Notas técnicas

- El sistema usa `fetch()` para cargar `translations.json`
- Los elementos se actualizan dinámicamente cuando cambias de idioma
- El `localStorage` se usa para persistencia entre sesiones
- Compatible con todos los navegadores modernos
