const structuredData = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Chaduna",
  "alternateName": "Cafe Chaduna",
  "description": "Cozy cafe and wine bar serving breakfast, brunch, lunch and dinner. Famous for syrniki, bruschetta, shakshuka, omelette, cottage cheese pancakes, quesadilla, frittata and more.",
  "image": "https://chaduna.bar/asseys/img/logos/chaduna-white.png",
  "url": "https://chaduna.bar",
  "@id": "https://chaduna.bar",
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
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
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
  "servesCuisine": [
    "Georgian",
    "European",
    "Cafe",
    "Breakfast",
    "Brunch"
  ],
  "menu": "https://chaduna.bar/menu.html",
  "acceptsReservations": "True",
  "hasMenu": {
    "@type": "Menu",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Breakfast",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Syrniki",
            "description": "Cottage cheese pancakes",
            "offers": {
              "@type": "Offer",
              "price": "25",
              "priceCurrency": "GEL"
            }
          },
          {
            "@type": "MenuItem",
            "name": "Frittata",
            "description": "Chizhi Bizhi Frittata",
            "offers": {
              "@type": "Offer",
              "price": "25",
              "priceCurrency": "GEL"
            }
          },
          {
            "@type": "MenuItem",
            "name": "Scrambled Eggs",
            "offers": {
              "@type": "Offer",
              "price": "25",
              "priceCurrency": "GEL"
            }
          },
          {
            "@type": "MenuItem",
            "name": "Quesadilla",
            "description": "Chicken or veggie",
            "offers": {
              "@type": "Offer",
              "price": "25",
              "priceCurrency": "GEL"
            }
          }
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Bruschetta",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Bruschetta",
            "description": "Various toppings available",
            "offers": {
              "@type": "Offer",
              "price": "15",
              "priceCurrency": "GEL"
            }
          }
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Chaduna Special",
        "hasMenuItem": [
          {
            "@type": "MenuItem",
            "name": "Tomato Salad",
            "offers": {
              "@type": "Offer",
              "price": "30",
              "priceCurrency": "GEL"
            }
          },
          {
            "@type": "MenuItem",
            "name": "Potato with Bacon",
            "offers": {
              "@type": "Offer",
              "price": "30",
              "priceCurrency": "GEL"
            }
          }
        ]
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/cafechaduna"
  ],
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Dine in",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Take out",
      "value": true
    }
  ]
};

// Insert the structured data into the page
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(structuredData);
document.head.appendChild(script);