document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://chaduna.bar';
  
  // Base Restaurant Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Chaduna",
    "alternateName": "Cafe Chaduna",
    "description": document.querySelector('meta[name="description"]')?.content || "Cozy cafe and wine bar in Tbilisi.",
    "image": `${baseUrl}/assets/img/logos/chaduna-white.png`,
    "url": baseUrl,
    "@id": baseUrl,
    "telephone": "+995557629229",
    "priceRange": "₾₾",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "18 Galaktion Tabidze Street",
      "addressLocality": "Tbilisi",
      "addressRegion": "Tbilisi",
      "postalCode": "0108",
      "addressCountry": "GE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6904705,
      "longitude": 44.8013647
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "23:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Monday",
        "opens": "10:00",
        "closes": "15:00"
      }
    ],
    "servesCuisine": ["Georgian", "European", "Cafe", "Breakfast", "Brunch"],
    "sameAs": ["https://www.instagram.com/cafechaduna"],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Dine in", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Take out", "value": true }
    ]
  };

  // Dynamic Menu Generation
  // Only generate detailed menu schema if we are on a menu page
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer) {
    structuredData.hasMenu = {
      "@type": "Menu",
      "hasMenuSection": []
    };
    
    structuredData.menu = window.location.href;

    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      let currentSection = null;
      let currentSectionPrice = null;
      
      const children = Array.from(tab.children);
      
      children.forEach(child => {
        if (child.tagName === 'H2') {
           // Push previous section if exists
           if (currentSection) {
               structuredData.hasMenu.hasMenuSection.push(currentSection);
           }
           
           // Start new section
           const sectionName = child.childNodes[0].textContent.trim();
           const priceSpan = child.querySelector('.category-price');
           currentSectionPrice = priceSpan ? priceSpan.textContent.trim() : null;

           currentSection = {
             "@type": "MenuSection",
             "name": sectionName,
             "hasMenuItem": []
           };
        } else if (child.classList.contains('menu-item') && currentSection) {
            const nameEl = child.querySelector('.item-name');
            const descEl = child.querySelector('.item-description');
            const priceEl = child.querySelector('.item-price');
            
            if (nameEl) {
                const item = {
                    "@type": "MenuItem",
                    "name": nameEl.textContent.trim(),
                };
                if (descEl) {
                    item.description = descEl.textContent.trim();
                }
                
                const rawPrice = priceEl ? priceEl.textContent.trim() : currentSectionPrice;
                if (rawPrice) {
                    // Extract first number if possible
                    const match = rawPrice.match(/[\d.]+/);
                    const priceVal = match ? match[0] : rawPrice;
                    
                    item.offers = {
                        "@type": "Offer",
                        "price": priceVal,
                        "priceCurrency": "GEL"
                    };
                }
                currentSection.hasMenuItem.push(item);
            }
        }
      });
      // Push last section
      if (currentSection) {
          structuredData.hasMenu.hasMenuSection.push(currentSection);
      }
    });
  }
  
  // Inject
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
});
