# Chaduna Static Website ☕🍷

This repository contains the source code for the static website for Chaduna, a café and wine bar in Tbilisi. The site is designed for fast loading and mobile responsiveness, primarily serving as a landing page, an interactive menu, and a hub for the coworking space.

-----

## 🔗 Live Site

The project is hosted via GitHub Pages and is configured to use a custom domain.

  * **Live URL:** [`https://chaduna.com`](https://chaduna.com)

-----

## 📁 Project Structure

The project uses a standard, organized static file structure to separate content, styling, and media assets.

```text
/
├── index.html            // Main landing page/homepage (EN).
├── index_ru.html         // Main landing page/homepage (RU).
├── hub.html              // Coworking page (EN).
├── hub_ru.html           // Coworking page (RU).
├── gallery.html          // Food gallery page.
├── wine-tasting.html     // Wine tasting page (EN).
├── wine-tasting_ru.html  // Wine tasting page (RU).
├── breakfast.html        // Breakfast landing page (EN).
├── breakfast_ru.html     // Breakfast landing page (RU).
├── laptop-friendly-cafe.html    // Laptop-friendly/coworking explainer (EN).
├── laptop-friendly-cafe_ru.html // Laptop-friendly/coworking explainer (RU).
├── tbilisi-guide.html    // Tbilisi guide page (EN).
├── tbilisi-guide_ru.html // Tbilisi guide page (RU).
├── reserve.html          // Table booking page (Tally embed).
├── form-submitted.html   // Thank-you page after a booking request (noindex).
├── yandex_db50264587e1b3cd.html // Yandex verification page.
├── menus/
│   ├── menu_en.html      // The interactive food and beverage menu page (English).
│   ├── menu_ru.html      // Russian menu.
│   ├── menu_de.html      // German menu.
│   ├── menu_tr.html      // Turkish menu.
│   ├── menu_fr.html      // French menu.
│   ├── menu_es.html      // Spanish menu.
│   ├── menu_it.html      // Italian menu.
│   ├── menu_ka.html      // Georgian menu.
│   ├── menu_zh.html      // Chinese menu.
│   └── menu_ar.html      // Arabic menu.
├── CNAME                 // GitHub Pages file for custom domain setup (chaduna.com).
├── robots.txt            // Instructions for web crawlers.
├── sitemap.xml           // XML sitemap listing indexed URLs with hreflang tags.
├── llms.txt              // AI crawler-facing summary file.
├── llms-full.txt         // Extended AI crawler-facing context file.
├── favicon.svg           // SVG favicon.
├── favicon.png           // PNG favicon.
├── favicon.ico           // ICO favicon.
├── .gitignore            // List of files and folders to ignore (e.g., .DS_Store).
└── assets/
    ├── css/
    │   ├── style.css     // Main shared site styling.
    │   └── burger-menu.css // Burger sidebar styling.
    ├── js/
    │   ├── burger-menu.js // Burger menu open/close and current-page highlighting.
    │   ├── menu.js       // Tab functionality and language dropdown logic.
    │   ├── form-submitted.js // Add-to-calendar on the booking thank-you page.
    │   └── structured-data.js // JavaScript file for schema.org data (JSON-LD).
    ├── fonts/
    │   └── playfair-display/ // Playfair Display files + satoshi.woff2.
    └── img/
        ├── logos/        // Site logos (WebP with @1x and @2x variants).
        ├── icons/        // SVG icons for social media, maps, phone, home, and language.
        ├── background/   // Background images.
        └── food/         // Food photography for the gallery (WebP, organized by category).
```

-----

## ✨ Key Features

  * **Multi-Page Layout:** Includes a main entry page, a dedicated menu system, a coworking hub page, and a food gallery.
  * **Landing Page:** Clean, minimalist homepage (`index.html`) with navigation links, social media icons, address, and opening hours. Uses inline critical CSS and deferred loading of the full stylesheet (other pages load `style.css` normally).
  * **Coworking Hub:** A dedicated page (`hub.html`) providing general information about the coworking space, including pricing (30 GEL/day, 100 GEL/week, 300 GEL/month), opening hours (Daily 10:00-20:00), location, and member benefits (2 free beverages and 20% discount at Chaduna).
  * **Interactive Food Gallery:** A visual showcase (`gallery.html`) of menu offerings with an advanced lightbox viewer featuring:
    - Keyboard navigation (Arrow keys, Escape)
    - Touch swipe support for mobile devices
    - Image zoom functionality
    - Previous/Next navigation buttons
    - Organized by categories (Breakfast, Bruschetta, Special dishes)
  * **Multi-Language Menu System:** Interactive menu pages supporting 10 languages (en, ru, de, tr, fr, es, it, ka, zh, ar) with:
    - Tab-based navigation between Food and Beverages sections
    - Language dropdown selector in the header
    - Full menu item translations with descriptions
    - Consistent navigation across all language versions
  * **Advanced SEO & Structured Data:** Comprehensive **Schema.org (JSON-LD)** markup with language-aware detection supporting all 10 languages. Includes:
    - `Restaurant` and `LocalBusiness` schemas for the café
    - Separate `LocalBusiness` schema for the coworking hub
    - Enhanced location keywords, wine-related properties, menu item translations, and pricing offers
    - FAQ schema for both café and hub pages
    - All food images and logo variants included in structured data for better discoverability
  * **AI Assistant Optimization:** Chatbot-friendly structured data with FAQ schema, trending features, timing, and location information optimized for AI assistants and search engines.
  * **Performance Optimizations:**
    - WebP image format for all food photography and logos
    - Responsive images with @1x and @2x variants for retina displays
    - Custom Playfair Display font (WOFF2 format) for typography
    - Homepage (`index.html`) only: inlined critical CSS and deferred full `style.css` load
    - Other pages: standard blocking `style.css` link
    - Lazy loading for gallery images
  * **Analytics:** Privacy-friendly analytics using Umami (self-hosted) for tracking page views and user interactions.
  * **Sitemap & Crawler Support:** Includes `robots.txt`, `sitemap.xml`, `llms.txt`, and `llms-full.txt`. Sitemap uses hreflang/x-default for bilingual EN/RU page pairs and localized menu pages.
  * **Custom Domain:** Configured for the domain `chaduna.com` using the **`CNAME`** file.
  * **Responsive Design:** Fully responsive layout optimized for mobile, tablet, and desktop devices with touch-friendly interactions.

-----

## ⚙️ Deployment

This project is deployed using **GitHub Pages**.

1.  **Branch Model:** `main` is the production branch; `dev` is the active development branch.
2.  **Pages Configuration:** Deployment is configured to build from the **`main`** branch using the **`/ (root)`** directory.
3.  **Custom Domain:** The `CNAME` file configures the custom domain `chaduna.com` for GitHub Pages.
4.  **Static Files:** All HTML, CSS, JavaScript, and image files are served directly without any build process, ensuring fast deployment and easy updates.
