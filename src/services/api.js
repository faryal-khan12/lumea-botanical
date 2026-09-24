
// LUMÉA API & Data Services — 100% Pure LUMÉA Botanical Apothecary Catalog
const imagePath = (filename) =>
  `${import.meta.env.BASE_URL}images/${filename}`;

export const LUMEA_SIGNATURE_PRODUCTS = [
  {
    id: "lumea-1",
    name: "Gentle Botanical Cleanser",
    brand: "LUMÉA",
    category: "Cleansers",
    priceUsd: 18.00,
    pricePkr: 4990,
    skinType: "All Skin Types",
    rating: 4.9,
    reviewCount: 142,
    badge: "Best Seller",
    isBestSeller: true,
    isTrending: true,
    volume: "150 ml / 5.1 fl. oz",
    description: "A purifying, sulfate-free botanical cream cleanser infused with calming chamomile, green tea extract, and plant squalane. Sweeps away impurities while preserving the vital moisture barrier.",
    keyIngredients: ["German Chamomile", "Organic Green Tea Extract", "Plant Squalane", "Glycerin"],
    ritual: "Massage 1-2 pumps onto damp skin in gentle circular motions for 60 seconds. Rinse thoroughly with lukewarm water. Use morning and evening.",
    clinicalResults: "97% reported cleaner, calmer skin without tightness in a 4-week trial.",
   image: imagePath("lumea_cleanser.jpg"),
images: [imagePath("lumea_cleanser.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Amina K.", rating: 5, date: "2 days ago", comment: "The softest cleanser I have ever used. My skin never feels stripped or dry!", verified: true },
      { id: 2, author: "Sophia R.", rating: 5, date: "1 week ago", comment: "Leaves my face feeling like silk. Lovely subtle botanical scent.", verified: true },
      { id: 3, author: "Elena M.", rating: 4, date: "2 weeks ago", comment: "Gentle on sensitive acne-prone skin. Will definitely repurchase.", verified: true }
    ]
  },
  {
    id: "lumea-2",
    name: "Pure Hyaluronic Hydrating Serum",
    brand: "LUMÉA",
    category: "Serums",
    priceUsd: 26.00,
    pricePkr: 7200,
    skinType: "Dry & Dehydrated",
    rating: 5.0,
    reviewCount: 219,
    badge: "Best Seller",
    isBestSeller: true,
    isTrending: true,
    volume: "30 ml / 1.0 fl. oz",
    description: "Triple-molecular-weight hyaluronic acid blended with soothing vitamin B5 and snow mushroom extract to quench deep cellular thirst and restore bouncy, glass-skin suppleness.",
    keyIngredients: ["Triple Hyaluronic Acid Complex (2%)", "Pro-Vitamin B5 (Panthenol)", "Snow Mushroom Extract", "Aloe Barbadensis"],
    ritual: "Dispense 3-4 drops onto clean, damp skin. Gently press into face, neck, and décolletage before applying creams or face oils.",
    clinicalResults: "99% noticed instant hydration; 94% saw reduced fine dehydration lines within 14 days.",
    image: imagePath("lumea_serum.jpg"),
images: [imagePath("lumea_serum.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Fatima Z.", rating: 5, date: "Yesterday", comment: "Instant plumpness and zero stickiness. The gold standard for hydrating serums!", verified: true },
      { id: 2, author: "Clara T.", rating: 5, date: "3 days ago", comment: "Saved my winter dry patches in less than a week.", verified: true }
    ]
  },
  {
    id: "lumea-3",
    name: "Ceramide Barrier Cream",
    brand: "LUMÉA",
    category: "Moisturizers",
    priceUsd: 24.00,
    pricePkr: 6600,
    skinType: "Dry & Sensitive",
    rating: 4.8,
    reviewCount: 184,
    badge: "Best Seller",
    isBestSeller: true,
    isTrending: false,
    volume: "60 ml / 2.0 fl. oz",
    description: "A velvety, barrier-replenishing moisture cream formulated with skin-identical ceramides 1, 3, and 6-II, rich shea butter, and oat kernel lipid to lock in moisture and defend against environmental stressors.",
    keyIngredients: ["Ceramide Complex (NP, AP, EOP)", "Colloidal Oat Extract", "Shea Butter", "Niacinamide (3%)"],
    ritual: "Warm a pea-sized amount between fingertips and gently press over face and neck. Ideal for morning barrier defense and nighttime repair.",
    clinicalResults: "Clinically proven to strengthen skin barrier resilience by 72% over 21 days.",
    image: imagePath("lumea_cream.jpg"),
images: [imagePath("lumea_cream.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Layla N.", rating: 5, date: "5 days ago", comment: "Rich without feeling heavy or causing breakouts. Absorbs wonderfully.", verified: true },
      { id: 2, author: "Hannah B.", rating: 4, date: "2 weeks ago", comment: "Calmed my redness and irritation almost overnight.", verified: true }
    ]
  },
  {
    id: "lumea-4",
    name: "Rosehip & Primrose Glow Oil",
    brand: "LUMÉA",
    category: "Face Oils",
    priceUsd: 28.00,
    pricePkr: 7750,
    skinType: "All Skin Types",
    rating: 4.9,
    reviewCount: 167,
    badge: null,
    isBestSeller: false,
    isTrending: true,
    volume: "30 ml / 1.0 fl. oz",
    description: "Cold-pressed wild rosehip seed oil paired with evening primrose and antioxidant-rich vitamin E. Delivers an immediate lit-from-within glow, softens texture, and accelerates skin renewal.",
    keyIngredients: ["Cold-Pressed Virgin Rosehip Seed Oil", "Evening Primrose Oil", "Tocopherol (Vitamin E)", "Organic Jojoba"],
    ritual: "Warm 2-3 drops in palms and press gently into skin as the final step of your nighttime routine, or blend a single drop into foundation.",
    clinicalResults: "96% noticed an immediate healthy radiance without greasy residue.",
    image: imagePath("lumea_oil.jpg"),
images: [imagePath("lumea_oil.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Mariam S.", rating: 5, date: "1 week ago", comment: "Liquid gold! Smells divine and leaves a breathtaking morning glow.", verified: true }
    ]
  },
  {
    id: "lumea-5",
    name: "Botanical Toning Mist",
    brand: "LUMÉA",
    category: "Toners & Mists",
    priceUsd: 19.00,
    pricePkr: 5250,
    skinType: "All Skin Types",
    rating: 4.7,
    reviewCount: 94,
    badge: null,
    isBestSeller: false,
    isTrending: false,
    volume: "120 ml / 4.0 fl. oz",
    description: "Steam-distilled damask rose and cucumber hydrosol mist charged with witch hazel and prebiotics to balance skin pH, tighten pores, and awaken tired complexions on demand.",
    keyIngredients: ["Damask Rose Water", "Cucumber Distillate", "Organic Prebiotic Inulin", "Witch Hazel"],
    ritual: "Close eyes and mist liberally over face and neck after cleansing, throughout the day to rehydrate, or after makeup as a dewy setting veil.",
    clinicalResults: "100% experienced immediate cooling refresh and pore refinement.",
    image: imagePath("lumea_mist.jpg"),
images: [imagePath("lumea_mist.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Zara D.", rating: 5, date: "3 days ago", comment: "The fine mist spray is so luxurious. I keep one at my desk and one in my bag!", verified: true }
    ]
  },
  {
    id: "lumea-6",
    name: "Botanical Treatment Mask",
    brand: "LUMÉA",
    category: "Masks & Treatments",
    priceUsd: 26.00,
    pricePkr: 7200,
    skinType: "All Skin Types",
    rating: 4.9,
    reviewCount: 128,
    badge: null,
    isBestSeller: false,
    isTrending: true,
    volume: "100 ml / 3.4 fl. oz",
    description: "An intensive restorative treatment mask featuring mineral-rich French green clay, soothing oat extracts, and nourishing plant lipids to purify pores, detoxify, and deeply replenish suppleness.",
    keyIngredients: ["French Green Clay", "Colloidal Oat Extract", "Spirulina", "Shea Butter", "Botanical Squalane"],
    ritual: "Apply an even layer to clean skin avoiding eyes and lips. Leave on for 10-15 minutes, then rinse gently with lukewarm water and a soft cloth.",
    clinicalResults: "95% experienced refined pores, reduced redness, and deeply soft skin after first use.",
    image: imagePath("lumea_mask.jpg"),
images: [imagePath("lumea_mask.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Kiran R.", rating: 5, date: "3 days ago", comment: "The absolute best treatment mask! It never cracks or strips the skin, just leaves it glowing.", verified: true }
    ]
  },
  {
    id: "lumea-7",
    name: "Artisan Eau de Parfum",
    brand: "LUMÉA",
    category: "Perfumes & Fragrances",
    priceUsd: 68.00,
    pricePkr: 18800,
    skinType: "All Skin Types",
    rating: 5.0,
    reviewCount: 89,
    badge: null,
    isBestSeller: false,
    isTrending: true,
    volume: "100 ml / 3.4 fl. oz",
    description: "An evocative signature eau de parfum crafted with rare botanical notes of warm golden amber, sun-drenched bergamot, velvet sandalwood, and whisper-soft damask rose petals.",
    keyIngredients: ["Natural Bergamot Essence", "Golden Amber Extract", "Sustainable Sandalwood", "Damask Rose Absolute"],
    ritual: "Spray onto pulse points—wrists, neck, and behind the ears—allowing the fragrance to unfold with your skin's natural warmth.",
    clinicalResults: "Long-lasting botanical sillage validated over 12 hours of wear.",
    image: imagePath("lumea_perfume.jpg"),
images: [imagePath("lumea_perfume.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Yasmin S.", rating: 5, date: "Yesterday", comment: "Breathtaking scent! Subtle, sophisticated, and receives compliments wherever I go.", verified: true }
    ]
  },
  {
    id: "lumea-8",
    name: "Midnight Peptide Recovery Elixir",
    brand: "LUMÉA",
    category: "Serums",
    priceUsd: 32.00,
    pricePkr: 8800,
    skinType: "Mature & Dehydrated",
    rating: 4.9,
    reviewCount: 138,
    badge: null,
    isBestSeller: false,
    isTrending: true,
    volume: "30 ml / 1.0 fl. oz",
    description: "A potent nocturnal repair concentrate featuring 5 multi-action peptides, bakuchiol (nature's gentle retinol alternative), and Japanese camellia oil to boost firmness and elasticity while you sleep.",
    keyIngredients: ["Matrixyl 3000 Peptide Complex", "1% Natural Bakuchiol", "Camellia Japonica Seed Oil", "Coenzyme Q10"],
    ritual: "Apply 4-5 drops at night to clean face and neck, gently pressing upwards from jawline to temple.",
    clinicalResults: "89% measured visible improvement in skin elasticity and smoothed expression lines after 30 days.",
    image: imagePath("lumea_serum.jpg"),
images: [imagePath("lumea_serum.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Sonia P.", rating: 5, date: "2 weeks ago", comment: "Wake up looking like I had 10 hours of sleep. Bakuchiol is so gentle.", verified: true }
    ]
  },
  {
    id: "lumea-9",
    name: "Restorative Lip Butter",
    brand: "LUMÉA",
    category: "Masks & Treatments",
    priceUsd: 14.00,
    pricePkr: 3850,
    skinType: "All Skin Types",
    rating: 4.9,
    reviewCount: 195,
    badge: null,
    isBestSeller: false,
    isTrending: false,
    volume: "20 ml / 0.7 fl. oz",
    description: "An ultra-nourishing leave-on lip glaze packed with cupuaçu butter, peptides, and botanical sunflower wax. Melts onto lips for instant cushion, deep hydration, and high-shine softness.",
    keyIngredients: ["Cupuaçu Butter", "Palmitoyl Tripeptide-38", "Botanical Sunflower Wax", "Vanilla Planifolia"],
    ritual: "Apply generously whenever lips crave moisture or as an intensive sleeping lip mask before bed.",
    clinicalResults: "Overnight chapped lip repair validated by 98% of testers.",
    image: imagePath("lumea_cream.jpg"),
images: [imagePath("lumea_cream.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Kiran J.", rating: 5, date: "Yesterday", comment: "Gives that coveted pillow-soft glass shine.", verified: true }
    ]
  },
  {
    id: "lumea-10",
    name: "Vitamin C Infusion Serum",
    brand: "LUMÉA",
    category: "Serums",
    priceUsd: 29.00,
    pricePkr: 8000,
    skinType: "All Skin Types",
    rating: 5.0,
    reviewCount: 178,
    badge: null,
    isBestSeller: false,
    isTrending: true,
    volume: "30 ml / 1.0 fl. oz",
    description: "A stable 15% Vitamin C (THD Ascorbate) and Ferulic Acid elixir that brightens dark spots, shields against environmental oxidative stress, and illuminates the complexion with youthful vitality.",
    keyIngredients: ["15% THD Ascorbate (Vitamin C)", "0.5% Ferulic Acid", "Kakadu Plum Extract", "Vitamin E"],
    ritual: "Apply 3 drops every morning to clean face and neck, followed by your barrier cream and SPF.",
    clinicalResults: "Clinically proven to brighten skin luminosity by 88% over 3 weeks.",
    image: imagePath("lumea_oil.jpg"),
images: [imagePath("lumea_oil.jpg"), imagePath("lumea_hero.jpg")],
    reviews: [
      { id: 1, author: "Rabia K.", rating: 5, date: "5 days ago", comment: "My dark spots have faded visibly. Best Vitamin C I've tested!", verified: true }
    ]
  }
];

// Return 100% pure LUMÉA crafted botanical products
export async function getAllProducts() {
  return LUMEA_SIGNATURE_PRODUCTS;
}

export async function getProductById(id) {
  const found = LUMEA_SIGNATURE_PRODUCTS.find((item) => String(item.id) === String(id));
  return found || LUMEA_SIGNATURE_PRODUCTS[0];
}

// Live Currency Exchange Rates API
export async function fetchLiveExchangeRates() {
  const FALLBACK_RATES = {
    USD: 1,
    PKR: 277.5,
    EUR: 0.88,
    GBP: 0.75,
    AED: 3.67,
    CAD: 1.35
  };

  try {
    const res = await fetch("https://open.er-api.com/v6/latest/USD");
    if (!res.ok) throw new Error("Rate fetch failed");
    const data = await res.json();
    if (data.rates && data.rates.PKR) {
      return {
        USD: 1,
        PKR: data.rates.PKR,
        EUR: data.rates.EUR || 0.88,
        GBP: data.rates.GBP || 0.75,
        AED: data.rates.AED || 3.67,
        CAD: data.rates.CAD || 1.35
      };
    }
    return FALLBACK_RATES;
  } catch (e) {
    console.warn("Exchange rate API error, using reliable fallback rates:", e.message);
    return FALLBACK_RATES;
  }
}

// Skincare Consultation Quiz Matcher
export function matchRoutineQuiz(answers, catalog = LUMEA_SIGNATURE_PRODUCTS) {
  const { skinType, concern, routineStyle } = answers;

  let steps = [];

  // Step 1: Cleanser
  const cleanser = catalog.find(p => p.category === "Cleansers") || catalog[0];
  steps.push({
    stepNumber: 1,
    stepName: "Cleanse & Purify",
    description: "Wash away environmental impurities without disturbing your acid mantle.",
    product: cleanser
  });

  // Step 2: Tone / Hydrate
  if (routineStyle !== "minimal") {
    const toner = catalog.find(p => p.category === "Toners & Mists") || catalog[4] || cleanser;
    steps.push({
      stepNumber: 2,
      stepName: "Balance & Prep",
      description: "Infuse cellular moisture and optimize your skin for active serums.",
      product: toner
    });
  }

  // Step 3: Targeted Serum / Treatment
  let serum;
  if (concern === "anti-aging" || concern === "firmness") {
    serum = catalog.find(p => p.id === "lumea-8") || catalog.find(p => p.category === "Serums");
  } else if (concern === "blemish" || concern === "pores") {
    serum = catalog.find(p => p.id === "lumea-6") || catalog.find(p => p.category === "Masks & Treatments");
  } else {
    serum = catalog.find(p => p.id === "lumea-2") || catalog.find(p => p.category === "Serums");
  }
  steps.push({
    stepNumber: steps.length + 1,
    stepName: "Treat & Target",
    description: `Concentrated active botanical ingredients targeting ${concern || "radiance"}.`,
    product: serum || catalog[1]
  });

  // Step 4: Moisturize / Seal Barrier
  const moisturizer = skinType === "dry" || concern === "hydration"
    ? (catalog.find(p => p.category === "Moisturizers") || catalog[2])
    : (catalog.find(p => p.category === "Face Oils") || catalog[3]);

  steps.push({
    stepNumber: steps.length + 1,
    stepName: "Lock & Nourish",
    description: "Fortify lipid barrier and seal active nutrients for all-day radiance.",
    product: moisturizer
  });

  // Bundle pricing with 15% discount
  const fullUsdPrice = steps.reduce((sum, s) => sum + (s.product.priceUsd || 20), 0);
  const bundleDiscountPercent = 15;
  const discountedUsdPrice = Math.round(fullUsdPrice * (1 - bundleDiscountPercent / 100));

  return {
    skinType,
    concern,
    routineStyle,
    steps,
    totalOriginalUsd: fullUsdPrice,
    bundleUsd: discountedUsdPrice,
    savingsUsd: fullUsdPrice - discountedUsdPrice
  };
}

// Simulated Order Processing API
export async function submitOrder(orderData) {
  await new Promise(r => setTimeout(r, 800));

  const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const estimatedDelivery = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });

  return {
    success: true,
    orderId,
    orderDate: dateStr,
    estimatedDelivery,
    customer: orderData.customer,
    items: orderData.items,
    totals: orderData.totals,
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod
  };
}
