document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'https://chaduna.bar';
  
  // Detect page language from HTML lang attribute
  const pageLang = document.documentElement.lang || 'en';
  
  // Detect if this is the hub page
  const isHubPage = document.body.classList.contains('hub-page') || 
                    window.location.pathname.includes('hub.html');
  
  if (isHubPage) {
    // Generate coworking space structured data
    generateHubStructuredData(baseUrl, pageLang);
  } else {
    // Generate restaurant structured data (existing code)
    generateRestaurantStructuredData(baseUrl, pageLang);
  }
});

function generateHubStructuredData(baseUrl, pageLang) {
  const hubTranslations = {
    en: {
      name: "Chaduna Hub",
      description: "Coworking space in Tbilisi near Liberty Square, downtown Tbilisi, old city. Flexible workspace with day passes, weekly and monthly memberships. Close to Liberty Square metro station. Comfortable workspace with cafe amenities, high-speed Wi-Fi, and modern facilities. Daily 10:00-20:00.",
      dayPass: "Day Pass",
      weeklyPass: "Weekly Pass",
      monthlyPass: "Monthly Membership",
      wifi: "High-Speed Wi-Fi",
      cafeAccess: "Cafe Access",
      flexibleWorkspace: "Flexible Workspace"
    },
    ru: {
      name: "Chaduna Hub",
      description: "Коворкинг в Тбилиси рядом с площадью Свободы, в центре города, в старом городе. Гибкое рабочее пространство с дневными абонементами, недельными и месячными членствами. Близко к станции метро Площадь Свободы. Удобное рабочее пространство с удобствами кафе, высокоскоростным Wi-Fi и современными удобствами. Ежедневно 10:00-20:00.",
      dayPass: "Дневной абонемент",
      weeklyPass: "Недельный абонемент",
      monthlyPass: "Месячное членство",
      wifi: "Высокоскоростной Wi-Fi",
      cafeAccess: "Доступ к кафе",
      flexibleWorkspace: "Гибкое рабочее пространство"
    },
    de: {
      name: "Chaduna Hub",
      description: "Coworking-Space in Tiflis in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Flexibler Arbeitsplatz mit Tagespässen, wöchentlichen und monatlichen Mitgliedschaften. In der Nähe der U-Bahn-Station Freiheitsplatz. Komfortabler Arbeitsplatz mit Café-Ausstattung, schnellem WLAN und modernen Einrichtungen. Täglich 10:00-20:00.",
      dayPass: "Tagespass",
      weeklyPass: "Wochenpass",
      monthlyPass: "Monatsmitgliedschaft",
      wifi: "Schnelles WLAN",
      cafeAccess: "Café-Zugang",
      flexibleWorkspace: "Flexibler Arbeitsplatz"
    },
    tr: {
      name: "Chaduna Hub",
      description: "Tiflis'te koworking alanı. Günlük, haftalık ve aylık üyeliklerle esnek çalışma alanı. Kafe olanakları, yüksek hızlı Wi-Fi ve modern tesislere sahip rahat çalışma alanı. Günlük 10:00-20:00.",
      dayPass: "Günlük Geçiş",
      weeklyPass: "Haftalık Geçiş",
      monthlyPass: "Aylık Üyelik",
      wifi: "Yüksek Hızlı Wi-Fi",
      cafeAccess: "Kafe Erişimi",
      flexibleWorkspace: "Esnek Çalışma Alanı"
    },
    fr: {
      name: "Chaduna Hub",
      description: "Espace de coworking à Tbilissi. Espace de travail flexible avec passes journaliers, hebdomadaires et mensuels. Espace de travail confortable avec commodités de café, Wi-Fi haut débit et installations modernes. Quotidien 10:00-20:00.",
      dayPass: "Pass journalier",
      weeklyPass: "Pass hebdomadaire",
      monthlyPass: "Adhésion mensuelle",
      wifi: "Wi-Fi haut débit",
      cafeAccess: "Accès au café",
      flexibleWorkspace: "Espace de travail flexible"
    },
    es: {
      name: "Chaduna Hub",
      description: "Espacio de coworking en Tbilisi. Espacio de trabajo flexible con pases diarios, semanales y mensuales. Espacio de trabajo cómodo con comodidades de café, Wi-Fi de alta velocidad e instalaciones modernas. Diario 10:00-20:00.",
      dayPass: "Pase diario",
      weeklyPass: "Pase semanal",
      monthlyPass: "Membresía mensual",
      wifi: "Wi-Fi de alta velocidad",
      cafeAccess: "Acceso al café",
      flexibleWorkspace: "Espacio de trabajo flexible"
    },
    it: {
      name: "Chaduna Hub",
      description: "Spazio coworking a Tbilisi. Spazio di lavoro flessibile con pass giornalieri, settimanali e mensili. Spazio di lavoro confortevole con servizi caffè, Wi-Fi ad alta velocità e strutture moderne. Giornaliero 10:00-20:00.",
      dayPass: "Pass giornaliero",
      weeklyPass: "Pass settimanale",
      monthlyPass: "Abbonamento mensile",
      wifi: "Wi-Fi ad alta velocità",
      cafeAccess: "Accesso al caffè",
      flexibleWorkspace: "Spazio di lavoro flessibile"
    },
    ka: {
      name: "Chaduna Hub",
      description: "კოვორკინგი თბილისში. მოქნილი სამუშაო სივრცე დღიური, კვირეული და თვიური წევრობით. კომფორტული სამუშაო სივრცე კაფეს უზრუნველყოფით, მაღალსიჩქარიანი Wi-Fi-ით და თანამედროვე ობიექტებით. ყოველდღე 10:00-20:00.",
      dayPass: "დღიური ბილეთი",
      weeklyPass: "კვირეული ბილეთი",
      monthlyPass: "თვიური წევრობა",
      wifi: "მაღალსიჩქარიანი Wi-Fi",
      cafeAccess: "კაფეს წვდომა",
      flexibleWorkspace: "მოქნილი სამუშაო სივრცე"
    },
    zh: {
      name: "Chaduna Hub",
      description: "第比利斯的联合办公空间。提供日票、周票和月票的灵活工作空间。舒适的工作空间，配备咖啡设施、高速Wi-Fi和现代化设施。每日10:00-20:00。",
      dayPass: "日票",
      weeklyPass: "周票",
      monthlyPass: "月会员",
      wifi: "高速Wi-Fi",
      cafeAccess: "咖啡厅使用权",
      flexibleWorkspace: "灵活工作空间"
    },
    ar: {
      name: "Chaduna Hub",
      description: "مساحة عمل مشتركة في تبليسي. مساحة عمل مرنة مع تذاكر يومية وأسبوعية وشهرية. مساحة عمل مريحة مع مرافق المقهى وواي فاي عالي السرعة ومرافق حديثة. يوميًا 10:00-20:00.",
      dayPass: "تذكرة يومية",
      weeklyPass: "تذكرة أسبوعية",
      monthlyPass: "عضوية شهرية",
      wifi: "واي فاي عالي السرعة",
      cafeAccess: "الوصول إلى المقهى",
      flexibleWorkspace: "مساحة عمل مرنة"
    }
  };
  
  const t = hubTranslations[pageLang] || hubTranslations.en;
  
  // Extract pricing from page
  const pricingText = document.querySelector('.hub-pricing')?.textContent || '';
  const dayPrice = pricingText.match(/(\d+)GEL\/day/)?.[1] || '30';
  const weekPrice = pricingText.match(/(\d+)GEL\/week/)?.[1] || '100';
  const monthPrice = pricingText.match(/(\d+)GEL\/month/)?.[1] || '300';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": t.name,
    "alternateName": ".hub",
    "description": t.description,
    "inLanguage": pageLang,
    "image": `${baseUrl}/assets/img/logos/chaduna-white.png`,
    "url": `${baseUrl}/hub.html`,
    "@id": `${baseUrl}/hub.html`,
    "telephone": "+995557629229",
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:00"
      }
    ],
    "priceRange": "₾₾",
    "sameAs": ["https://www.instagram.com/chaduna.hub"],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": t.wifi, "value": true },
      { "@type": "LocationFeatureSpecification", "name": t.cafeAccess, "value": true },
      { "@type": "LocationFeatureSpecification", "name": t.flexibleWorkspace, "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Day Pass Available", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Monthly Membership", "value": true }
    ],
    "makesOffer": [
      {
        "@type": "Offer",
        "name": t.dayPass,
        "description": "Day pass for coworking space access",
        "price": dayPrice,
        "priceCurrency": "GEL",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      },
      {
        "@type": "Offer",
        "name": t.weeklyPass,
        "description": "Weekly pass for coworking space access",
        "price": weekPrice,
        "priceCurrency": "GEL",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      },
      {
        "@type": "Offer",
        "name": t.monthlyPass,
        "description": "Monthly membership for coworking space access",
        "price": monthPrice,
        "priceCurrency": "GEL",
        "availability": "https://schema.org/InStock",
        "validFrom": "2024-01-01"
      }
    ],
    "keywords": "coworking space tbilisi, shared workspace tbilisi, flexible workspace, day pass coworking, monthly coworking membership, workspace tbilisi, office space tbilisi, hot desk tbilisi, cafe coworking, liberty square coworking, downtown tbilisi coworking, old city tbilisi coworking, liberty square metro coworking, tbilisi coworking near metro"
  };
  
  // Inject
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

function generateRestaurantStructuredData(baseUrl, pageLang) {
  const translations = {
    en: {
      description: "Cozy cafe and wine bar in Tbilisi near Liberty Square, downtown Tbilisi, old city. Famous for syrniki (cottage cheese pancakes), bruschetta, shakshuka, breakfast, brunch, lunch, and dinner. Close to Liberty Square metro station. Dine in or take out.",
      dineIn: "Dine in",
      takeOut: "Take out",
      popularItems: "Popular Items",
      wineSelection: "Wide wine selection",
      wineByGlass: "Wine by the glass",
      georgianWine: "Georgian wine"
    },
    ru: {
      description: "Уютное кафе и винный бар в Тбилиси рядом с площадью Свободы, в центре города, в старом городе. Известны сырниками, брускеттой, шакшукой, завтраком, бранчем, обедом и ужином. Близко к станции метро Площадь Свободы.",
      dineIn: "Есть зал",
      takeOut: "Навынос",
      popularItems: "Популярные блюда",
      wineSelection: "Широкий выбор вин",
      wineByGlass: "Вино бокалами",
      georgianWine: "Грузинское вино"
    },
    de: {
      description: "Gemütliches Café und Weinbar in Tiflis in der Nähe des Freiheitsplatzes, im Zentrum von Tiflis, in der Altstadt. Bekannt für Syrniki (Quarkpfannkuchen), Bruschetta, Shakshuka, Frühstück, Brunch, Mittagessen und Abendessen. In der Nähe der U-Bahn-Station Freiheitsplatz. Vor Ort essen oder zum Mitnehmen.",
      dineIn: "Vor Ort essen",
      takeOut: "Zum Mitnehmen",
      popularItems: "Beliebte Gerichte",
      wineSelection: "Große Weinauswahl",
      wineByGlass: "Wein im Glas",
      georgianWine: "Georgischer Wein"
    },
    tr: {
      description: "Tiflis'te Özgürlük Meydanı yakınında, şehir merkezinde, eski şehirde samimi bir kafe ve şarap barı. Syrniki (lor peyniri kızartması), bruschetta, shakshuka, kahvaltı, brunch, öğle yemeği ve akşam yemeği ile ünlü. Özgürlük Meydanı metro istasyonuna yakın. İçeride yemek veya paket servis.",
      dineIn: "İçeride yemek",
      takeOut: "Paket servis",
      popularItems: "Popüler Yemekler",
      wineSelection: "Geniş içecek seçeneği",
      wineByGlass: "İçecek bardağa",
      georgianWine: "Grup İçecekleri"
    },
    fr: {
      description: "Café cosy et bar à vin à Tbilissi près de la place de la Liberté, au centre-ville de Tbilissi, dans la vieille ville. Célèbre pour les syrniki (crêpes au fromage blanc), bruschetta, shakshuka, petit-déjeuner, brunch, déjeuner et dîner. Près de la station de métro place de la Liberté. Sur place ou à emporter.",
      dineIn: "Sur place",
      takeOut: "À emporter",
      popularItems: "Plats populaires",
      wineSelection: "Large sélection de vins",
      wineByGlass: "Vin par verre",
      georgianWine: "Vin géorgien"
    },
    es: {
      description: "Acogedor café y bar de vinos en Tbilisi cerca de la Plaza de la Libertad, en el centro de Tbilisi, en la ciudad vieja. Famoso por syrniki (tortitas de requesón), bruschetta, shakshuka, desayuno, brunch, almuerzo y cena. Cerca de la estación de metro Plaza de la Libertad. Comer aquí o para llevar.",
      dineIn: "Comer aquí",
      takeOut: "Para llevar",
      popularItems: "Platos populares",
      wineSelection: "Gran selección de vinos",
      wineByGlass: "Vino por vaso",
      georgianWine: "Vino georgiano"
    },
    it: {
      description: "Accogliente caffè e wine bar a Tbilisi vicino a Piazza della Libertà, nel centro di Tbilisi, nella città vecchia. Famoso per syrniki (frittelle di ricotta), bruschetta, shakshuka, colazione, brunch, pranzo e cena. Vicino alla stazione della metropolitana Piazza della Libertà. Da asporto o da mangiare qui.",
      dineIn: "Da mangiare qui",
      takeOut: "Da asporto",
      popularItems: "Piatti popolari",
      wineSelection: "Grande selezione di vini",
      wineByGlass: "Vino per bicchiere",
      georgianWine: "Vino georgiano"
    },
    ka: {
      description: "მყუდრო კაფე და ღვინის ბარი თბილისში თავისუფლების მოედნის მახლობლად, ცენტრში, ძველ ქალაქში. ცნობილია სირნიკებით, ბრუსკეტით, შაქშუკით, საუზმით, ბრანჩით, ლანჩით და ვახშმით. თავისუფლების მოედნის მეტროსადგურთან ახლოს. დარბაზში ან წასაღებად.",
      dineIn: "დარბაზში",
      takeOut: "წასაღებად",
      popularItems: "პოპულარული კერძები",
      wineSelection: "გრძელი ვინის მორგება",
      wineByGlass: "ვინი ბურგერით",
      georgianWine: "ქართული ვინი"
    },
    zh: {
      description: "第比利斯舒适的咖啡馆和葡萄酒吧，位于自由广场附近，市中心，老城区。以syrniki（白软干酪煎饼）、意式烤面包、shakshuka、早餐、早午餐、午餐和晚餐而闻名。靠近自由广场地铁站。堂食或外带。",
      dineIn: "堂食",
      takeOut: "外带",
      popularItems: "热门菜品",
      wineSelection: "丰富的葡萄酒选择",
      wineByGlass: "葡萄酒杯装",
      georgianWine: "格鲁吉亚葡萄酒"
    },
    ar: {
      description: "مقهى وبار نبيذ دافئ في تبليسي بالقرب من ساحة الحرية، في وسط تبليسي، في المدينة القديمة. مشهور بسيرنيكي (فطائر الجبن القريش)، بروشيتا، شكشوكة، الإفطار، برانش، الغداء والعشاء. بالقرب من محطة مترو ساحة الحرية. تناول الطعام في المطعم أو الطلبات الخارجية.",
      dineIn: "تناول الطعام في المطعم",
      takeOut: "الطلبات الخارجية",
      popularItems: "الأطباق الشعبية",
      wineSelection: "اختيار واسع من النبيذ",
      wineByGlass: "نبيذ بالكأس",
      georgianWine: "نبيذ جورجي"
    }
  };
  
  const t = translations[pageLang] || translations.en;
  
  // Enhanced description with keywords
  const metaDescription = document.querySelector('meta[name="description"]')?.content;
  const enhancedDescription = metaDescription || t.description;
  
  // Base Restaurant Data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "Bar", "Cafe"],
    "name": "Chaduna",
    "alternateName": "Cafe Chaduna",
    "description": enhancedDescription,
    "inLanguage": pageLang,
    "image": `${baseUrl}/assets/img/logos/chaduna-white.png`,
    "url": baseUrl,
    "@id": baseUrl,
    "telephone": "+995557629229",
    "priceRange": "₾₾",
    "servesAlcohol": true,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "18 Galaktion Tabidze Street",
      "addressLocality": "Tbilisi",
      "addressRegion": "Tbilisi",
      "postalCode": "0108",
      "addressCountry": "GE",
      "areaServed": {
        "@type": "City",
        "name": "Tbilisi"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 41.6904705,
      "longitude": 44.8013647
    },
    "containedInPlace": {
      "@type": "Place",
      "name": "Liberty Square, Downtown Tbilisi, Old City"
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
    "servesCuisine": ["Georgian", "European", "Cafe", "Breakfast", "Brunch", "Lunch", "Dinner", "White wine", "Red wine", "Rose wine", "Amber Wine", "Georgian wine", "Chacha"],
    "sameAs": ["https://www.instagram.com/cafechaduna"],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": t.dineIn, "value": true },
      { "@type": "LocationFeatureSpecification", "name": t.takeOut, "value": true },
      { "@type": "LocationFeatureSpecification", "name": t.wineSelection, "value": true },
      { "@type": "LocationFeatureSpecification", "name": t.wineByGlass, "value": true }
    ]
  };

  // Dynamic Menu Generation
  const menuContainer = document.querySelector('.menu-container');
  if (menuContainer) {
    structuredData.hasMenu = {
      "@type": "Menu",
      "inLanguage": pageLang,
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
           if (currentSection) {
               structuredData.hasMenu.hasMenuSection.push(currentSection);
           }
           
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
                const itemName = nameEl.textContent.trim();
                const item = {
                    "@type": "MenuItem",
                    "name": itemName,
                };
                
                // Enhanced: Add alternate names for popular items (language-aware)
                const itemNameLower = itemName.toLowerCase();
                
                // Syrniki / Cottage cheese pancakes
                if (itemNameLower === 'syrniki' || 
                    itemNameLower === 'сырники' ||
                    itemNameLower.includes('сырник')) {
                    const altNames = {
                        en: "Cottage cheese pancakes",
                        ru: "Творожные оладьи",
                        de: "Hüttenkäse-Pfannkuchen",
                        tr: "Lor peyniri kızartması",
                        fr: "Crêpes au fromage blanc",
                        es: "Tortitas de requesón",
                        it: "Frittelle di ricotta",
                        ka: "ნაყინის ბლინები"
                    };
                    if (altNames[pageLang]) item.alternateName = altNames[pageLang];
                }
                
                // Frittata / Frittata variations
                if (itemNameLower === 'frittata' || itemNameLower === 'фриттата') {
                    const altNames = {
                        en: "Italian-style omelet",
                        ru: "Итальянский омлет",
                        de: "Italienisches Omelett",
                        tr: "İtalyan usulü omlet",
                        fr: "Omelette à l'italienne",
                        es: "Tortilla italiana",
                        it: "Frittata italiana",
                        ka: "იტალიური ომლეტი"
                    };
                    if (altNames[pageLang]) item.alternateName = altNames[pageLang];
                }
                
                // Quesadilla
                if (itemNameLower === 'quesadilla' || 
                    itemNameLower === 'кесадилья') {
                    const altNames = {
                        en: "Cheese-filled tortilla",
                        ru: "Тортилья с сыром",
                        de: "Käsegefüllte Tortilla",
                        tr: "Peynirli tortilla",
                        fr: "Tortilla au fromage",
                        es: "Tortilla rellena de queso",
                        it: "Tortilla ripiena di formaggio",
                        ka: "ყველით შევსებული ტორტილია"
                    };
                    if (altNames[pageLang]) item.alternateName = altNames[pageLang];
                }
                
                if (descEl) {
                    item.description = descEl.textContent.trim();
                }
                
                const rawPrice = priceEl ? priceEl.textContent.trim() : currentSectionPrice;
                if (rawPrice) {
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
      if (currentSection) {
          structuredData.hasMenu.hasMenuSection.push(currentSection);
      }
    });
  } else {
    // Add popular menu items to homepage for better SEO
    const popularItemsTranslations = {
      syrniki: {
        name: { en: "Syrniki", ru: "Сырники", de: "Syrniki", tr: "Syrniki", fr: "Syrniki", es: "Syrniki", it: "Syrniki", ka: "სირნიკი", zh: "Syrniki", ar: "سيرنيكي" },
        alternateName: { en: "Cottage cheese pancakes", ru: "Творожные оладьи", de: "Hüttenkäse-Pfannkuchen", tr: "Lor peyniri kızartması", fr: "Crêpes au fromage blanc", es: "Tortitas de requesón", it: "Frittelle di ricotta", ka: "ნაყინის ბლინები", zh: "白软干酪煎饼", ar: "فطائر الجبن القريش" },
        description: { en: "Cottage cheese pancakes served with seasonal fruits", ru: "Творожные оладьи с сезонными фруктами", de: "Hüttenkäse-Pfannkuchen mit saisonalen Früchten", tr: "Mevsim meyveleriyle servis edilen lor peyniri kızartması", fr: "Crêpes au fromage blanc servies avec des fruits de saison", es: "Tortitas de requesón servidas con frutas de temporada", it: "Frittelle di ricotta servite con frutta di stagione", ka: "სეზონური ხილით მომზადებული ნაყინის ბლინები", zh: "配时令水果的白软干酪煎饼", ar: "فطائر الجبن القريش مع الفواكه الموسمية" }
      },
      bruschetta: {
        name: { en: "Bruschetta", ru: "Брускетта", de: "Bruschetta", tr: "Bruschetta", fr: "Bruschetta", es: "Bruschetta", it: "Bruschetta", ka: "ბრუსკეტა", zh: "意式烤面包", ar: "بروشيتا" },
        description: { en: "Various bruschetta options", ru: "Различные варианты брускетты", de: "Verschiedene Bruschetta-Optionen", tr: "Çeşitli bruschetta seçenekleri", fr: "Différentes options de bruschetta", es: "Varias opciones de bruschetta", it: "Varie opzioni di bruschetta", ka: "სხვადასხვა ბრუსკეტის ვარიანტები", zh: "多种意式烤面包选择", ar: "خيارات بروشيتا متنوعة" }
      },
      quesadilla: {
        name: { en: "Quesadilla", ru: "Кесадилья", de: "Quesadilla", tr: "Quesadilla", fr: "Quesadilla", es: "Quesadilla", it: "Quesadilla", ka: "კესადილია", zh: "墨西哥薄饼", ar: "كيساديلا" },
        description: { en: "Tortilla folded taco-style, filled with melted cheese and either a savory chicken or vegetable mix", ru: "Тортилья с расплавленным сыром и куриной или овощной начинкой", de: "Taco-artig gefaltete Tortilla, gefüllt mit geschmolzenem Käse und einer herzhaften Hühner- oder Gemüsemischung", tr: "Erimiş peynir ve tavuklu veya sebzeli harçla doldurulmuş taco tarzı tortilla", fr: "Tortilla pliée style taco, remplie de fromage fondu et d'un mélange de poulet ou de légumes", es: "Tortilla doblada estilo taco, rellena de queso derretido y mezcla de pollo o verduras", it: "Tortilla piegata stile taco, ripiena di formaggio fuso e mix di pollo o verdure", ka: "დნებული ყველითა და ქათმის ან ბოსტნეულის ნარევით შევსებული ტორტილია", zh: "墨西哥卷饼式折叠薄饼，配融化的奶酪和鸡肉或蔬菜", ar: "تورتيليا مطوية على شكل تاكو، محشوة بالجبن المذاب ومزيج من الدجاج أو الخضار" }
      },
      frittata: {
        name: { en: "Frittata", ru: "Фриттата", de: "Frittata", tr: "Frittata", fr: "Frittata", es: "Frittata", it: "Frittata", ka: "ფრიტატა", zh: "意式煎蛋饼", ar: "فريتاتا" },
        alternateName: { en: "Italian-style omelet", ru: "Итальянский омлет", de: "Italienisches Omelett", tr: "İtalyan usulü omlet", fr: "Omelette à l'italienne", es: "Tortilla italiana", it: "Frittata italiana", ka: "იტალიური ომლეტი", zh: "意式煎蛋卷", ar: "عجة على الطريقة الإيطالية" },
        description: { en: "Open-faced Italian-style omelet with sautéed mushrooms and bell peppers, finished in a ketsi with cream, cheese, and herbs", ru: "Итальянский омлет с обжаренными грибами и болгарским перцем, приготовленный в кеци со сливками, сыром и зеленью", de: "Offenes italienisches Omelett mit sautierten Champignons und Paprika, im Ketsi mit Sahne, Käse und Kräutern vollendet", tr: "Sotelenmiş mantar ve biberli İtalyan usulü omlet, krema, peynir ve otlarla ketsi'de pişirilir", fr: "Omelette ouverte à l'italienne avec champignons sautés et poivrons, finie dans un ketsi avec crème, fromage et herbes", es: "Tortilla italiana abierta con champiñones salteados y pimientos, terminada en ketsi con crema, queso y hierbas", it: "Frittata aperta all'italiana con funghi saltati e peperoni, finita in ketsi con panna, formaggio ed erbe", ka: "გამომცხვარი სოკოებითა და ბულგარული წიწაკით იტალიური ომლეტი, კეცში კრემით, ყველითა და ბალახებით", zh: "意式开放式煎蛋饼，配炒蘑菇和甜椒，在ketsi中配奶油、奶酪和香草", ar: "عجة إيطالية مفتوحة مع الفطر المقلب والفلفل، منتهية في كيتسي مع الكريمة والجبن والأعشاب" }
      },
      tomatoSalad: {
        name: { en: "Tomato Salad", ru: "Салат из помидоров", de: "Tomatensalat", tr: "Domates Salatası", fr: "Salade de tomates", es: "Ensalada de tomate", it: "Insalata di pomodori", ka: "პომიდვრის სალათი", zh: "番茄沙拉", ar: "سلطة الطماطم" },
        description: { en: "Fresh mixed tomatoes salad with mint, seasonal fruits/berries, seeds, and a special dressing", ru: "Салат из свежих помидоров с мятой, сезонными фруктами/ягодами, семечками и специальной заправкой", de: "Frischer gemischter Tomatensalat mit Minze, saisonalen Früchten/Beeren, Samen und speziellem Dressing", tr: "Nane, mevsim meyveleri/çilekleri, tohumlar ve özel soslu karışık taze domates salatası", fr: "Salade de tomates fraîches mélangées avec menthe, fruits/baies de saison, graines et vinaigrette spéciale", es: "Ensalada fresca de tomates mixtos con menta, frutas/bayas de temporada, semillas y aderezo especial", it: "Insalata fresca mista di pomodori con menta, frutta/bacche di stagione, semi e condimento speciale", ka: "პიტნით, სეზონური ხილით/კენკრით, თესლებითა და სპეციალური სოუსით დამზადებული ახალი პომიდვრის სალათი", zh: "新鲜混合番茄沙拉，配薄荷、时令水果/浆果、种子和特制调料", ar: "سلطة طماطم طازجة مختلطة مع النعناع والفواكه/التوت الموسمية والبذور وتتبيلة خاصة" }
      },
      potatoBacon: {
        name: { en: "Potato with Bacon", ru: "Картофель с беконом", de: "Kartoffeln mit Speck", tr: "Pastırmalı Patates", fr: "Pommes de terre au bacon", es: "Patatas con tocino", it: "Patate con pancetta", ka: "ბეკონით პატატა", zh: "培根土豆", ar: "بطاطس مع لحم الخنزير المقدد" },
        description: { en: "Stewed sliced potatoes, bacon, and onion finished with melted cheese and herbs", ru: "Тушеный картофель, бекон и лук с расплавленным сыром и зеленью", de: "Geschmorte geschnittene Kartoffeln, Speck und Zwiebeln, vollendet mit geschmolzenem Käse und Kräutern", tr: "Dilimlenmiş patates haşlaması, pastırma ve soğan, eritilmiş peynir ve otlarla tamamlanır", fr: "Pommes de terre en tranches mijotées, bacon et oignon, finies avec fromage fondu et herbes", es: "Patatas en rodajas estofadas, tocino y cebolla, terminadas con queso derretido y hierbas", it: "Patate a fette stufate, pancetta e cipolla, finite con formaggio fuso ed erbe", ka: "დაჭრილი პატატა, ბეკონი და ხახვი, დნებული ყველითა და ბალახებით", zh: "炖土豆片、培根和洋葱，配融化的奶酪和香草", ar: "بطاطس مقطعة مطهية، لحم خنزير مقدد وبصل، منتهية بالجبن المذاب والأعشاب" }
      },
      wineWhite: {
        name: { en: "White Wine", ru: "Белое вино", de: "Weißwein", tr: "Beyaz Şarap", fr: "Vin blanc", es: "Vino blanco", it: "Vino bianco", ka: "წითელი ვინი", zh: "白葡萄酒", ar: "نبيذ أبيض" },
        description: { en: "White wine by the glass", ru: "Белое вино по бокалам", de: "Weißwein pro Glas", tr: "Beyaz Şarap bardağa", fr: "Vin blanc par verre", es: "Vino blanco por vaso", it: "Vino bianco per bicchiere", ka: "წითელი ვინი ბურგერით", zh: "白葡萄酒杯装", ar: "نبيذ أبيض بالكأس" }
      },
      wineRed: {
          name: { en: "Red Wine", ru: "Красное вино", de: "Rotwein", tr: "Kırmızı Şarap", fr: "Vin rouge", es: "Vino tinto", it: "Vino rosso", ka: "წითელი ვინი", zh: "红葡萄酒", ar: "نبيذ أحمر" },
        description: { en: "Red wine by the glass", ru: "Красное вино по бокалам", de: "Rotwein pro Glas", tr: "Kırmızı Şarap bardağa", fr: "Vin rouge par verre", es: "Vino tinto por vaso", it: "Vino rosso per bicchiere", ka: "წითელი ვინი ბურგერით", zh: "红葡萄酒杯装", ar: "نبيذ أحمر بالكأس" }
      },
      wineAmber: {
        name: { en: "Amber Wine", ru: "Янтарное вино", de: "Bernsteinwein", tr: "Kahverengi Şarap", fr: "Vin ambré", es: "Vino ambar", it: "Vino ambrato", ka: "წითელი ვინი", zh: "琥珀葡萄酒", ar: "نبيذ أمبر" },
        description: { en: "Amber wine by the glass", ru: "Янтарное вино по бокалам", de: "Bernsteinwein pro Glas", tr: "Kahverengi Şarap bardağa", fr: "Vin ambré par verre", es: "Vino ambar por vaso", it: "Vino ambrato per bicchiere", ka: "წითელი ვინი ბურგერით", zh: "琥珀葡萄酒杯装", ar: "نبيذ أمبر بالكأس" }
      },
      wineGeorgian: {
        name: { en: "Georgian Wine", ru: "Грузинское вино", de: "Georgischer Wein", tr: "Grup İçecekleri", fr: "Vin géorgien", es: "Vino georgiano", it: "Vino georgiano", ka: "ქართული ვინი", zh: "格鲁吉亚葡萄酒", ar: "نبيذ جورجي" },
        description: { en: "Georgian wine by the glass", ru: "Грузинское вино по бокалам", de: "Georgischer Wein pro Glas", tr: "Grup İçecekleri bardağa", fr: "Vin géorgien par verre", es: "Vino georgiano por vaso", it: "Vino georgiano per bicchiere", ka: "ქართული ვინი ბურგერით", zh: "格鲁吉亚葡萄酒杯装", ar: "نبيذ جورجي بالكأس" }
      },
      wineChacha: {
        name: { en: "Chacha", ru: "Чача", de: "Chacha", tr: "Chacha", fr: "Chacha", es: "Chacha", it: "Chacha", ka: "ჩაჩა", zh: "恰恰酒", ar: "شاكاش" },
        description: { en: "Chacha by the glass", ru: "Чача по бокалам", de: "Chacha pro Glas", tr: "Chacha bardağa", fr: "Chacha par verre", es: "Chacha por vaso", it: "Chacha per bicchiere", ka: "ჩაჩა ბურგერით", zh: "恰恰酒杯装", ar: "شاكاش بالكأس" }
      }
    };
    
    const getItem = (key) => {
      const item = popularItemsTranslations[key];
      if (!item) return null;
      const result = {
        "@type": "MenuItem",
        "name": item.name[pageLang] || item.name.en
      };
      if (item.alternateName && item.alternateName[pageLang]) {
        result.alternateName = item.alternateName[pageLang];
      }
      if (item.description && item.description[pageLang]) {
        result.description = item.description[pageLang];
      }
      return result;
    };
    
    const popularItems = [
      getItem('syrniki'),
      getItem('bruschetta'),
      getItem('quesadilla'),
      getItem('frittata'),
      getItem('tomatoSalad'),
      getItem('potatoBacon'),
      getItem('wineWhite'),
      getItem('wineRed'),
      getItem('wineAmber'),
      getItem('wineGeorgian'),
      getItem('wineChacha'),
    ].filter(item => item !== null);
    
    structuredData.hasMenu = {
      "@type": "Menu",
      "inLanguage": pageLang,
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": t.popularItems,
          "hasMenuItem": popularItems
        }
      ]
    };
    structuredData.menu = `${baseUrl}/menus/menu_${pageLang}.html`;
  }
  
  // Inject
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(structuredData);
  document.head.appendChild(script);
}
