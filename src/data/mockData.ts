export interface MachineryProvider {
  id: string;
  name: string;
  localName: string;
  operation: string;
  category: 'Equipment' | 'Labors';
  tractorRequired: boolean;
  rate: number;
  rateUnit: 'Fixed Price / Acre' | 'Per Hour' | 'Per Day';
  distanceKm: number;
  providerName: string;
  providerPhone: string;
  rating: number;
  bookingType: 'Hub Assured' | 'Direct Call';
  village: string;
  district: string;
  image: string;
  isSketch?: boolean;
  description: string;
}

export interface EquipmentSketchItem {
  id: string;
  name: string;
  operation: string;
  basePrice: number;
  unit: string;
  sketchSrc: string;
}

export interface StoreProduct {
  id: string;
  name: string;
  category:
    | 'OzoSafe Veggies'
    | 'Milk & Curd'
    | 'Desi Ghee & Honey'
    | 'Cold-Pressed Oils'
    | 'Dals, Rice & Millets';
  packSize: string;
  price: number;
  mrp: number;
  deliveryMode: 'Morning 7:30 AM' | 'Store Delivery';
  ozoSafeCertified?: boolean;
  image: string;
  tag: string;
}

export const BRAND_INFO = {
  name: 'Shobhit Agro Farm Hub',
  tagline: 'Smart Farming, Easy Machinery Rental & Farm Fresh Products.',
  farmerName: 'Shobhit',
  mobileNo: '7668927719',
  address: 'Chhachhreki (VPR6+J3, Shakhupur Urf Chachraki)',
  district: 'Fazilka',
  walletBalance: 216.15,
  helpline: '+91 76689-27719',
  email: 'support@shobhitagrohub.in',
};

// Actual extracted raw images & machinery sketches (NO AI-generated images)
export const IMAGES = {
  // Real raw product photos from PDF
  freshVegetables: '/assets/extracted/items/fresh_vegetables.jpg',
  freshFruits: '/assets/extracted/items/fresh_fruits.jpg',
  ozoSafeCombo: '/assets/extracted/items/ozosafe_potato_onion_tomato.jpg',
  organicCowMilk: '/assets/extracted/items/organic_cow_milk.jpg',
  desiGhee1L: '/assets/extracted/items/desi_ghee_1l.jpg',
  wildForestHoney: '/assets/extracted/items/wild_forest_honey.jpg',
  pureFarmHoney: '/assets/extracted/items/pure_farm_honey.jpg',
  mustardOil: '/assets/extracted/items/mustard_oil.jpg',
  groundnutOil: '/assets/extracted/items/groundnut_oil.jpg',
  dalsPulses: '/assets/extracted/items/dals_pulses.jpg',
  millets: '/assets/extracted/items/millets.jpg',
  traditionalRice: '/assets/extracted/items/traditional_rice.jpg',
  // Real field photo from PDF Page 14 + Technical Sketches from PDF/PNG
  manureSpreaderReal: '/assets/extracted/items/manure_spreader_real.jpg',
  sketchGridReference: '/assets/aistudio/image_44b04a5b.png',
  sketchStonePicker: '/assets/extracted/items/sketch_stone_picker.jpg',
  sketchDiggingMachine: '/assets/extracted/items/sketch_digging_machine.jpg',
  sketchPlough: '/assets/extracted/items/sketch_plough.jpg',
  sketchLeveler: '/assets/extracted/items/sketch_leveler.jpg',
  sketchDiskHarrow: '/assets/extracted/items/sketch_disk_harrow.jpg',
  sketchDozer: '/assets/extracted/items/sketch_dozer.jpg',
  sketchCultivator: '/assets/extracted/items/sketch_cultivator.jpg',
  sketchPowerTiller: '/assets/extracted/items/sketch_power_tiller.jpg',
  sketchSeedDrill: '/assets/extracted/items/sketch_seed_drill.jpg',
  sketchRotavator: '/assets/extracted/items/sketch_rotavator.jpg',
  sketchShredder: '/assets/extracted/items/sketch_shredder.jpg',
  sketchBedMaker: '/assets/extracted/items/sketch_bed_maker.jpg',
  sketchManureSpreader: '/assets/extracted/items/sketch_manure_spreader.jpg',
  sketchHarvester: '/assets/extracted/items/sketch_harvester.jpg',
  sketchAuger: '/assets/extracted/items/sketch_auger.jpg',
  sketchThresher: '/assets/extracted/items/sketch_thresher.jpg',
};

export const FARM_OPERATIONS_MAP: Record<string, string[]> = {
  'Field Preparation': [
    'Plough',
    'Leveler',
    'Disk Harrow',
    'Rotavator',
    'Cultivator',
    'Dozer',
    'Stone Picker',
    'Digging Machine',
  ],
  'Sowing and Planting': [
    'Seed Drill',
    'Bed Maker',
    'Power Tiller',
    'Auger Machine',
  ],
  Weeding: [
    'Cultivator',
    'Power Tiller',
    'Skilled Weeding Crew (Labors)',
  ],
  Spraying: [
    'Drone Spray',
    'Manure Spreader',
  ],
  'Harvest and Threshing': [
    'Harvester',
    'Thresher',
    'Shredder Machine',
  ],
};

// Matches the exact visual sketch grid in image_44b04a5b.png and PDF Pages 8–11
export const EQUIPMENT_GRID_ITEMS: EquipmentSketchItem[] = [
  {
    id: 'eq-drone',
    name: 'Drone Spray',
    operation: 'Spraying',
    basePrice: 450,
    unit: 'Acre',
    sketchSrc: 'svg-drone',
  },
  {
    id: 'eq-stone',
    name: 'Stone Picker',
    operation: 'Field Preparation',
    basePrice: 700,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchStonePicker,
  },
  {
    id: 'eq-digging',
    name: 'Digging Machine',
    operation: 'Field Preparation',
    basePrice: 1100,
    unit: 'Hour',
    sketchSrc: IMAGES.sketchDiggingMachine,
  },
  {
    id: 'eq-plough',
    name: 'Plough',
    operation: 'Field Preparation',
    basePrice: 680,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchPlough,
  },
  {
    id: 'eq-leveler',
    name: 'Leveler',
    operation: 'Field Preparation',
    basePrice: 950,
    unit: 'Hour',
    sketchSrc: IMAGES.sketchLeveler,
  },
  {
    id: 'eq-disk-harrow',
    name: 'Disk Harrow',
    operation: 'Field Preparation',
    basePrice: 620,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchDiskHarrow,
  },
  {
    id: 'eq-dozer',
    name: 'Dozer',
    operation: 'Field Preparation',
    basePrice: 900,
    unit: 'Hour',
    sketchSrc: IMAGES.sketchDozer,
  },
  {
    id: 'eq-cultivator',
    name: 'Cultivator',
    operation: 'Field Preparation',
    basePrice: 550,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchCultivator,
  },
  {
    id: 'eq-power-tiller',
    name: 'Power Tiller',
    operation: 'Sowing and Planting',
    basePrice: 500,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchPowerTiller,
  },
  {
    id: 'eq-seed-drill',
    name: 'Seed Drill',
    operation: 'Sowing and Planting',
    basePrice: 600,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchSeedDrill,
  },
  {
    id: 'eq-rotavator',
    name: 'Rotavator',
    operation: 'Field Preparation',
    basePrice: 650,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchRotavator,
  },
  {
    id: 'eq-harvester',
    name: 'Harvester',
    operation: 'Harvest and Threshing',
    basePrice: 1400,
    unit: 'Acre',
    sketchSrc: IMAGES.sketchHarvester,
  },
];

export const LABOR_GRID_ITEMS = [
  { id: 'lab-1', name: 'Paddy Transplanting Crew (6 Labors)', operation: 'Sowing and Planting', basePrice: 2800, unit: 'Acre' },
  { id: 'lab-2', name: 'Manual Weeding & Hoeing Team', operation: 'Weeding', basePrice: 550, unit: 'Day / Person' },
  { id: 'lab-3', name: 'Harvesting & Bundling Labor', operation: 'Harvest and Threshing', basePrice: 650, unit: 'Day / Person' },
  { id: 'lab-4', name: 'Orchard Pruning & Manure Application', operation: 'Spraying', basePrice: 600, unit: 'Day / Person' },
];

export const MACHINERY_PROVIDERS: MachineryProvider[] = [
  {
    id: 'prov-01',
    name: 'Manure Spreader (खत पसरवणे यंत्र)',
    localName: 'Manure Spreader Machine · Real Field Unit (PDF Page 14)',
    operation: 'Spraying',
    category: 'Equipment',
    tractorRequired: true,
    rate: 550,
    rateUnit: 'Fixed Price / Acre',
    distanceKm: 2.4,
    providerName: 'Nitin Tukaram Bhosale (CHC Partner)',
    providerPhone: '+91 98124-55012',
    rating: 4.8,
    bookingType: 'Hub Assured',
    village: 'Shakhupur Urf Chachraki',
    district: 'Fazilka',
    image: IMAGES.manureSpreaderReal,
    isSketch: false,
    description: 'Uniform organic farmyard manure and compost broadcaster for vineyards, orchards, and field plots.',
  },
  {
    id: 'prov-02',
    name: 'Rotavator (7-Feet Rotary Tiller)',
    localName: 'Technical Sketch · Field Preparation Implement',
    operation: 'Field Preparation',
    category: 'Equipment',
    tractorRequired: true,
    rate: 650,
    rateUnit: 'Fixed Price / Acre',
    distanceKm: 1.8,
    providerName: 'Shobhit CHC Fleet Center',
    providerPhone: '+91 76689-27719',
    rating: 4.9,
    bookingType: 'Hub Assured',
    village: 'Chhachhreki',
    district: 'Fazilka',
    image: IMAGES.sketchRotavator,
    isSketch: true,
    description: 'Guaranteed on-time seedbed preparation with 55+ HP tractor option and fuel-inclusive rate.',
  },
  {
    id: 'prov-03',
    name: 'Mould Board Plough & Disc Plough',
    localName: 'Technical Sketch · Deep Soil Inversion Plough',
    operation: 'Field Preparation',
    category: 'Equipment',
    tractorRequired: true,
    rate: 680,
    rateUnit: 'Fixed Price / Acre',
    distanceKm: 3.1,
    providerName: 'Harjinder Singh Implement Rental',
    providerPhone: '+91 98155-43210',
    rating: 4.7,
    bookingType: 'Direct Call',
    village: 'Jalalabad West, Fazilka',
    district: 'Fazilka',
    image: IMAGES.sketchPlough,
    isSketch: true,
    description: 'Deep soil turning and hardpan breaking prior to Kharif and Rabi sowing.',
  },
  {
    id: 'prov-04',
    name: 'Laser Land Leveler',
    localName: 'Technical Sketch · Precision Laser Guided Leveler',
    operation: 'Field Preparation',
    category: 'Equipment',
    tractorRequired: true,
    rate: 950,
    rateUnit: 'Per Hour',
    distanceKm: 2.9,
    providerName: 'Fazilka Custom Hiring Cooperative',
    providerPhone: '+91 98761-19044',
    rating: 4.9,
    bookingType: 'Hub Assured',
    village: 'District Fazilka Hub',
    district: 'Fazilka',
    image: IMAGES.sketchLeveler,
    isSketch: true,
    description: 'Saves up to 25% irrigation water and ensures uniform crop stand across uneven plots.',
  },
  {
    id: 'prov-05',
    name: 'Precision Seed Drill & Bed Maker',
    localName: 'Technical Sketch · 9-Row Multi-Crop Seed Drill',
    operation: 'Sowing and Planting',
    category: 'Equipment',
    tractorRequired: false,
    rate: 600,
    rateUnit: 'Fixed Price / Acre',
    distanceKm: 3.6,
    providerName: 'Gurpreet Agro Services',
    providerPhone: '+91 94172-88310',
    rating: 4.8,
    bookingType: 'Direct Call',
    village: 'Abohar Road, Fazilka',
    district: 'Fazilka',
    image: IMAGES.sketchSeedDrill,
    isSketch: true,
    description: 'Accurate row spacing and fertilizer placement for wheat, mustard, and pulses sowing.',
  },
  {
    id: 'prov-06',
    name: 'Combine Harvester & Multi-Crop Thresher',
    localName: 'Technical Sketch · Grain Harvester with Straw Walker',
    operation: 'Harvest and Threshing',
    category: 'Equipment',
    tractorRequired: false,
    rate: 1400,
    rateUnit: 'Fixed Price / Acre',
    distanceKm: 4.2,
    providerName: 'Shobhit CHC Fleet Center',
    providerPhone: '+91 76689-27719',
    rating: 4.9,
    bookingType: 'Hub Assured',
    village: 'Chhachhreki',
    district: 'Fazilka',
    image: IMAGES.sketchHarvester,
    isSketch: true,
    description: 'High-efficiency grain harvesting with minimal breakage and integrated straw management.',
  },
];

// Actual Raw Product Images extracted directly from the PDF
export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'sp-01',
    name: 'Fresh Organic Vegetables Basket',
    category: 'OzoSafe Veggies',
    packSize: '3 Kg Assorted Basket',
    price: 145,
    mrp: 190,
    deliveryMode: 'Morning 7:30 AM',
    ozoSafeCertified: true,
    image: IMAGES.freshVegetables,
    tag: 'Ozone-Washed · >90% Pesticide Removed',
  },
  {
    id: 'sp-02',
    name: 'OzoSafe Potato, Onion Premium & Tomato Desi',
    category: 'OzoSafe Veggies',
    packSize: '3 Kg Daily Staples Pack',
    price: 118,
    mrp: 160,
    deliveryMode: 'Morning 7:30 AM',
    ozoSafeCertified: true,
    image: IMAGES.ozoSafeCombo,
    tag: 'Lowest Price · No Pesticide Residue',
  },
  {
    id: 'sp-03',
    name: 'Organic Cow Milk — Pasteurized (16g Protein)',
    category: 'Milk & Curd',
    packSize: '500 ml Pouch',
    price: 52,
    mrp: 60,
    deliveryMode: 'Morning 7:30 AM',
    ozoSafeCertified: false,
    image: IMAGES.organicCowMilk,
    tag: 'Order by Midnight · Get by 7:30 AM',
  },
  {
    id: 'sp-04',
    name: 'Desi Danedar Ghee — 1.1 Litre',
    category: 'Desi Ghee & Honey',
    packSize: '1.1 Litre Jar',
    price: 1149,
    mrp: 1350,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.desiGhee1L,
    tag: '100% Pure & Granular Desi Ghee',
  },
  {
    id: 'sp-05',
    name: 'Wild Forest Raw Honey — 475 gm',
    category: 'Desi Ghee & Honey',
    packSize: '475 gm Glass Jar',
    price: 341,
    mrp: 480,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.wildForestHoney,
    tag: 'NMR Tested · Unpasteurized Honey',
  },
  {
    id: 'sp-06',
    name: 'Non-Refined Cold-Pressed Mustard Oil',
    category: 'Cold-Pressed Oils',
    packSize: '700 ml Glass Bottle',
    price: 300,
    mrp: 410,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.mustardOil,
    tag: 'Traditional Kachi Ghani',
  },
  {
    id: 'sp-07',
    name: 'Traditional Cold-Pressed Groundnut Oil',
    category: 'Cold-Pressed Oils',
    packSize: '700 ml Glass Bottle',
    price: 329,
    mrp: 450,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.groundnutOil,
    tag: '100% Unrefined Groundnut Oil',
  },
  {
    id: 'sp-08',
    name: 'Unpolished Dals & Pulses Assortment',
    category: 'Dals, Rice & Millets',
    packSize: '1 Kg Pack',
    price: 165,
    mrp: 210,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.dalsPulses,
    tag: 'Zero Talc · High Protein Pulses',
  },
  {
    id: 'sp-09',
    name: 'Traditional Native Millets & Rice',
    category: 'Dals, Rice & Millets',
    packSize: '1 Kg Pack',
    price: 140,
    mrp: 185,
    deliveryMode: 'Store Delivery',
    ozoSafeCertified: false,
    image: IMAGES.millets,
    tag: 'Unpolished Farm Millets',
  },
];

export const MORNING_CALENDAR_DAYS = [
  { day: 'Fri', date: '06', status: 'Delivered', label: 'Delivered 06:45 AM' },
  { day: 'Sat', date: '07', status: 'Delivered', label: 'Delivered 06:50 AM' },
  { day: 'Sun', date: '08', status: 'Delivered', label: 'Delivered 07:05 AM' },
  { day: 'Mon', date: '09', status: 'Today', label: 'Active · 500ml Milk + Veggie Box' },
  { day: 'Tue', date: '10', status: 'Upcoming', label: 'Scheduled 05:00 – 07:30 AM' },
  { day: 'Wed', date: '11', status: 'Upcoming', label: 'Scheduled 05:00 – 07:30 AM' },
  { day: 'Thu', date: '12', status: 'Vacation', label: 'Paused (Tap to Resume)' },
];

export const OZOSAFE_COMPARISON = [
  { feature: 'Removes Surface Pesticides', ozoSafe: '> 90% Removed', basicWater: 'Basic Only' },
  { feature: 'Kills Surface Germs & Bacteria', ozoSafe: '99% Sanitized', basicWater: 'No' },
  { feature: 'Increases Natural Shelf Life', ozoSafe: 'Yes (+4 Days)', basicWater: 'No' },
];
