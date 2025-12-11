# Chaduna Static Website ☕🍷

This repository contains the source code for the static website for Chaduna, a café and wine bar in Tbilisi. The site is designed for fast loading and mobile responsiveness, primarily serving as a landing page, an interactive menu, and a hub for the coworking space.

-----

## 🔗 Live Site

The project is hosted via GitHub Pages and is configured to use a custom domain.

  * **Live URL:** [`https://chaduna.bar`](https://chaduna.bar)
  * **GitHub Pages URL:** `https://bitcoin21ideas.github.io/chaduna-web/`

-----

## 📁 Project Structure

The project uses a standard, organized static file structure to separate content, styling, and media assets.

```text
/
├── index.html            // The main landing page/homepage.
├── hub.html              // Coworking space landing page (pricing, timing, info).
├── gallery.html          // Food gallery page with lightbox.
├── menus/
│   ├── menu_en.html      // The interactive food and beverage menu page (English).
│   └── ...               // Other language menus.
├── CNAME                 // GitHub Pages file for custom domain setup (chaduna.bar).
├── robots.txt            // Instructions for web crawlers.
├── sitemap.xml           // XML sitemap listing all site URLs for search engines.
├── .gitignore            // List of files and folders to ignore (e.g., .DS_Store).
└── assets/
    ├── css/
    │   └── style.css     // All shared site styling (renamed from global-style.css).
    ├── js/
    │   ├── menu.js       // Shared logic (Theme, Language, Tabs).
    │   └── structured-data.js // JavaScript file for schema.org data (JSON-LD).
    └── img/
        ├── logos/        // Site logos.
        ├── icons/        // SVG icons for social media, maps, and phone.
        ├── bg/           // Large background images.
        └── food/         // Food photography for the gallery.
```

-----

## ✨ Key Features

  * **Multi-Page Layout:** Includes a main entry page, a dedicated menu system, a coworking hub page, and a food gallery.
  * **Coworking Hub:** A dedicated page (`hub.html`) providing general information about the coworking space, including pricing (Day/Week/Month), opening hours, and location.
  * **Food Gallery:** A visual showcase (`gallery.html`) of the menu offerings with a lightbox viewer.
  * **Advanced SEO & Structured Data:** Comprehensive **Schema.org (JSON-LD)** markup with language-aware detection supporting 10 languages (en, ru, de, tr, fr, es, it, ka, zh, ar). Includes `Restaurant` and `LocalBusiness` schemas with enhanced location keywords, wine-related properties, menu item translations, and pricing offers. All food images and logo variants are included in structured data for better discoverability.
  * **AI Assistant Optimization:** Chatbot-friendly structured data with FAQ schema, trending features, timing, and location information optimized for AI assistants and search engines.
  * **Multi-Language Menu Support:** Automatic menu item extraction from menu pages with full translations and alternate names for popular dishes across all supported languages.
  * **Sitemap & Crawler Support:** Includes `robots.txt` and `sitemap.xml` with all pages (hub, gallery, menus) listed for search engine indexing.
  * **Custom Domain:** Configured for the domain `chaduna.bar` using the **`CNAME`** file.
  * **Responsive Menu:** The menu page (`menus/menu_en.html`) uses basic JavaScript for tab functionality (`Food` / `Beverages`) to organize items without requiring a full page reload.

-----

## ⚙️ Deployment

This project is deployed using **GitHub Pages**.

1.  **Repository Setup:** All code is pushed to the `main` branch.
2.  **Pages Configuration:** Deployment is configured to build from the **`main`** branch using the **`/ (root)`** directory.
