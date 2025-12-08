# Chaduna Static Website ☕🍷

This repository contains the source code for the static website for Chaduna, a café and wine bar in Tbilisi. The site is a two-page deployment designed for fast loading and mobile responsiveness, primarily serving as a landing page and an interactive menu.

-----

## 🔗 Live Site

The project is hosted via GitHub Pages and is configured to use a custom domain.

  * **Live URL:** [`https://chaduna.bar`](https://www.google.com/search?q=%5Bhttps://chaduna.bar%5D\(https://chaduna.bar\))
  * **GitHub Pages URL:** `https://bitcoin21ideas.github.io/chaduna-web/`

-----

## 📁 Project Structure

The project uses a standard, organized static file structure to separate content, styling, and media assets.

```text
/
├── index.html            // The main landing page/homepage.
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
    │   └── structured-data.js // JavaScript file for schema.org data (JSON-LD).
    └── img/
        ├── logos/        // Site logos.
        ├── icons/        // SVG icons for social media, maps, and phone.
        └── bg/           // Large background images.
```

-----

## ✨ Key Features

  * **Two-Page Design:** Simple, highly focused structure with a main entry page and a separate menu page.
  * **SEO Ready:** Includes `robots.txt`, `sitemap.xml`, and **Schema.org (JSON-LD)** markup for the `Restaurant` entity to improve search visibility.
  * **Custom Domain:** Configured for the domain `chaduna.bar` using the **`CNAME`** file.
  * **Responsive Menu:** The menu page (`menus/menu_en.html`) uses basic JavaScript for tab functionality (`Food` / `Beverages`) to organize items without requiring a full page reload.

-----

## ⚙️ Deployment

This project is deployed using **GitHub Pages**.

1.  **Repository Setup:** All code is pushed to the `main` branch.
2.  **Pages Configuration:** Deployment is configured to build from the **`main`** branch using the **`/ (root)`** directory.
