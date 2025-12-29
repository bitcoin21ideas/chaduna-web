document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://chaduna.com';
  // Get language (default to en)
  const pageLang = (document.documentElement.lang || 'en').split('-')[0];
  
  // Logic to determine if this is the Hub or Cafe page
  const isHub = document.body.classList.contains('hub-page') || 
                window.location.pathname.includes('hub');

  if (isHub) {
    const { business, faq } = buildHubSchema(baseUrl, pageLang);
    inject(business);
    inject(faq);
  } else {
    const { business, faq } = buildCafeSchema(baseUrl, pageLang);
    inject(business);
    inject(faq);
  }
});

function inject(obj) {
  if (!obj) return;
  const s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(obj);
  document.head.appendChild(s);
}

/* ---------------- HUB (Coworking) ---------------- */

function buildHubSchema(baseUrl, lang) {
  const t = hubTranslations[lang] || hubTranslations.en;

  // We construct the offers array dynamically based on translations
  const offers = [
    {
      "@type": "Offer",
      "name": t.dayPass,
      "price": "30",
      "priceCurrency": "GEL",
      "description": "Full day access to coworking space"
    },
    {
      "@type": "Offer",
      "name": t.weeklyPass,
      "price": "100",
      "priceCurrency": "GEL",
      "description": "7-day access to coworking space"
    },
    {
      "@type": "Offer",
      "name": t.monthlyPass,
      "price": "300",
      "priceCurrency": "GEL",
      "description": "Monthly membership"
    }
  ];

  const business = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/hub#business`,
    "name": t.name,
    "description": t.description,
    "url": `${baseUrl}/hub`,
    "inLanguage": lang,
    "telephone": "+995557629229",
    "priceRange": "₾₾",
    "image": `${baseUrl}/assets/img/logos/hub-logo.png`,
    "address": address(),
    "geo": geo(),
    "hasMap": map(),
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],    
    "amenityFeature": [
      feature(t.wifi),
      feature(t.cafeAccess),
      feature(t.flexibleWorkspace)
    ],
    "knowsAbout": ["coworking", "remote work", "digital nomads", "day pass workspace"],
    "audience": {
      "@type": "Audience",
      "audienceType": t.audience
    },
    "makesOffer": offers, 
    "sameAs": [
        "https://www.instagram.com/cafechaduna",
    ]
  };

  const faq = faqPage([
    { q: t.faq1Question, a: t.faq1Answer },
    { q: t.faq2Question, a: t.faq2Answer },
    { q: t.faq3Question, a: t.faq3Answer },
    { q: t.faq4Question, a: t.faq4Answer },
    { q: t.faq5Question, a: t.faq5Answer }
  ]);

  return { business, faq };
}

/* ---------------- CAFE / WINE BAR ---------------- */

function aggregateRating() {

  const googleRating = 4.7;
  const googleCount = 1255;
  const yandexRating = 5.0;
  const yandexCount = 243;
  
  // Calculate weighted average
  const totalWeighted = (googleRating * googleCount) + (yandexRating * yandexCount);
  const totalReviews = googleCount + yandexCount;
  const averageRating = (totalWeighted / totalReviews).toFixed(2);
  
  return {
    "@type": "AggregateRating",
    "ratingValue": averageRating,
    "reviewCount": totalReviews,
    "bestRating": 5,
    "worstRating": 1
  };
}

function buildCafeSchema(baseUrl, lang) {
  const t = cafeTranslations[lang] || cafeTranslations.en;

  const business = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "Cafe", "Bar"],
    "@id": `${baseUrl}#business`,
    "name": "Chaduna",
    "alternateName": "Cafe Chaduna",
    "description": t.description,
    "url": baseUrl,
    "inLanguage": lang,
    "telephone": "+995557629229",
    "priceRange": "₾₾",
    "servesAlcohol": true,
    "acceptsReservations": true,
    "paymentAccepted": ["Cash", "Credit Card"],
    "currenciesAccepted": "GEL",
    "image": getCafeImages(baseUrl),
    "servesCuisine": ["Georgian", "European", "Breakfast", "Brunch", "Wine"],
    "address": address(),
    "geo": geo(),
    "hasMap": map(),
    "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Monday",
          "opens": "09:00",
          "closes": "15:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "23:00"
        }
    ],
    "amenityFeature": [
      feature(t.dineIn),
      feature(t.takeOut),
      feature(t.wineByGlass)
    ],
    "knowsAbout": ["Georgian wine", "international wine", "syrniki", "breakfast", "brunch", "wine bar", "coffee"],
    "audience": {
      "@type": "Audience",
      "audienceType": t.audience
    },
    "aggregateRating": aggregateRating(),
    "sameAs": [
        "https://www.instagram.com/cafechaduna",
        "https://www.google.com/maps/place/Chaduna/@41.6906646,44.8008924,17z/data=!4m6!3m5!1s0x40440daa8cec339d:0x9d8e3e318703149c!8m2!3d41.6904705!4d44.8013647!16s%2Fg%2F11j3kfxyql",
        "https://yandex.com/maps/org/chaduna/20144441734/"
    ]
  };

  attachMenu(business, lang, baseUrl);
  
  const faq = faqPage([
    { q: t.faq1Question, a: t.faq1Answer },
    { q: t.faq2Question, a: t.faq2Answer },
    { q: t.faq3Question, a: t.faq3Answer },
    { q: t.faq4Question, a: t.faq4Answer },
    { q: t.faq5Question, a: t.faq5Answer }
  ]);

  return { business, faq };
}

/* ---------------- HELPERS ---------------- */

function faqPage(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  };
}

function address() {
  return {
    "@type": "PostalAddress",
    "streetAddress": "18 Galaktion Tabidze Street",
    "addressLocality": "Tbilisi",
    "addressRegion": "Tbilisi",
    "postalCode": "0108",
    "addressCountry": "GE"
  };
}

function geo() {
  return {
    "@type": "GeoCoordinates",
    "latitude": 41.6904705,
    "longitude": 44.8013647
  };
}

function map() {
  return "https://maps.app.goo.gl/KVxcbbUx8NuiaHnXA";
}

function getCafeImages(baseUrl) {
  return [
    // Main/hero images
    `${baseUrl}/assets/img/logos/chaduna-logo.png`,
    `${baseUrl}/assets/img/food/all-dishes.webp`,
    `${baseUrl}/assets/img/food/selection.webp`,
    
    // Breakfast dishes (your signature items)
    `${baseUrl}/assets/img/food/breakfast/syrniki.webp`, // Your famous dish!
    `${baseUrl}/assets/img/food/breakfast/frittata.webp`,
    `${baseUrl}/assets/img/food/breakfast/scrambled-eggs.webp`,
    `${baseUrl}/assets/img/food/breakfast/chizhi-bizhi.webp`,
    `${baseUrl}/assets/img/food/breakfast/quesadilla.webp`,
    
    // Bruschetta (popular items)
    `${baseUrl}/assets/img/food/bruschettas.webp`,
    `${baseUrl}/assets/img/food/bruschetta/pesto-br.webp`,
    `${baseUrl}/assets/img/food/bruschetta/bacon-br.webp`,
    `${baseUrl}/assets/img/food/bruschetta/champignon-br.webp`,
    
    // Special dishes
    `${baseUrl}/assets/img/food/special/tomato-salad.webp`,
    `${baseUrl}/assets/img/food/special/veggie-casserole.webp`,
    `${baseUrl}/assets/img/food/special/potato.webp`
  ];
}

function feature(name) {
  return {
    "@type": "LocationFeatureSpecification",
    "name": name,
    "value": true
  };
}

function attachMenu(business, lang, baseUrl) {
  const menuRoot = document.querySelector('.menu-container');
  if (!menuRoot) return;

  const menu = {
    "@type": "Menu",
    "inLanguage": lang,
    "hasMenuSection": []
  };

  const dishImageMap = {
    'syrniki': '/assets/img/food/breakfast/syrniki.webp',
    'frittata': '/assets/img/food/breakfast/frittata.webp',
    'scrambled eggs': '/assets/img/food/breakfast/scrambled-eggs.webp',
    'chizhi bizhi': '/assets/img/food/breakfast/chizhi-bizhi.webp',
    'quesadilla': '/assets/img/food/breakfast/quesadilla.webp',
    'pesto bruschetta': '/assets/img/food/bruschetta/pesto-br.webp',
    'bacon bruschetta': '/assets/img/food/bruschetta/bacon-br.webp',
    'champignon bruschetta': '/assets/img/food/bruschetta/champignon-br.webp',
    'tomato salad': '/assets/img/food/special/tomato-salad.webp',
    'veggie casserole': '/assets/img/food/special/veggie-casserole.webp',
    'potato': '/assets/img/food/special/potato.webp'
  };

  document.querySelectorAll('.menu-section').forEach(section => {
    const sec = {
      "@type": "MenuSection",
      "name": section.querySelector('h2')?.textContent || "Section",
      "hasMenuItem": []
    };

    section.querySelectorAll('.menu-item').forEach(item => {
      const name = item.querySelector('.item-name')?.textContent;
      // Safety check: ensure price exists before matching
      const priceText = item.querySelector('.item-price')?.textContent; 
      const price = priceText ? priceText.match(/\d+/) : null;

      if (!name) return;
      const menuItem = {
        "@type": "MenuItem",
        "name": name,
        ...(price && {
          "offers": {
            "@type": "Offer",
            "price": price[0],
            "priceCurrency": "GEL"
          }
        })
      };

      // Add image if available
      const imageKey = name.toLowerCase();
      for (const [key, imagePath] of Object.entries(dishImageMap)) {
        if (imageKey.includes(key.toLowerCase())) {
          menuItem.image = `${baseUrl}${imagePath}`;
          break;
        }
      }

      sec.hasMenuItem.push(menuItem);
    });

    if (sec.hasMenuItem.length) {
      menu.hasMenuSection.push(sec);
    }
  });

  if (menu.hasMenuSection.length) {
    business.hasMenu = menu;
  }
}

/* ---------------- DATA / TRANSLATIONS ---------------- */

const hubTranslations = {
  en: {
    name: "Chaduna Hub",
    description: "Coworking space in Tbilisi near Liberty Square, downtown Tbilisi, old city. Flexible workspace with day passes, weekly and monthly memberships. Close to Liberty Square metro station. Comfortable workspace with cafe amenities, high-speed Wi-Fi, and modern facilities. Daily 10:00-20:00.",
    dayPass: "Day Pass",
    weeklyPass: "Weekly Pass",
    monthlyPass: "Monthly Membership",
    wifi: "High-Speed Wi-Fi",
    cafeAccess: "Cafe Access",
    flexibleWorkspace: "Flexible Workspace",
    faq1Question: "What is Chaduna Hub?",
    faq1Answer: "Chaduna Hub is a flexible coworking space in Tbilisi, located near Liberty Square in downtown Tbilisi, old city. We offer day passes, weekly passes, and monthly memberships. Our space includes cafe amenities, high-speed Wi-Fi, and modern facilities.",
    faq2Question: "What are the prices?",
    faq2Answer: "Day pass: 30 GEL, Weekly pass: 100 GEL, Monthly membership: 300 GEL. All prices include access to workspace, Wi-Fi, and cafe amenities.",
    faq3Question: "Where is Chaduna Hub located?",
    faq3Answer: "Chaduna Hub is located at 18 Galaktion Tabidze Street, near Liberty Square, in downtown Tbilisi, old city. We are close to Liberty Square metro station.",
    faq4Question: "What are your opening hours?",
    faq4Answer: "We are open daily from 10:00 to 20:00.",
    faq5Question: "Do you have Wi-Fi?",
    faq5Answer: "Yes, we provide high-speed Wi-Fi to all members. Our workspace also includes cafe amenities and modern facilities.",
    feature1: "Flexible workspace with day, weekly, and monthly options",
    feature2: "High-speed Wi-Fi included",
    feature3: "Cafe amenities access",
    feature4: "Located in historic old city near Liberty Square metro",
    feature5: "Modern facilities and comfortable workspace",
    feature6: "Daily access 10:00-20:00",
    feature7: "20% discount in Chhaduna Cafe and Wine Bar for Hub members",
    audience: "Digital Nomads, Remote Workers, Freelancers, Entrepreneurs, Students"
  },

  ru: {
    name: "Chaduna Hub",
    description: "Коворкинг в Тбилиси рядом с площадью Свободы, в центре города, в старом городе. Гибкое рабочее пространство с дневными абонементами, недельными и месячными членствами. Близко к станции метро Площадь Свободы. Удобное рабочее пространство с удобствами кафе, высокоскоростным Wi-Fi и современными удобствами. Ежедневно 10:00-20:00.",
    dayPass: "Дневной абонемент",
    weeklyPass: "Недельный абонемент",
    monthlyPass: "Месячное членство",
    wifi: "Высокоскоростной Wi-Fi",
    cafeAccess: "Доступ к кафе",
    flexibleWorkspace: "Гибкое рабочее пространство",
    faq1Question: "Что такое Chaduna Hub?",
    faq1Answer: "Chaduna Hub - это гибкое рабочее пространство в Тбилиси, расположенное рядом с площадью Свободы, в центре города, в старом городе. Мы предлагаем дневные абонементы, недельные абонементы и месячные членства. Наше пространство включает удобства кафе, высокоскоростной Wi-Fi и современные удобства.",
    faq2Question: "Какие цены?",
    faq2Answer: "Дневной абонемент: 30 лари, Недельный абонемент: 100 лари, Месячное членство: 300 лари. Все цены включают доступ к рабочему пространству, Wi-Fi и удобствам кафе.",
    faq3Question: "Где находится Chaduna Hub?",
    faq3Answer: "Chaduna Hub находится по адресу ул. Галактиона Табидзе, 18, рядом с площадью Свободы, в центре Тбилиси, в старом городе. Мы близко к станции метро Площадь Свободы.",
    faq4Question: "Какие у вас часы работы?",
    faq4Answer: "Мы работаем ежедневно с 10:00 до 20:00.",
    faq5Question: "У вас есть Wi-Fi?",
    faq5Answer: "Да, мы предоставляем высокоскоростной Wi-Fi всем членам. Наше рабочее пространство также включает удобства кафе и современные удобства.",
    feature1: "Гибкое рабочее пространство с дневными, недельными и месячными вариантами",
    feature2: "Включен высокоскоростной Wi-Fi",
    feature3: "Доступ к удобствам кафе",
    feature4: "Расположены в историческом старом городе рядом с метро Площадь Свободы",
    feature5: "Современные удобства и удобное рабочее пространство",
    feature6: "Ежедневный доступ 10:00-20:00",
    feature7: "20% скидка в Chaduna Cafe и Wine Bar для членов Hub",
    audience: "Цифровые кочевники, Удаленные работники, Фрилансеры, Предприниматели, Студенты"
  },

  de: {
    name: "Chaduna Hub",
    description: "Coworking-Space in Tiflis in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Flexibler Arbeitsplatz mit Tagespässen, wöchentlichen und monatlichen Mitgliedschaften. In der Nähe der U-Bahn-Station Freiheitsplatz. Komfortabler Arbeitsplatz mit Café-Ausstattung, schnellem WLAN und modernen Einrichtungen. Täglich 10:00-20:00.",
    dayPass: "Tagespass",
    weeklyPass: "Wochenpass",
    monthlyPass: "Monatsmitgliedschaft",
    wifi: "Schnelles WLAN",
    cafeAccess: "Café-Zugang",
    flexibleWorkspace: "Flexibler Arbeitsplatz",
    faq1Question: "Was ist Chaduna Hub?",
    faq1Answer: "Chaduna Hub ist ein flexibler Coworking-Space in Tiflis, gelegen in der Nähe des Freiheitsplatzes im Zentrum von Tiflis, in der Altstadt. Wir bieten Tagespässe, Wochenpässe und Monatsmitgliedschaften. Unser Space umfasst Café-Ausstattung, schnelles WLAN und moderne Einrichtungen.",
    faq2Question: "Wie sind die Preise?",
    faq2Answer: "Tagespass: 30 GEL, Wochenpass: 100 GEL, Monatsmitgliedschaft: 300 GEL. Alle Preise beinhalten Zugang zum Arbeitsplatz, WLAN und Café-Ausstattung.",
    faq3Question: "Wo befindet sich Chaduna Hub?",
    faq3Answer: "Chaduna Hub befindet sich in der Galaktion Tabidze Straße 18, in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Wir sind in der Nähe der U-Bahn-Station Freiheitsplatz.",
    faq4Question: "Wie sind Ihre Öffnungszeiten?",
    faq4Answer: "Wir sind täglich von 10:00 bis 20:00 Uhr geöffnet.",
    faq5Question: "Haben Sie WLAN?",
    faq5Answer: "Ja, wir bieten schnelles WLAN für alle Mitglieder. Unser Arbeitsplatz umfasst auch Café-Ausstattung und moderne Einrichtungen.",
    feature1: "Flexibler Arbeitsplatz mit Tages-, Wochen- und Monatsoptionen",
    feature2: "Schnelles WLAN inklusive",
    feature3: "Zugang zu Café-Ausstattung",
    feature4: "Gelegen in der historischen Altstadt in der Nähe der U-Bahn-Station Freiheitsplatz",
    feature5: "Moderne Einrichtungen und komfortabler Arbeitsplatz",
    feature6: "Täglicher Zugang 10:00-20:00",
    feature7: "20% Rabatt in Chaduna Cafe und Wine Bar für Hub-Mitglieder",
    audience: "Digitale Nomaden, Remote-Arbeiter, Freelancer, Unternehmer, Studenten"
  },

  tr: {
    name: "Chaduna Hub",
    description: "Tiflis'te Özgürlük Meydanı yakınında, şehir merkezinde, eski şehirde koworking alanı. Günlük, haftalık ve aylık üyeliklerle esnek çalışma alanı. Özgürlük Meydanı metro istasyonuna yakın. Kafe olanakları, yüksek hızlı Wi-Fi ve modern tesislere sahip rahat çalışma alanı. Günlük 10:00-20:00.",
    dayPass: "Günlük Geçiş",
    weeklyPass: "Haftalık Geçiş",
    monthlyPass: "Aylık Üyelik",
    wifi: "Yüksek Hızlı Wi-Fi",
    cafeAccess: "Kafe Erişimi",
    flexibleWorkspace: "Esnek Çalışma Alanı",
    faq1Question: "Chaduna Hub nedir?",
    faq1Answer: "Chaduna Hub, Tiflis'te Özgürlük Meydanı yakınında, şehir merkezinde, eski şehirde bulunan esnek bir koworking alanıdır. Günlük, haftalık ve aylık üyelikler sunuyoruz. Alanımız kafe olanakları, yüksek hızlı Wi-Fi ve modern tesisleri içerir.",
    faq2Question: "Fiyatlar nedir?",
    faq2Answer: "Günlük geçiş: 30 GEL, Haftalık geçiş: 100 GEL, Aylık üyelik: 300 GEL. Tüm fiyatlar çalışma alanı, Wi-Fi ve kafe olanaklarına erişimi içerir.",
    faq3Question: "Chaduna Hub nerede bulunuyor?",
    faq3Answer: "Chaduna Hub, Galaktion Tabidze Caddesi 18 numarada, Özgürlük Meydanı yakınında, Tiflis şehir merkezinde, eski şehirde yer almaktadır. Özgürlük Meydanı metro istasyonuna yakınız.",
    faq4Question: "Çalışma saatleriniz nedir?",
    faq4Answer: "Günlük 10:00-20:00 saatleri arasında açığız.",
    faq5Question: "Wi-Fi var mı?",
    faq5Answer: "Evet, tüm üyelere yüksek hızlı Wi-Fi sağlıyoruz. Çalışma alanımız ayrıca kafe olanakları ve modern tesisleri içerir.",
    feature1: "Günlük, haftalık ve aylık seçeneklerle esnek çalışma alanı",
    feature2: "Yüksek hızlı Wi-Fi dahil",
    feature3: "Kafe olanaklarına erişim",
    feature4: "Özgürlük Meydanı metro istasyonu yakınında tarihi eski şehirde konumlanmış",
    feature5: "Modern tesisler ve rahat çalışma alanı",
    feature6: "Günlük erişim 10:00-20:00",
    feature7: "20% indirim Chaduna Cafe ve Wine Bar'da Hub üyeleri için",
    audience: "Dijital Göçebeler, Uzaktan Çalışanlar, Serbest Çalışanlar, Girişimciler, Öğrenciler"
  },

  fr: {
    name: "Chaduna Hub",
    description: "Espace de coworking à Tbilissi près de la place de la Liberté, au centre-ville de Tbilissi, dans la vieille ville. Espace de travail flexible avec passes journaliers, hebdomadaires et mensuels. Près de la station de métro place de la Liberté. Espace de travail confortable avec commodités de café, Wi-Fi haut débit et installations modernes. Quotidien 10:00-20:00.",
    dayPass: "Pass journalier",
    weeklyPass: "Pass hebdomadaire",
    monthlyPass: "Adhésion mensuelle",
    wifi: "Wi-Fi haut débit",
    cafeAccess: "Accès au café",
    flexibleWorkspace: "Espace de travail flexible",
    faq1Question: "Qu'est-ce que Chaduna Hub?",
    faq1Answer: "Chaduna Hub est un espace de coworking flexible à Tbilissi, situé près de la place de la Liberté au centre-ville de Tbilissi, dans la vieille ville. Nous offrons des passes journaliers, hebdomadaires et mensuels. Notre espace comprend des commodités de café, Wi-Fi haut débit et installations modernes.",
    faq2Question: "Quels sont les prix?",
    faq2Answer: "Pass journalier: 30 GEL, Pass hebdomadaire: 100 GEL, Adhésion mensuelle: 300 GEL. Tous les prix incluent l'accès à l'espace de travail, Wi-Fi et commodités de café.",
    faq3Question: "Où se trouve Chaduna Hub?",
    faq3Answer: "Chaduna Hub se trouve au 18 rue Galaktion Tabidze, près de la place de la Liberté, au centre-ville de Tbilissi, dans la vieille ville. Nous sommes près de la station de métro place de la Liberté.",
    faq4Question: "Quels sont vos horaires d'ouverture?",
    faq4Answer: "Nous sommes ouverts quotidiennement de 10h00 à 20h00.",
    faq5Question: "Avez-vous le Wi-Fi?",
    faq5Answer: "Oui, nous fournissons le Wi-Fi haut débit à tous les membres. Notre espace de travail comprend également des commodités de café et installations modernes.",
    feature1: "Espace de travail flexible avec options journalières, hebdomadaires et mensuelles",
    feature2: "Wi-Fi haut débit inclus",
    feature3: "Accès aux commodités de café",
    feature4: "Situé dans la vieille ville historique près de la station de métro place de la Liberté",
    feature5: "Installations modernes et espace de travail confortable",
    feature6: "Accès quotidien 10:00-20:00",
    feature7: "20% de réduction dans Chaduna Cafe et Wine Bar pour les membres du Hub",
    audience: "Nomades Numériques, Travailleurs à Distance, Freelances, Entrepreneurs, Étudiants"
  },

  es: {
    name: "Chaduna Hub",
    description: "Espacio de coworking en Tbilisi cerca de la Plaza de la Libertad, en el centro de Tbilisi, en la ciudad vieja. Espacio de trabajo flexible con pases diarios, semanales y mensuales. Cerca de la estación de metro Plaza de la Libertad. Espacio de trabajo cómodo con comodidades de café, Wi-Fi de alta velocidad e instalaciones modernas. Diario 10:00-20:00.",
    dayPass: "Pase diario",
    weeklyPass: "Pase semanal",
    monthlyPass: "Membresía mensual",
    wifi: "Wi-Fi de alta velocidad",
    cafeAccess: "Acceso al café",
    flexibleWorkspace: "Espacio de trabajo flexible",
    faq1Question: "¿Qué es Chaduna Hub?",
    faq1Answer: "Chaduna Hub es un espacio de coworking flexible en Tbilisi, ubicado cerca de la Plaza de la Libertad en el centro de Tbilisi, en la ciudad vieja. Ofrecemos pases diarios, semanales y mensuales. Nuestro espacio incluye comodidades de café, Wi-Fi de alta velocidad e instalaciones modernas.",
    faq2Question: "¿Cuáles son los precios?",
    faq2Answer: "Pase diario: 30 GEL, Pase semanal: 100 GEL, Membresía mensual: 300 GEL. Todos los precios incluyen acceso al espacio de trabajo, Wi-Fi y comodidades de café.",
    faq3Question: "¿Dónde está ubicado Chaduna Hub?",
    faq3Answer: "Chaduna Hub está ubicado en la calle Galaktion Tabidze 18, cerca de la Plaza de la Libertad, en el centro de Tbilisi, en la ciudad vieja. Estamos cerca de la estación de metro Plaza de la Libertad.",
    faq4Question: "¿Cuáles son sus horarios de apertura?",
    faq4Answer: "Estamos abiertos diariamente de 10:00 a 20:00.",
    faq5Question: "¿Tienen Wi-Fi?",
    faq5Answer: "Sí, proporcionamos Wi-Fi de alta velocidad a todos los miembros. Nuestro espacio de trabajo también incluye comodidades de café e instalaciones modernas.",
    feature1: "Espacio de trabajo flexible con opciones diarias, semanales y mensuales",
    feature2: "Wi-Fi de alta velocidad incluido",
    feature3: "Acceso a comodidades de café",
    feature4: "Ubicado en la ciudad vieja histórica cerca de la estación de metro Plaza de la Libertad",
    feature5: "Instalaciones modernas y espacio de trabajo cómodo",
    feature6: "Acceso diario 10:00-20:00",
    feature7: "20% de descuento en Chaduna Cafe y Wine Bar para miembros del Hub",
    audience: "Nómadas Digitales, Trabajadores Remotos, Freelancers, Emprendedores, Estudiantes"
  },

  it: {
    name: "Chaduna Hub",
    description: "Spazio coworking a Tbilisi vicino a Piazza della Libertà, nel centro di Tbilisi, nella città vecchia. Spazio di lavoro flessibile con pass giornalieri, settimanali e mensili. Vicino alla stazione della metropolitana Piazza della Libertà. Spazio di lavoro confortevole con servizi caffè, Wi-Fi ad alta velocità e strutture moderne. Giornaliero 10:00-20:00.",
    dayPass: "Pass giornaliero",
    weeklyPass: "Pass settimanale",
    monthlyPass: "Abbonamento mensile",
    wifi: "Wi-Fi ad alta velocità",
    cafeAccess: "Accesso al caffè",
    flexibleWorkspace: "Spazio di lavoro flessibile",
    faq1Question: "Cos'è Chaduna Hub?",
    faq1Answer: "Chaduna Hub è uno spazio coworking flessibile a Tbilisi, situato vicino a Piazza della Libertà nel centro di Tbilisi, nella città vecchia. Offriamo pass giornalieri, settimanali e mensili. Il nostro spazio include servizi caffè, Wi-Fi ad alta velocità e strutture moderne.",
    faq2Question: "Quali sono i prezzi?",
    faq2Answer: "Pass giornaliero: 30 GEL, Pass settimanale: 100 GEL, Abbonamento mensile: 300 GEL. Tutti i prezzi includono l'accesso allo spazio di lavoro, Wi-Fi e servizi caffè.",
    faq3Question: "Dove si trova Chaduna Hub?",
    faq3Answer: "Chaduna Hub si trova in via Galaktion Tabidze 18, vicino a Piazza della Libertà, nel centro di Tbilisi, nella città vecchia. Siamo vicini alla stazione della metropolitana Piazza della Libertà.",
    faq4Question: "Quali sono i vostri orari di apertura?",
    faq4Answer: "Siamo aperti quotidianamente dalle 10:00 alle 20:00.",
    faq5Question: "Avete il Wi-Fi?",
    faq5Answer: "Sì, forniamo Wi-Fi ad alta velocità a tutti i membri. Il nostro spazio di lavoro include anche servizi caffè e strutture moderne.",
    feature1: "Spazio di lavoro flessibile con opzioni giornaliere, settimanali e mensili",
    feature2: "Wi-Fi ad alta velocità incluso",
    feature3: "Accesso ai servizi caffè",
    feature4: "Situato nella città vecchia storica vicino alla stazione della metropolitana Piazza della Libertà",
    feature5: "Strutture moderne e spazio di lavoro confortevole",
    feature6: "Accesso giornaliero 10:00-20:00",
    feature7: "20% di sconto in Chaduna Cafe e Wine Bar per i membri del Hub",
    audience: "Nomadi Digitali, Lavoratori Remoti, Freelancer, Imprenditori, Studenti"
  },

  ka: {
    name: "Chaduna Hub",
    description: "კოვორკინგი თბილისში თავისუფლების მოედნის მახლობლად, ცენტრში, ძველ ქალაქში. მოქნილი სამუშაო სივრცე დღიური, კვირეული და თვიური წევრობით. თავისუფლების მოედნის მეტროსადგურთან ახლოს. კომფორტული სამუშაო სივრცე კაფეს უზრუნველყოფით, მაღალსიჩქარიანი Wi-Fi-ით და თანამედროვე ობიექტებით. ყოველდღე 10:00-20:00.",
    dayPass: "დღიური ბილეთი",
    weeklyPass: "კვირეული ბილეთი",
    monthlyPass: "თვიური წევრობა",
    wifi: "მაღალსიჩქარიანი Wi-Fi",
    cafeAccess: "კაფეს წვდომა",
    flexibleWorkspace: "მოქნილი სამუშაო სივრცე",
    faq1Question: "რა არის Chaduna Hub?",
    faq1Answer: "Chaduna Hub არის მოქნილი სამუშაო სივრცე თბილისში, მდებარეობს თავისუფლების მოედნის მახლობლად, ცენტრში, ძველ ქალაქში. ვთავაზობთ დღიურ, კვირეულ და თვიურ წევრობებს. ჩვენი სივრცე მოიცავს კაფეს უზრუნველყოფას, მაღალსიჩქარიან Wi-Fi-ს და თანამედროვე ობიექტებს.",
    faq2Question: "რა ფასები გაქვთ?",
    faq2Answer: "დღიური ბილეთი: 30 ლარი, კვირეული ბილეთი: 100 ლარი, თვიური წევრობა: 300 ლარი. ყველა ფასი მოიცავს სამუშაო სივრცის, Wi-Fi-ისა და კაფეს უზრუნველყოფის წვდომას.",
    faq3Question: "სად მდებარეობს Chaduna Hub?",
    faq3Answer: "Chaduna Hub მდებარეობს გალაქტიონ ტაბიძის ქუჩა 18-ში, თავისუფლების მოედნის მახლობლად, თბილისის ცენტრში, ძველ ქალაქში. ვართ თავისუფლების მოედნის მეტროსადგურთან ახლოს.",
    faq4Question: "რა გაქვთ სამუშაო საათები?",
    faq4Answer: "ვართ ღია ყოველდღე 10:00-20:00.",
    faq5Question: "გაქვთ Wi-Fi?",
    faq5Answer: "დიახ, ვთავაზობთ მაღალსიჩქარიან Wi-Fi-ს ყველა წევრს. ჩვენი სამუშაო სივრცე ასევე მოიცავს კაფეს უზრუნველყოფასა და თანამედროვე ობიექტებს.",
    feature1: "მოქნილი სამუშაო სივრცე დღიური, კვირეული და თვიური ვარიანტებით",
    feature2: "მაღალსიჩქარიანი Wi-Fi შედის",
    feature3: "კაფეს უზრუნველყოფის წვდომა",
    feature4: "მდებარეობს ისტორიულ ძველ ქალაქში თავისუფლების მოედნის მეტროსადგურთან ახლოს",
    feature5: "თანამედროვე ობიექტები და კომფორტული სამუშაო სივრცე",
    feature6: "ყოველდღიური წვდომა 10:00-20:00",
    feature7: "20% ფასდაკლება Chaduna Cafe და Wine Bar-ში Hub-ის წევრებისთვის",
    audience: "ციფრული ნომადები, დისტანციური მუშები, ფრილანსერები, მეწარმეები, სტუდენტები"
  },

  zh: {
    name: "Chaduna Hub",
    description: "第比利斯的联合办公空间，位于自由广场附近，市中心，老城区。提供日票、周票和月票的灵活工作空间。靠近自由广场地铁站。舒适的工作空间，配备咖啡设施、高速Wi-Fi和现代化设施。每日10:00-20:00。",
    dayPass: "日票",
    weeklyPass: "周票",
    monthlyPass: "月会员",
    wifi: "高速Wi-Fi",
    cafeAccess: "咖啡厅使用权",
    flexibleWorkspace: "灵活工作空间",
    faq1Question: "Chaduna Hub是什么？",
    faq1Answer: "Chaduna Hub是第比利斯的一个灵活联合办公空间，位于自由广场附近，市中心，老城区。我们提供日票、周票和月会员。我们的空间包括咖啡设施、高速Wi-Fi和现代化设施。",
    faq2Question: "价格是多少？",
    faq2Answer: "日票：30 GEL，周票：100 GEL，月会员：300 GEL。所有价格包括工作空间、Wi-Fi和咖啡设施的使用权。",
    faq3Question: "Chaduna Hub在哪里？",
    faq3Answer: "Chaduna Hub位于Galaktion Tabidze街18号，自由广场附近，第比利斯市中心，老城区。我们靠近自由广场地铁站。",
    faq4Question: "你们的营业时间是什么？",
    faq4Answer: "我们每天10:00-20:00开放。",
    faq5Question: "你们有Wi-Fi吗？",
    faq5Answer: "是的，我们为所有会员提供高速Wi-Fi。我们的工作空间还包括咖啡设施和现代化设施。",
    feature1: "提供日票、周票和月票的灵活工作空间",
    feature2: "包含高速Wi-Fi",
    feature3: "咖啡设施使用权",
    feature4: "位于历史老城区，靠近自由广场地铁站",
    feature5: "现代化设施和舒适的工作空间",
    feature6: "每日10:00-20:00开放",
    feature7: "20% 折扣在Chaduna Cafe和Wine Bar for Hub members",
    audience: "数字游民、远程工作者、自由职业者、企业家、学生"
  },

  ar: {
    name: "Chaduna Hub",
    description: "مساحة عمل مشتركة في تبليسي بالقرب من ساحة الحرية، في وسط تبليسي، في المدينة القديمة. مساحة عمل مرنة مع تذاكر يومية وأسبوعية وشهرية. بالقرب من محطة مترو ساحة الحرية. مساحة عمل مريحة مع مرافق المقهى وواي فاي عالي السرعة ومرافق حديثة. يوميًا 10:00-20:00.",
    dayPass: "تذكرة يومية",
    weeklyPass: "تذكرة أسبوعية",
    monthlyPass: "عضوية شهرية",
    wifi: "واي فاي عالي السرعة",
    cafeAccess: "الوصول إلى المقهى",
    flexibleWorkspace: "مساحة عمل مرنة",
    faq1Question: "ما هو Chaduna Hub؟",
    faq1Answer: "Chaduna Hub هي مساحة عمل مشتركة مرنة في تبليسي، تقع بالقرب من ساحة الحرية في وسط تبليسي، في المدينة القديمة. نقدم تذاكر يومية وأسبوعية وشهرية. تتضمن مساحتنا مرافق المقهى وواي فاي عالي السرعة ومرافق حديثة.",
    faq2Question: "ما هي الأسعار؟",
    faq2Answer: "التذكرة اليومية: 30 GEL، التذكرة الأسبوعية: 100 GEL، العضوية الشهرية: 300 GEL. تشمل جميع الأسعار الوصول إلى مساحة العمل وواي فاي ومرافق المقهى.",
    faq3Question: "أين يقع Chaduna Hub؟",
    faq3Answer: "يقع Chaduna Hub في شارع Galaktion Tabidze 18، بالقرب من ساحة الحرية، في وسط تبليسي، في المدينة القديمة. نحن قريبون من محطة مترو ساحة الحرية.",
    faq4Question: "ما هي ساعات العمل لديكم؟",
    faq4Answer: "نحن مفتوحون يوميًا من 10:00 إلى 20:00.",
    faq5Question: "هل لديكم واي فاي؟",
    faq5Answer: "نعم، نقدم واي فاي عالي السرعة لجميع الأعضاء. تتضمن مساحة العمل لدينا أيضًا مرافق المقهى ومرافق حديثة.",
    feature1: "مساحة عمل مرنة مع خيارات يومية وأسبوعية وشهرية",
    feature2: "واي فاي عالي السرعة مشمول",
    feature3: "الوصول إلى مرافق المقهى",
    feature4: "يقع في المدينة القديمة التاريخية بالقرب من محطة مترو ساحة الحرية",
    feature5: "مرافق حديثة ومساحة عمل مريحة",
    feature6: "الوصول اليومي 10:00-20:00",
    feature7: "20% خصم في Chaduna Cafe و Wine Bar لأعضاء الHub",
    audience: "الرحالة الرقميون، العمال عن بُعد، المستقلون، رواد الأعمال، الطلاب"
  }
};

const cafeTranslations = {
  en: {
    description: "Cozy cafe and wine bar in Tbilisi near Liberty Square, downtown Tbilisi, old city. Famous for syrniki (cottage cheese pancakes), bruschetta, shakshuka, all-day breakfasts, and more than 60 types of wines. Close to Liberty Square metro station. Dine in or take out.",
    dineIn: "Dine in",
    takeOut: "Take out",
    popularItems: "Popular Items",
    wineSelection: "Wide wine selection",
    wineByGlass: "Wine by the glass",
    georgianWine: "Georgian wine",
    // FAQ translations
    faq1Question: "What is Chaduna famous for?",
    faq1Answer: "Chaduna is a cozy cafe and wine bar in Tbilisi, famous for syrniki (cottage cheese pancakes), bruschetta, shakshuka, breakfast, brunch, and a wide selection of Georgian and international wines. Located near Liberty Square in downtown Tbilisi, old city.",
    faq2Question: "Do you serve Georgian wine?",
    faq2Answer: "Yes, we offer a wide selection of Georgian and international wines including white, red, and amber wines by the glass. We also serve Chacha, a traditional Georgian spirit.",
    faq3Question: "Where is Chaduna located?",
    faq3Answer: "Chaduna is located at 18 Galaktion Tabidze Street, near Liberty Square, in downtown Tbilisi, old city. We are close to Liberty Square metro station, making us easily accessible.",
    faq4Question: "What are your opening hours?",
    faq4Answer: "We are open Tuesday through Sunday from 09:00 to 23:00, and Monday from 09:00 to 15:00.",
    faq5Question: "Do you offer takeout?",
    faq5Answer: "Yes, we offer both dine-in and takeout services. You can enjoy our food and wine in our cozy space or take it to go.",
    // Feature list translations
    feature1: "Famous for syrniki (cottage cheese pancakes)",
    feature2: "Wide selection of Georgian and international wines by the glass",
    feature3: "Located in historic old city near Liberty Square metro",
    feature4: "Cafe and wine bar combination",
    feature5: "International menu in 10 languages",
    feature6: "Breakfast, brunch, lunch, and dinner service",
    feature7: "All-day breakfast service",
    // Audience translations
    audience: "Tourists, Locals, Digital Nomads, Wine Enthusiasts, Food Lovers"
  },
  ru: {
    description: "Уютное кафе и винный бар в Тбилиси рядом с площадью Свободы, в центре города, в старом городе. Известны сырниками, брускеттой, завтраками весь день, и 60 видами вин. Близко к станции метро Площадь Свободы.",
    dineIn: "Есть зал",
    takeOut: "Навынос",
    popularItems: "Популярные блюда",
    wineSelection: "Широкий выбор вин",
    wineByGlass: "Вино бокалами",
    georgianWine: "Грузинское вино",
    faq1Question: "Чем славится Chaduna?",
    faq1Answer: "Chaduna - уютное кафе и винный бар в Тбилиси, известны сырниками (творожными оладьями), брускеттой, шакшукой, завтраком, бранчем и широким выбором грузинских вин. Расположены рядом с площадью Свободы в центре Тбилиси, в старом городе.",
    faq2Question: "Вы подаете грузинское вино?",
    faq2Answer: "Да, мы предлагаем широкий выбор грузинских вин, включая белые, красные и янтарные вина бокалами. Мы также подаем чачу, традиционный грузинский напиток.",
    faq3Question: "Где находится Chaduna?",
    faq3Answer: "Chaduna находится по адресу ул. Галактиона Табидзе, 18, рядом с площадью Свободы, в центре Тбилиси, в старом городе.",
    faq4Question: "Какие у вас часы работы?",
    faq4Answer: "Мы работаем со вторника по воскресенье с 09:00 до 23:00, и в понедельник с 09:00 до 15:00.",
    faq5Question: "Вы предлагаете еду на вынос?",
    faq5Answer: "Да, мы предлагаем как обслуживание в зале, так и на вынос. Вы можете насладиться нашей едой и вином в нашем уютном пространстве или взять заказ с собой.",
    feature1: "Славится сырниками (творожными оладьями)",
    feature2: "Широкий выбор грузинских вин по бокалам",
    feature3: "Расположены в историческом старом городе рядом с метро Площадь Свободы",
    feature4: "Комбинация кафе и винного бара",
    feature5: "Международное меню на 10 языках",
    feature6: "Подаём завтраки, бранчи, обеды и ужины",
    feature7: "Завтрак весь день",
    audience: "Туристы, Местные жители, Цифровые кочевники, Любители вина, Гурманы"
  },

  de: {
    description: "Gemütliches Café und Weinbar in Tiflis in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Bekannt für Syrniki (Quarkpfannkuchen), Bruschetta, Shakshuka, Frühstück, Brunch, Mittagessen und Abendessen. In der Nähe der U-Bahn-Station Freiheitsplatz. Vor Ort essen oder zum Mitnehmen.",
    dineIn: "Vor Ort essen",
    takeOut: "Zum Mitnehmen",
    popularItems: "Beliebte Gerichte",
    wineSelection: "Große Weinauswahl",
    wineByGlass: "Wein im Glas",
    georgianWine: "Georgischer Wein",
    faq1Question: "Wofür ist Chaduna bekannt?",
    faq1Answer: "Chaduna ist ein gemütliches Café und Weinbar in Tiflis, bekannt für Syrniki (Quarkpfannkuchen), Bruschetta, Shakshuka, Frühstück, Brunch und eine große Auswahl georgischer Weine. Gelegen in der Nähe des Freiheitsplatzes im Zentrum von Tiflis, in der Altstadt.",
    faq2Question: "Servieren Sie georgischen Wein?",
    faq2Answer: "Ja, wir bieten eine große Auswahl georgischer Weine, einschließlich Weiß-, Rot- und Bernsteinweine im Glas. Wir servieren auch Chacha, einen traditionellen georgischen Schnaps.",
    faq3Question: "Wo befindet sich Chaduna?",
    faq3Answer: "Chaduna befindet sich in der Galaktion Tabidze Straße 18, in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Wir sind in der Nähe der U-Bahn-Station Freiheitsplatz, was uns leicht erreichbar macht.",
    faq4Question: "Wie sind Ihre Öffnungszeiten?",
    faq4Answer: "Wir sind von Dienstag bis Sonntag von 09:00 bis 23:00 Uhr geöffnet, und montags von 09:00 bis 15:00 Uhr.",
    faq5Question: "Bieten Sie Essen zum Mitnehmen an?",
    faq5Answer: "Ja, wir bieten sowohl Vor-Ort-Service als auch Essen zum Mitnehmen. Sie können unser Essen und Wein in unserem gemütlichen Raum genießen oder zum Mitnehmen bestellen.",
    feature1: "Bekannt für Syrniki (Quarkpfannkuchen)",
    feature2: "Große Auswahl georgischer Weine im Glas",
    feature3: "Gelegen in der historischen Altstadt in der Nähe der U-Bahn-Station Freiheitsplatz",
    feature4: "Kombination aus Café und Weinbar",
    feature5: "Internationales Menü in 10 Sprachen",
    feature6: "Frühstück, Brunch, Mittagessen und Abendessen",
    feature7: "Frühstücksservice rund um die Uhr",
    audience: "Touristen, Einheimische, Digitale Nomaden, Weinkenner, Feinschmecker"
	},

	tr: {
    description: "Tiflis'te Özgürlük Meydanı yakınında, şehir merkezinde, eski şehirde samimi bir kafe ve şarap barı. Syrniki (lor peyniri kızartması), bruschetta, shakshuka, kahvaltı, brunch, öğle yemeği ve akşam yemeği ile ünlü. Özgürlük Meydanı metro istasyonuna yakın. İçeride yemek veya paket servis.",
    dineIn: "İçeride yemek",
    takeOut: "Paket servis",
    popularItems: "Popüler Yemekler",
    wineSelection: "Geniş içecek seçeneği",
    wineByGlass: "İçecek bardağa",
    georgianWine: "Grup İçecekleri",
    faq1Question: "Chaduna neyle ünlü?",
    faq1Answer: "Chaduna, Tiflis'te samimi bir kafe ve şarap barıdır. Syrniki (lor peyniri kızartması), bruschetta, shakshuka, kahvaltı, brunch ve geniş bir Gürcü şarap seçkisi ile ünlüdür. Özgürlük Meydanı yakınında, şehir merkezinde, eski şehirde yer almaktadır.",
    faq2Question: "Gürcü şarabı servis ediyor musunuz?",
    faq2Answer: "Evet, beyaz, kırmızı ve kehribar şarapları bardağa dahil olmak üzere geniş bir Gürcü şarap seçkisi sunuyoruz. Ayrıca geleneksel bir Gürcü içkisi olan Chacha da servis ediyoruz.",
    faq3Question: "Chaduna nerede bulunuyor?",
    faq3Answer: "Chaduna, Galaktion Tabidze Caddesi 18 numarada, Özgürlük Meydanı yakınında, Tiflis şehir merkezinde, eski şehirde yer almaktadır. Özgürlük Meydanı metro istasyonuna yakınız, bu da bizi kolayca erişilebilir kılıyor.",
    faq4Question: "Çalışma saatleriniz nedir?",
    faq4Answer: "Salı'dan Pazar'a 09:00-23:00, Pazartesi 09:00-15:00 saatleri arasında açığız.",
    faq5Question: "Paket servis sunuyor musunuz?",
    faq5Answer: "Evet, hem içeride yemek hem de paket servis hizmeti sunuyoruz. Yemeklerimizi ve şarabımızı samimi mekanımızda tadabilir veya paket servis olarak alabilirsiniz.",
    feature1: "Syrniki (lor peyniri kızartması) ile ünlü",
    feature2: "Bardağa geniş Gürcü şarap seçkisi",
    feature3: "Özgürlük Meydanı metro istasyonu yakınında tarihi eski şehirde konumlanmış",
    feature4: "Kafe ve şarap barı kombinasyonu",
    feature5: "10 dilde uluslararası menü",
    feature6: "Kahvaltı, brunch, öğle yemeği ve akşam yemeği servisi",
    feature7: "Tüm gün kahvaltı hizmeti",
    audience: "Turistler, Yerel Halk, Dijital Göçebeler, Şarap Severler, Yemek Severler"
	},

	fr: {
    description: "Café cosy et bar à vin à Tbilissi près de la place de la Liberté, au centre-ville de Tbilissi, dans la vieille ville. Célèbre pour les syrniki (crêpes au fromage blanc), bruschetta, shakshuka, petit-déjeuner, brunch, déjeuner et dîner. Près de la station de métro place de la Liberté. Sur place ou à emporter.",
    dineIn: "Sur place",
    takeOut: "À emporter",
    popularItems: "Plats populaires",
    wineSelection: "Large sélection de vins",
    wineByGlass: "Vin par verre",
    georgianWine: "Vin géorgien",
    faq1Question: "Pour quoi Chaduna est-il célèbre?",
    faq1Answer: "Chaduna est un café cosy et bar à vin à Tbilissi, célèbre pour les syrniki (crêpes au fromage blanc), bruschetta, shakshuka, petit-déjeuner, brunch et une large sélection de vins géorgiens. Situé près de la place de la Liberté au centre-ville de Tbilissi, dans la vieille ville.",
    faq2Question: "Servez-vous du vin géorgien?",
    faq2Answer: "Oui, nous offrons une large sélection de vins géorgiens, y compris les vins blancs, rouges et ambrés au verre. Nous servons également le Chacha, une eau-de-vie géorgienne traditionnelle.",
    faq3Question: "Où se trouve Chaduna?",
    faq3Answer: "Chaduna se trouve au 18 rue Galaktion Tabidze, près de la place de la Liberté, au centre-ville de Tbilissi, dans la vieille ville. Nous sommes près de la station de métro place de la Liberté, ce qui nous rend facilement accessibles.",
    faq4Question: "Quels sont vos horaires d'ouverture?",
    faq4Answer: "Nous sommes ouverts du mardi au dimanche de 09h00 à 23h00, et le lundi de 09h00 à 15h00.",
    faq5Question: "Offrez-vous la vente à emporter?",
    faq5Answer: "Oui, nous offrons à la fois le service sur place et à emporter. Vous pouvez déguster notre nourriture et vin dans notre espace cosy ou l'emporter.",
    feature1: "Célèbre pour les syrniki (crêpes au fromage blanc)",
    feature2: "Large sélection de vins géorgiens au verre",
    feature3: "Situé dans la vieille ville historique près de la station de métro place de la Liberté",
    feature4: "Combinaison café et bar à vin",
    feature5: "Menu international en 10 langues",
    feature6: "Service petit-déjeuner, brunch, déjeuner et dîner",
    feature7: "Service petit-déjeuner toute la journée",
    audience: "Touristes, Locaux, Nomades Numériques, Amateurs de Vin, Gourmets"
	},

	es: {
    description: "Acogedor café y bar de vinos en Tbilisi cerca de la Plaza de la Libertad, en el centro de Tbilisi, en la ciudad vieja. Famoso por syrniki (tortitas de requesón), bruschetta, shakshuka, desayuno, brunch, almuerzo y cena. Cerca de la estación de metro Plaza de la Libertad. Comer aquí o para llevar.",
    dineIn: "Comer aquí",
    takeOut: "Para llevar",
    popularItems: "Platos populares",
    wineSelection: "Gran selección de vinos",
    wineByGlass: "Vino por vaso",
    georgianWine: "Vino georgiano",
    faq1Question: "¿Por qué es famoso Chaduna?",
    faq1Answer: "Chaduna es un acogedor café y bar de vinos en Tbilisi, famoso por syrniki (tortitas de requesón), bruschetta, shakshuka, desayuno, brunch y una amplia selección de vinos georgianos. Ubicado cerca de la Plaza de la Libertad en el centro de Tbilisi, en la ciudad vieja.",
    faq2Question: "¿Sirven vino georgiano?",
    faq2Answer: "Sí, ofrecemos una amplia selección de vinos georgianos, incluyendo vinos blancos, tintos y ámbar por vaso. También servimos Chacha, un licor tradicional georgiano.",
    faq3Question: "¿Dónde está ubicado Chaduna?",
    faq3Answer: "Chaduna está ubicado en la calle Galaktion Tabidze 18, cerca de la Plaza de la Libertad, en el centro de Tbilisi, en la ciudad vieja. Estamos cerca de la estación de metro Plaza de la Libertad, lo que nos hace fácilmente accesibles.",
    faq4Question: "¿Cuáles son sus horarios de apertura?",
    faq4Answer: "Estamos abiertos de martes a domingo de 09:00 a 23:00, y los lunes de 09:00 a 15:00.",
    faq5Question: "¿Ofrecen comida para llevar?",
    faq5Answer: "Sí, ofrecemos tanto servicio para comer aquí como para llevar. Puede disfrutar de nuestra comida y vino en nuestro acogedor espacio o llevarlo para llevar.",
    feature1: "Famoso por syrniki (tortitas de requesón)",
    feature2: "Amplia selección de vinos georgianos por vaso",
    feature3: "Ubicado en la ciudad vieja histórica cerca de la estación de metro Plaza de la Libertad",
    feature4: "Combinación de café y bar de vinos",
    feature5: "Menú internacional en 10 idiomas",
    feature6: "Servicio de desayuno, brunch, almuerzo y cena",
    feature7: "Servicio de desayuno todo el día",
    audience: "Turistas, Locales, Nómadas Digitales, Enófilos, Amantes de la Comida"
	},

	it: {
    description: "Accogliente caffè e wine bar a Tbilisi vicino a Piazza della Libertà, nel centro di Tbilisi, nella città vecchia. Famoso per syrniki (frittelle di ricotta), bruschetta, shakshuka, colazione, brunch, pranzo e cena. Vicino alla stazione della metropolitana Piazza della Libertà. Da asporto o da mangiare qui.",
    dineIn: "Da mangiare qui",
    takeOut: "Da asporto",
    popularItems: "Piatti popolari",
    wineSelection: "Grande selezione di vini",
    wineByGlass: "Vino per bicchiere",
    georgianWine: "Vino georgiano",
    faq1Question: "Per cosa è famoso Chaduna?",
    faq1Answer: "Chaduna è un accogliente caffè e wine bar a Tbilisi, famoso per syrniki (frittelle di ricotta), bruschetta, shakshuka, colazione, brunch e un'ampia selezione di vini georgiani. Situato vicino a Piazza della Libertà nel centro di Tbilisi, nella città vecchia.",
    faq2Question: "Servite vino georgiano?",
    faq2Answer: "Sì, offriamo un'ampia selezione di vini georgiani, inclusi vini bianchi, rossi e ambrati al bicchiere. Serviamo anche Chacha, un liquore tradizionale georgiano.",
    faq3Question: "Dove si trova Chaduna?",
    faq3Answer: "Chaduna si trova in via Galaktion Tabidze 18, vicino a Piazza della Libertà, nel centro di Tbilisi, nella città vecchia. Siamo vicini alla stazione della metropolitana Piazza della Libertà, il che ci rende facilmente accessibili.",
    faq4Question: "Quali sono i vostri orari di apertura?",
    faq4Answer: "Siamo aperti dal martedì alla domenica dalle 09:00 alle 23:00, e il lunedì dalle 09:00 alle 15:00.",
    faq5Question: "Offrite cibo da asporto?",
    faq5Answer: "Sì, offriamo sia servizio da mangiare qui che da asporto. Potete gustare il nostro cibo e vino nel nostro spazio accogliente o portarlo via.",
    feature1: "Famoso per syrniki (frittelle di ricotta)",
    feature2: "Ampia selezione di vini georgiani al bicchiere",
    feature3: "Situato nella città vecchia storica vicino alla stazione della metropolitana Piazza della Libertà",
    feature4: "Combinazione di caffè e wine bar",
    feature5: "Menu internazionale in 10 lingue",
    feature6: "Servizio colazione, brunch, pranzo e cena",
    feature7: "Servizio colazione tutto il giorno",
    audience: "Turisti, Locali, Nomadi Digitali, Appassionati di Vino, Gourmet"
	},

	ka: {
    description: "მყუდრო კაფე და ღვინის ბარი თბილისში თავისუფლების მოედნის მახლობლად, ცენტრში, ძველ ქალაქში. ცნობილია სირნიკებით, ბრუსკეტით, შაქშუკით, საუზმით, ბრანჩით, ლანჩით და ვახშმით. თავისუფლების მოედნის მეტროსადგურთან ახლოს. დარბაზში ან წასაღებად.",
    dineIn: "დარბაზში",
    takeOut: "წასაღებად",
    popularItems: "პოპულარული კერძები",
    wineSelection: "გრძელი ვინის მორგება",
    wineByGlass: "ვინი ბურგერით",
    georgianWine: "ქართული ვინი",
    faq1Question: "რით არის ცნობილი Chaduna?",
    faq1Answer: "Chaduna არის მყუდრო კაფე და ღვინის ბარი თბილისში, ცნობილია სირნიკებით (ნაყინის ბლინებით), ბრუსკეტით, შაქშუკით, საუზმით, ბრანჩით და ქართული ღვინის ფართო არჩევანით. მდებარეობს თავისუფლების მოედნის მახლობლად, ცენტრში, ძველ ქალაქში.",
    faq2Question: "ქართული ღვინო გაქვთ?",
    faq2Answer: "დიახ, ვთავაზობთ ქართული ღვინის ფართო არჩევანს, მათ შორის თეთრ, წითელ და ქარვისფერ ღვინოებს ბურგერით. ასევე ვმსახურობთ ჩაჩას, ტრადიციულ ქართულ სპირტს.",
    faq3Question: "სად მდებარეობს Chaduna?",
    faq3Answer: "Chaduna მდებარეობს გალაქტიონ ტაბიძის ქუჩა 18-ში, თავისუფლების მოედნის მახლობლად, თბილისის ცენტრში, ძველ ქალაქში. ვართ თავისუფლების მოედნის მეტროსადგურთან ახლოს, რაც ხდის ჩვენ მიწვდომად.",
    faq4Question: "რა გაქვთ სამუშაო საათები?",
    faq4Answer: "ვართ ღია სამშაბათიდან კვირამდე 09:00-23:00, ხოლო ორშაბათს 09:00-15:00.",
    faq5Question: "გაქვთ წასაღებად მომსახურება?",
    faq5Answer: "დიახ, ვთავაზობთ როგორც დარბაზში, ასევე წასაღებად მომსახურებას. შეგიძლიათ ისიამოვნოთ ჩვენი საჭმლით და ღვინით ჩვენს მყუდრო სივრცეში ან წაიღოთ წასაღებად.",
    feature1: "ცნობილია სირნიკებით (ნაყინის ბლინებით)",
    feature2: "ქართული ღვინის ფართო არჩევანი ბურგერით",
    feature3: "მდებარეობს ისტორიულ ძველ ქალაქში თავისუფლების მოედნის მეტროსადგურთან ახლოს",
    feature4: "კაფესა და ღვინის ბარის კომბინაცია",
    feature5: "10 ენაზე საერთაშორისო მენიუ",
    feature6: "საუზმის, ბრანჩის, ლანჩისა და ვახშმის მომსახურება",
    feature7: "ყოველდღიური საუზმის მომსახურება",
    audience: "ტურისტები, ადგილობრივები, ციფრული ნომადები, ღვინის მოყვარულები, გურმანები"
	},

	zh: {
    description: "第比利斯舒适的咖啡馆和葡萄酒吧，位于自由广场附近，市中心，老城区。以syrniki（白软干酪煎饼）、意式烤面包、shakshuka、早餐、早午餐、午餐和晚餐而闻名。靠近自由广场地铁站。堂食或外带。",
    dineIn: "堂食",
    takeOut: "外带",
    popularItems: "热门菜品",
    wineSelection: "丰富的葡萄酒选择",
    wineByGlass: "葡萄酒杯装",
    georgianWine: "格鲁吉亚葡萄酒",
    faq1Question: "Chaduna以什么闻名？",
    faq1Answer: "Chaduna是第比利斯一家舒适的咖啡馆和葡萄酒吧，以syrniki（白软干酪煎饼）、意式烤面包、shakshuka、早餐、早午餐和精选格鲁吉亚葡萄酒而闻名。位于自由广场附近，市中心，老城区。",
    faq2Question: "你们提供格鲁吉亚葡萄酒吗？",
    faq2Answer: "是的，我们提供精选的格鲁吉亚葡萄酒，包括白葡萄酒、红葡萄酒和琥珀葡萄酒杯装。我们还提供Chacha，一种传统的格鲁吉亚烈酒。",
    faq3Question: "Chaduna在哪里？",
    faq3Answer: "Chaduna位于Galaktion Tabidze街18号，自由广场附近，第比利斯市中心，老城区。我们靠近自由广场地铁站，交通便利。",
    faq4Question: "你们的营业时间是什么？",
    faq4Answer: "我们周二至周日09:00-23:00营业，周一09:00-15:00营业。",
    faq5Question: "你们提供外带服务吗？",
    faq5Answer: "是的，我们提供堂食和外带服务。您可以在我们舒适的空间内享用我们的食物和葡萄酒，也可以外带。",
    feature1: "以syrniki（白软干酪煎饼）闻名",
    feature2: "精选格鲁吉亚葡萄酒杯装",
    feature3: "位于历史老城区，靠近自由广场地铁站",
    feature4: "咖啡馆和葡萄酒吧结合",
    feature5: "10种语言的国际菜单",
    feature6: "早餐、早午餐、午餐和晚餐服务",
    feature7: "全天早餐服务",
    audience: "游客、本地人、数字游民、葡萄酒爱好者、美食爱好者"
	},

	ar: {
    description: "مقهى وبار نبيذ دافئ في تبليسي بالقرب من ساحة الحرية، في وسط تبليسي، في المدينة القديمة. مشهور بسيرنيكي (فطائر الجبن القريش)، بروشيتا، شكشوكة، الإفطار، برانش، الغداء والعشاء. بالقرب من محطة مترو ساحة الحرية. تناول الطعام في المطعم أو الطلبات الخارجية.",
    dineIn: "تناول الطعام في المطعم",
    takeOut: "الطلبات الخارجية",
    popularItems: "الأطباق الشعبية",
    wineSelection: "اختيار واسع من النبيذ",
    wineByGlass: "نبيذ بالكأس",
    georgianWine: "نبيذ جورجي",
    faq1Question: "بماذا تشتهر Chaduna؟",
    faq1Answer: "Chaduna هو مقهى وبار نبيذ دافئ في تبليسي، مشهور بسيرنيكي (فطائر الجبن القريش)، بروشيتا، شكشوكة، الإفطار، برانش ومجموعة واسعة من النبيذ الجورجي. يقع بالقرب من ساحة الحرية في وسط تبليسي، في المدينة القديمة.",
    faq2Question: "هل تقدمون النبيذ الجورجي؟",
    faq2Answer: "نعم، نقدم مجموعة واسعة من النبيذ الجورجي بما في ذلك النبيذ الأبيض والأحمر والعنبر بالكأس. نقدم أيضًا شاكاش، وهو مشروب جورجي تقليدي.",
    faq3Question: "أين يقع Chaduna؟",
    faq3Answer: "يقع Chaduna في شارع Galaktion Tabidze 18، بالقرب من ساحة الحرية، في وسط تبليسي، في المدينة القديمة. نحن قريبون من محطة مترو ساحة الحرية، مما يجعلنا في متناول اليد بسهولة.",
    faq4Question: "ما هي ساعات العمل لديكم؟",
    faq4Answer: "نحن مفتوحون من الثلاثاء إلى الأحد من 09:00 إلى 23:00، والاثنين من 09:00 إلى 15:00.",
    faq5Question: "هل تقدمون طلبات خارجية؟",
    faq5Answer: "نعم، نقدم خدمة تناول الطعام في المطعم والطلبات الخارجية. يمكنك الاستمتاع بطعامنا ونبيذنا في مساحتنا الدافئة أو أخذه للخارج.",
    feature1: "مشهور بسيرنيكي (فطائر الجبن القريش)",
    feature2: "مجموعة واسعة من النبيذ الجورجي بالكأس",
    feature3: "يقع في المدينة القديمة التاريخية بالقرب من محطة مترو ساحة الحرية",
    feature4: "مزيج من المقهى وبار النبيذ",
    feature5: "قائمة دولية بـ 10 لغات",
    feature6: "خدمة الإفطار والبرانش والغداء والعشاء",
    feature7: "خدمة الإفطار اليومية",
    audience: "السياح، السكان المحليون، الرحالة الرقميون، عشاق النبيذ، عشاق الطعام"
	}
};