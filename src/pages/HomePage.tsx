import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Tractor,
  ShoppingBag,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Minus,
  ArrowRight,
  X,
  Wallet,
  Sparkles,
} from 'lucide-react';
import {
  BRAND_INFO,
  FARM_OPERATIONS_MAP,
  EQUIPMENT_GRID_ITEMS,
  LABOR_GRID_ITEMS,
  MACHINERY_PROVIDERS,
  STORE_PRODUCTS,
  MORNING_CALENDAR_DAYS,
  OZOSAFE_COMPARISON,
  MachineryProvider,
} from '../data/mockData';
import { SmartImage } from '../components/ui/SmartImage';
import { MachinerySketch } from '../components/ui/MachinerySketch';
import { SectionHeader } from '../components/ui/SectionHeader';

export const HomePage: React.FC = () => {
  // Top App Context States
  const [selectedLang, setSelectedLang] = useState<'English' | 'हिंदी' | 'मराठी' | 'ਪੰਜਾਬੀ'>('English');
  const [appPreviewTab, setAppPreviewTab] = useState<'register' | 'hire' | 'store'>('hire');

  // Hire In Machinery States
  const [resourceTab, setResourceTab] = useState<'Equipment' | 'Labors'>('Equipment');
  const [selectedOperation, setSelectedOperation] = useState<string>('All Operations');
  const [selectedMachineName, setSelectedMachineName] = useState<string>('All Machinery');
  const [tractorRequired, setTractorRequired] = useState<'Yes' | 'No'>('Yes');
  const [landAcres, setLandAcres] = useState<string>('3.5');
  const [searchAreaMode, setSearchAreaMode] = useState<'District' | 'Location'>('District');
  const [bookingModeFilter, setBookingModeFilter] = useState<'All' | 'Hub Assured' | 'Direct Call'>('All');

  // Book Service Modal State
  const [bookingModalProvider, setBookingModalProvider] = useState<MachineryProvider | null>(null);
  const [workQuantity, setWorkQuantity] = useState<string>('3');
  const [workNote, setWorkNote] = useState<string>('');
  const [bookedSuccessId, setBookedSuccessId] = useState<string | null>(null);

  // Store & Morning 7:30 AM Subscription States
  const [storeDeliveryTab, setStoreDeliveryTab] = useState<'All' | 'Morning 7:30 AM' | 'Store Delivery'>('All');
  const [storeCategory, setStoreCategory] = useState<string>('All');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('09');
  const [subscriptionPaused, setSubscriptionPaused] = useState<boolean>(false);
  const [cartQuantities, setCartQuantities] = useState<Record<string, number>>({
    'sp-01': 1,
    'sp-03': 2,
  });

  // Mini Registration Demo State in Hero Preview
  const [regForm, setRegForm] = useState({
    role: 'Farmer',
    name: BRAND_INFO.farmerName,
    mobile: BRAND_INFO.mobileNo,
    address: 'Chhachhreki',
    district: 'Saharanpur',
    otp: '654774',
  });
  const [otpSent, setOtpSent] = useState(true);

  const availableMachinesForOperation =
    selectedOperation === 'All Operations'
      ? Array.from(new Set(Object.values(FARM_OPERATIONS_MAP).flat()))
      : FARM_OPERATIONS_MAP[selectedOperation] || [];

  const filteredProviders = MACHINERY_PROVIDERS.filter((p) => {
    const matchesOp =
      selectedOperation === 'All Operations' || p.operation === selectedOperation;
    const matchesName =
      selectedMachineName === 'All Machinery' ||
      p.name.toLowerCase().includes(selectedMachineName.toLowerCase());
    const matchesMode =
      bookingModeFilter === 'All' || p.bookingType === bookingModeFilter;
    return matchesOp && matchesName && matchesMode;
  });

  const storeCategories = [
    'All',
    'OzoSafe Veggies',
    'Milk & Curd',
    'Desi Ghee & Honey',
    'Cold-Pressed Oils',
    'Dals, Rice & Millets',
  ];

  const filteredProducts = STORE_PRODUCTS.filter((item) => {
    const matchesDelivery =
      storeDeliveryTab === 'All' || item.deliveryMode === storeDeliveryTab;
    const matchesCategory =
      storeCategory === 'All' || item.category === storeCategory;
    return matchesDelivery && matchesCategory;
  });

  const updateCart = (id: string, delta: number) => {
    setCartQuantities((prev) => {
      const next = (prev[id] || 0) + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const totalCartItems = Object.values(cartQuantities).reduce((a, b) => a + b, 0);
  const totalCartAmount = STORE_PRODUCTS.reduce(
    (sum, p) => sum + (cartQuantities[p.id] || 0) * p.price,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FBF9] text-[#1C2E24]">
      {/* LIGHT APP CONTEXT BAR (Soft Sage & Warm Off-White) */}
      <div className="bg-[#EFF5F1] text-[#1C2E24] border-b border-[#DDE7E0]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#2D6A4F]">
            <MapPin className="w-3.5 h-3.5 text-[#2D6A4F] shrink-0" />
            <span className="font-medium text-[#1C2E24]">{BRAND_INFO.address}</span>
            <span aria-hidden="true" className="text-[#8FA599]">·</span>
            <span className="text-[#4B5E53]">District {BRAND_INFO.district}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 bg-white p-0.5 rounded-md border border-[#D5E2DA]">
              {(['English', 'हिंदी', 'मराठी', 'ਪੰਜਾਬੀ'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setSelectedLang(lang)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    selectedLang === lang
                      ? 'bg-[#2D6A4F] text-white font-semibold'
                      : 'text-[#4B5E53] hover:text-[#1C2E24]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[#2E4237] font-mono-tabular">
              <Wallet className="w-3.5 h-3.5 text-[#2D6A4F]" />
              <span>Wallet: ₹{BRAND_INFO.walletBalance.toFixed(2)}</span>
              <span aria-hidden="true" className="text-[#8FA599]">·</span>
              <span>
                {BRAND_INFO.farmerName} ({BRAND_INFO.mobileNo})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. LIGHT, AIRY HERO SECTION + INTERACTIVE MOBILE APP SCREEN PREVIEWER */}
      <section className="bg-gradient-to-b from-[#F2F7F4] to-[#F9FBF9] text-[#1C2E24] border-b border-[#E3ECE6] py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-semibold tracking-wider uppercase text-[#2D6A4F]">
                  Web &amp; Mobile App Companion Demo · CHC Machinery + OzoSafe Store
                </p>
                <h1
                  className="font-display font-bold tracking-tight text-[#1C2E24] headline-balance leading-[1.12]"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3.15rem)' }}
                >
                  Smart Farming, Easy Machinery Rental &amp; Farm Fresh Products.
                </h1>
                <p className="text-sm sm:text-base text-[#4B5E53] leading-relaxed max-w-[62ch]">
                  Built around the expected interfaces of our final mobile app: select machinery via clean technical implement sketches or real field units across District {BRAND_INFO.district}—or schedule 7:30 AM morning deliveries of OzoSafe vegetables, organic cow milk, Desi Danedar Ghee, and raw honey.
                </p>
              </div>

              {/* Two Prominent Light Service Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <a
                  href="#hire-machinery-section"
                  className="p-5 rounded-xl bg-white hover:bg-[#F4F8F5] border border-[#D8E4DD] transition-colors flex flex-col justify-between space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2D6A4F]">
                      01. Equipment &amp; Labors
                    </span>
                    <Tractor className="w-4 h-4 text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#1C2E24]">
                      Hire Farm Machinery
                    </h2>
                    <p className="text-xs text-[#4B5E53] mt-1">
                      Plough · Leveler · Disk Harrow · Rotavator · Seed Drill · Harvester
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D6A4F]">
                    <span>Open Equipment Sketch Grid</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="#farm-store-section"
                  className="p-5 rounded-xl bg-white hover:bg-[#F4F8F5] border border-[#D8E4DD] transition-colors flex flex-col justify-between space-y-3 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#2D6A4F]">
                      02. Morning 7:30 AM &amp; Store
                    </span>
                    <ShoppingBag className="w-4 h-4 text-[#2D6A4F]" />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-[#1C2E24]">
                      Shop Farm Fresh Products
                    </h2>
                    <p className="text-xs text-[#4B5E53] mt-1">
                      OzoSafe Veggies · Organic Cow Milk · Desi Danedar Ghee · Honey &amp; Oils
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#2D6A4F]">
                    <span>Open Morning &amp; Organic Store</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#5C6F64] pt-1">
                <span>Farmer OTP Login ({BRAND_INFO.mobileNo})</span>
                <span aria-hidden="true">·</span>
                <span>Hub Assured &amp; Direct Call Booking</span>
                <span aria-hidden="true">·</span>
                <span>Orders by Midnight, Get by 7:30 AM</span>
              </div>
            </div>

            {/* Right Column: Soft Light Mobile App Screen Previewer */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-white text-[#1C2E24] rounded-2xl border border-[#D5E2DA] overflow-hidden shadow-sm flex flex-col justify-between h-full">
                <div className="bg-[#EAF2ED] text-[#1C2E24] border-b border-[#D5E2DA] px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-medium text-[#4B5E53]">
                      Mobile App Live Screen Preview
                    </p>
                    <p className="font-display text-sm font-bold text-[#1C2E24]">
                      Shobhit Agro Mobile Interface
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-[#D5E2DA]">
                    <button
                      type="button"
                      onClick={() => setAppPreviewTab('register')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        appPreviewTab === 'register'
                          ? 'bg-[#2D6A4F] text-white'
                          : 'text-[#4B5E53] hover:text-[#1C2E24]'
                      }`}
                    >
                      1. Register
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppPreviewTab('hire')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        appPreviewTab === 'hire'
                          ? 'bg-[#2D6A4F] text-white'
                          : 'text-[#4B5E53] hover:text-[#1C2E24]'
                      }`}
                    >
                      2. Hire In
                    </button>
                    <button
                      type="button"
                      onClick={() => setAppPreviewTab('store')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                        appPreviewTab === 'store'
                          ? 'bg-[#2D6A4F] text-white'
                          : 'text-[#4B5E53] hover:text-[#1C2E24]'
                      }`}
                    >
                      3. 7:30 AM Store
                    </button>
                  </div>
                </div>

                {appPreviewTab === 'register' && (
                  <div className="p-5 space-y-3 text-xs flex-grow flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#E5ECE8] pb-2">
                        <span className="font-display text-sm font-bold text-[#1C2E24]">
                          Farmer Registration (Page 1 Preview)
                        </span>
                        <span className="text-[11px] text-[#2D6A4F] font-semibold">
                          Language: {selectedLang}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                            Select Role *
                          </label>
                          <select
                            value={regForm.role}
                            onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                          >
                            <option value="Farmer">Farmer</option>
                            <option value="CHC Partner">CHC Partner (Hire Out)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                            Name *
                          </label>
                          <input
                            type="text"
                            value={regForm.name}
                            onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                            Mobile No. *
                          </label>
                          <input
                            type="text"
                            value={regForm.mobile}
                            onChange={(e) => setRegForm({ ...regForm, mobile: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-mono-tabular font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                            District *
                          </label>
                          <input
                            type="text"
                            value={regForm.district}
                            onChange={(e) => setRegForm({ ...regForm, district: e.target.value })}
                            className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                          Village / Address *
                        </label>
                        <input
                          type="text"
                          value={regForm.address}
                          onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                        />
                      </div>

                      <div className="flex items-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setOtpSent(true)}
                          className="px-3 py-1.5 bg-[#2D6A4F] text-white rounded-md font-semibold cursor-pointer shrink-0"
                        >
                          SEND OTP
                        </button>
                        <div className="flex-grow">
                          <label className="block text-[10px] text-[#5C6F64]">
                            OTP Verified *
                          </label>
                          <input
                            type="text"
                            value={regForm.otp}
                            onChange={(e) => setRegForm({ ...regForm, otp: e.target.value })}
                            className="w-full px-2.5 py-1 bg-[#F9FBF9] border-b-2 border-[#2D6A4F] font-mono-tabular font-bold text-[#1C2E24]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E5ECE8]">
                      <span className="text-[11px] text-[#2D6A4F] font-medium">
                        {otpSent ? 'OTP 654774 Verified for Shobhit' : 'Ready to Register'}
                      </span>
                      <Link
                        to="/my-account"
                        className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-md font-semibold"
                      >
                        Open Full Profile →
                      </Link>
                    </div>
                  </div>
                )}

                {appPreviewTab === 'hire' && (
                  <div className="p-5 space-y-3 text-xs flex-grow flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#E5ECE8] pb-2">
                        <span className="font-display text-sm font-bold text-[#1C2E24]">
                          Hire In Machinery (Pages 2–4 Preview)
                        </span>
                        <span className="text-[11px] text-[#2D6A4F] font-semibold">
                          District: Fazilka
                        </span>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                          Farm Operations *
                        </label>
                        <select
                          value={selectedOperation}
                          onChange={(e) => {
                            setSelectedOperation(e.target.value);
                            setSelectedMachineName('All Machinery');
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                        >
                          <option value="All Operations">All Farm Operations (5)</option>
                          {Object.keys(FARM_OPERATIONS_MAP).map((op) => (
                            <option key={op} value={op}>
                              {op}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                          Machinery Name *
                        </label>
                        <select
                          value={selectedMachineName}
                          onChange={(e) => setSelectedMachineName(e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-medium"
                        >
                          <option value="All Machinery">All Compatible Implements</option>
                          {availableMachinesForOperation.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div>
                          <span className="block text-[11px] text-[#5C6F64] mb-1">
                            Tractor Required *
                          </span>
                          <div className="flex items-center gap-3 pt-0.5">
                            {(['Yes', 'No'] as const).map((opt) => (
                              <label key={opt} className="inline-flex items-center gap-1 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={tractorRequired === opt}
                                  onChange={() => setTractorRequired(opt)}
                                  className="accent-[#2D6A4F]"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] text-[#5C6F64] mb-0.5">
                            Cultivable Land (Acres) *
                          </label>
                          <input
                            type="number"
                            step="0.5"
                            value={landAcres}
                            onChange={(e) => setLandAcres(e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-[#F9FBF9] border border-[#D5E2DA] rounded-md font-mono-tabular font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E5ECE8]">
                      <span className="text-[11px] text-[#4B5E53]">
                        {filteredProviders.length} Providers in Fazilka
                      </span>
                      <a
                        href="#hire-machinery-section"
                        className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-md font-semibold"
                      >
                        FIND MACHINERY ↓
                      </a>
                    </div>
                  </div>
                )}

                {appPreviewTab === 'store' && (
                  <div className="p-5 space-y-3 text-xs flex-grow flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between border-b border-[#E5ECE8] pb-2">
                        <span className="font-display text-sm font-bold text-[#1C2E24]">
                          Morning 5:00–7:30 AM &amp; OzoSafe
                        </span>
                        <span className="font-mono-tabular text-[11px] font-semibold text-[#2D6A4F]">
                          Wallet ₹{BRAND_INFO.walletBalance}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-[#F2F7F4] border border-[#D5E2DA]">
                        <p className="font-semibold text-[#1C2E24]">
                          OzoSafe Ozone-Washed Fruits &amp; Veggies
                        </p>
                        <p className="text-[11px] text-[#4B5E53] mt-0.5">
                          Removes &gt;90% surface pesticides · Kills 99% germs · +4 days shelf life
                        </p>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center pt-1">
                        {MORNING_CALENDAR_DAYS.map((d) => (
                          <div
                            key={d.date}
                            className={`p-1.5 rounded-md border ${
                              d.date === '09'
                                ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                                : 'bg-[#F9FBF9] text-[#4B5E53] border-[#D5E2DA]'
                            }`}
                          >
                            <span className="block text-[10px] opacity-75">{d.day}</span>
                            <span className="font-mono-tabular font-bold text-xs">{d.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#E5ECE8]">
                      <span className="text-[11px] text-[#4B5E53]">
                        Orders by Midnight · Get by 7:30 AM
                      </span>
                      <a
                        href="#farm-store-section"
                        className="px-3.5 py-1.5 bg-[#2D6A4F] text-white rounded-md font-semibold"
                      >
                        Open Store ↓
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE MODULE 1: HIRE IN MACHINERY & SKETCH GRID */}
      <section
        id="hire-machinery-section"
        className="py-12 lg:py-16 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <SectionHeader
          kicker="App Module 01 · Custom Hiring & Local Providers"
          title="Hire In Machinery & Farm Labors"
          description="Tap any machinery sketch below to filter implements, select your Farm Operation, and book via Shobhit Hub Assured or Direct Call."
          action={
            <div className="inline-flex items-center gap-1 p-1 bg-white rounded-lg border border-[#DCE6DF]">
              <button
                type="button"
                onClick={() => setResourceTab('Equipment')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  resourceTab === 'Equipment'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#4B5E53] hover:text-[#1C2E24]'
                }`}
              >
                Equipment ({EQUIPMENT_GRID_ITEMS.length})
              </button>
              <button
                type="button"
                onClick={() => setResourceTab('Labors')}
                className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  resourceTab === 'Labors'
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#4B5E53] hover:text-[#1C2E24]'
                }`}
              >
                Labors ({LABOR_GRID_ITEMS.length})
              </button>
            </div>
          }
        />

        {/* Interactive "Hire In Machinery" Filter Bar */}
        <div className="bg-white rounded-xl border border-[#DCE6DF] p-5 sm:p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#1C2E24] mb-1.5">
                Farm Operations *
              </label>
              <select
                value={selectedOperation}
                onChange={(e) => {
                  setSelectedOperation(e.target.value);
                  setSelectedMachineName('All Machinery');
                }}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg text-[#1C2E24] font-medium focus:outline-none focus:border-[#2D6A4F]"
              >
                <option value="All Operations">All Operations (Field to Harvest)</option>
                {Object.keys(FARM_OPERATIONS_MAP).map((op) => (
                  <option key={op} value={op}>
                    {op}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2E24] mb-1.5">
                Machinery Name *
              </label>
              <select
                value={selectedMachineName}
                onChange={(e) => setSelectedMachineName(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg text-[#1C2E24] font-medium focus:outline-none focus:border-[#2D6A4F]"
              >
                <option value="All Machinery">All Machinery</option>
                {availableMachinesForOperation.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#1C2E24] mb-1.5">
                Tractor Required *
              </span>
              <div className="flex items-center gap-4 h-9 px-3 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg text-xs font-medium">
                {(['Yes', 'No'] as const).map((val) => (
                  <label key={val} className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="tractorReq"
                      checked={tractorRequired === val}
                      onChange={() => setTractorRequired(val)}
                      className="accent-[#2D6A4F]"
                    />
                    <span>{val}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1C2E24] mb-1.5">
                Cultivable Land (Acres) *
              </label>
              <input
                type="number"
                min="0.5"
                step="0.5"
                value={landAcres}
                onChange={(e) => setLandAcres(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg text-[#1C2E24] font-mono-tabular font-medium focus:outline-none focus:border-[#2D6A4F]"
              />
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#1C2E24] mb-1.5">
                Search Area: {searchAreaMode} (Fazilka)
              </span>
              <button
                type="button"
                onClick={() =>
                  setSearchAreaMode((prev) =>
                    prev === 'District' ? 'Location' : 'District'
                  )
                }
                className="w-full px-3 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#23533D] rounded-lg transition-colors cursor-pointer"
              >
                {searchAreaMode === 'District'
                  ? 'District: Fazilka'
                  : 'Village: Chhachhreki'}
              </button>
            </div>
          </div>
        </div>

        {/* Visual Sketch Equipment Grid */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold text-[#1C2E24]">
              {resourceTab === 'Equipment'
                ? 'Select Equipment Sketch (Tap any machine below)'
                : 'Available Skilled Farm Labor Crews'}
            </h3>
            {selectedMachineName !== 'All Machinery' && (
              <button
                type="button"
                onClick={() => setSelectedMachineName('All Machinery')}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline cursor-pointer"
              >
                Show All Equipment
              </button>
            )}
          </div>

          {resourceTab === 'Equipment' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {EQUIPMENT_GRID_ITEMS.map((eq) => {
                const isSelected = selectedMachineName === eq.name;
                return (
                  <button
                    key={eq.id}
                    type="button"
                    onClick={() =>
                      setSelectedMachineName(isSelected ? 'All Machinery' : eq.name)
                    }
                    className={`group rounded-2xl border p-3 transition-all cursor-pointer flex flex-col items-center text-center bg-white ${
                      isSelected
                        ? 'border-2 border-[#2D6A4F] bg-[#F2F7F4]'
                        : 'border-[#DCE6DF] hover:border-[#84A98C]'
                    }`}
                  >
                    <MachinerySketch
                      name={eq.name}
                      imageSrc={eq.sketchSrc}
                      className="w-full aspect-square rounded-xl mb-2"
                    />
                    <span className="font-display text-sm font-bold text-[#1C2E24] group-hover:text-[#2D6A4F]">
                      {eq.name}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-[#5C6F64] mt-0.5">
                      ₹{eq.basePrice} / {eq.unit}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {LABOR_GRID_ITEMS.map((lab) => (
                <div
                  key={lab.id}
                  className="p-4 rounded-xl bg-white border border-[#DCE6DF] flex flex-col justify-between space-y-3"
                >
                  <div>
                    <p className="text-xs text-[#2D6A4F] font-medium">{lab.operation}</p>
                    <h4 className="font-display text-base font-bold text-[#1C2E24] mt-1">
                      {lab.name}
                    </h4>
                  </div>
                  <div className="pt-2 border-t border-[#E6EFE8] flex items-center justify-between">
                    <span className="font-mono-tabular text-sm font-bold text-[#1C2E24]">
                      ₹{lab.basePrice} / {lab.unit}
                    </span>
                    <Link
                      to="/my-bookings"
                      className="text-xs font-semibold text-[#2D6A4F] hover:underline"
                    >
                      Request Crew →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 2 Booking Modes Banner (Soft Light Surfaces) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            onClick={() =>
              setBookingModeFilter(
                bookingModeFilter === 'Hub Assured' ? 'All' : 'Hub Assured'
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setBookingModeFilter(
                  bookingModeFilter === 'Hub Assured' ? 'All' : 'Hub Assured'
                );
              }
            }}
            className={`p-5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
              bookingModeFilter === 'Hub Assured'
                ? 'bg-[#EAF2ED] text-[#1C2E24] border-[#2D6A4F]'
                : 'bg-white text-[#1C2E24] border-[#DCE6DF] hover:border-[#84A98C]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F]">
                <ShieldCheck className="w-4 h-4" />
                <span>Option A · Shobhit Hub Assured</span>
              </div>
              <h4 className="font-display text-base font-bold text-[#1C2E24]">
                Get machinery on time with lower rent, guaranteed by Hub
              </h4>
              <p className="text-xs text-[#4B5E53]">
                Fixed per-acre rates · Verified operator · Backed by Fazilka CHC
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#2D6A4F] text-white shrink-0">
              {bookingModeFilter === 'Hub Assured' ? 'Showing Assured' : 'Filter Assured'}
            </span>
          </div>

          <div
            onClick={() =>
              setBookingModeFilter(
                bookingModeFilter === 'Direct Call' ? 'All' : 'Direct Call'
              )
            }
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setBookingModeFilter(
                  bookingModeFilter === 'Direct Call' ? 'All' : 'Direct Call'
                );
              }
            }}
            className={`p-5 rounded-xl border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
              bookingModeFilter === 'Direct Call'
                ? 'bg-[#EAF2ED] text-[#1C2E24] border-[#2D6A4F]'
                : 'bg-white text-[#1C2E24] border-[#DCE6DF] hover:border-[#84A98C]'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#2D6A4F]">
                <PhoneCall className="w-4 h-4" />
                <span>Option B · Direct Call to Owner</span>
              </div>
              <h4 className="font-display text-base font-bold text-[#1C2E24]">
                Find machinery in your nearest village and call them directly
              </h4>
              <p className="text-xs text-[#4B5E53]">
                Zero platform commission · Negotiate timing directly with local tractor owners
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EFF5F1] text-[#1C2E24] border border-[#D5E2DA] shrink-0">
              {bookingModeFilter === 'Direct Call' ? 'Showing Direct' : 'Filter Direct'}
            </span>
          </div>
        </div>

        {/* Provider Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((prov) => (
            <article
              key={prov.id}
              className="bg-white rounded-xl border border-[#DCE6DF] overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full bg-white relative overflow-hidden border-b border-[#E6EFE8] flex items-center justify-center">
                  <SmartImage
                    src={prov.image}
                    alt={prov.name}
                    className={`w-full h-full ${
                      prov.isSketch ? 'object-contain p-4 bg-white' : 'object-cover'
                    }`}
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#1C2E24] bg-white/95 border border-[#DCE6DF] px-3 py-1.5 rounded-lg shadow-2xs">
                    <span className="font-semibold text-[#2D6A4F]">{prov.bookingType}</span>
                    <span className="font-mono-tabular text-[#4B5E53]">{prov.distanceKm} km away</span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#2D6A4F] font-medium">
                    <span>
                      {prov.operation} · {prov.village}
                    </span>
                    <span className="font-mono-tabular">★ {prov.rating}</span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#1C2E24] leading-snug">
                    {prov.name}
                  </h3>
                  <p className="text-xs text-[#5C6F64]">{prov.localName}</p>
                  <p className="text-xs text-[#4B5E53] leading-relaxed">
                    {prov.description}
                  </p>

                  <div className="pt-2 border-t border-[#E6EFE8] text-xs text-[#4B5E53]">
                    <p>
                      <span className="font-semibold text-[#1C2E24]">Provider:</span> {prov.providerName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#E6EFE8] flex items-center justify-between gap-3">
                <div>
                  <span className="font-mono-tabular text-lg font-bold text-[#1C2E24]">
                    ₹{prov.rate.toLocaleString('en-IN')}
                  </span>
                  <span className="block text-[11px] text-[#5C6F64]">
                    {prov.rateUnit}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBookingModalProvider(prov);
                    setWorkQuantity(landAcres || '3');
                    setBookedSuccessId(null);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#23533D] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Book Now →
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE MODULE 2: MORNING 7:30 AM SUBSCRIPTION & OZOSAFE STORE */}
      <section
        id="farm-store-section"
        className="py-12 lg:py-16 bg-white border-t border-[#E5ECE8]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="App Module 02 · Morning 7:30 AM Subscription & Everyday Store"
            title="OzoSafe Fruits & Veggies, Pure Milk & Desi Essentials"
            description="Orders placed by midnight are delivered between 5:00 AM and 7:30 AM. Featuring actual product packs from the store catalog."
            action={
              <div className="inline-flex items-center gap-1 p-1 bg-[#F2F6F3] rounded-lg border border-[#DCE6DF]">
                {(['All', 'Morning 7:30 AM', 'Store Delivery'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setStoreDeliveryTab(tab)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      storeDeliveryTab === tab
                        ? 'bg-[#2D6A4F] text-white'
                        : 'text-[#4B5E53] hover:text-[#1C2E24]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            }
          />

          {/* Morning 5:00–7:30 AM Subscription Calendar + Light OzoSafe Comparison Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
            <div className="lg:col-span-7 bg-[#F9FBF9] rounded-xl border border-[#DCE6DF] p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#2D6A4F]">
                    Morning Slot: 05:00 AM – 07:30 AM
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#1C2E24]">
                    Pause or Restart Subscriptions (Orders by Midnight)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSubscriptionPaused((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    subscriptionPaused
                      ? 'bg-amber-600 text-white'
                      : 'bg-[#2D6A4F] text-white hover:bg-[#23533D]'
                  }`}
                >
                  {subscriptionPaused ? 'Resume Tomorrow’s Slot' : 'Pause Tomorrow'}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {MORNING_CALENDAR_DAYS.map((item) => {
                  const isSelected = selectedCalendarDate === item.date;
                  return (
                    <button
                      key={item.date}
                      type="button"
                      onClick={() => setSelectedCalendarDate(item.date)}
                      className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]'
                          : 'bg-white text-[#1C2E24] border-[#DCE6DF] hover:border-[#84A98C]'
                      }`}
                    >
                      <span className="block text-[11px] opacity-75">{item.day}</span>
                      <span className="font-mono-tabular text-base font-bold mt-0.5 block">
                        {item.date}
                      </span>
                      <span
                        className={`block text-[10px] mt-1 truncate ${
                          isSelected ? 'text-emerald-100' : 'text-[#2D6A4F]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-[#DCE6DF] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4B5E53]">
                <span>
                  Selected Day ({selectedCalendarDate} Nov):{' '}
                  <strong className="text-[#1C2E24]">
                    {subscriptionPaused
                      ? 'Subscription Paused (Vacation Mode)'
                      : MORNING_CALENDAR_DAYS.find((d) => d.date === selectedCalendarDate)
                          ?.label}
                  </strong>
                </span>
                <span className="text-[#2D6A4F] font-semibold">
                  Delivered · Upcoming · Vacation
                </span>
              </div>
            </div>

            {/* Light Soft-Sage OzoSafe Comparison Card */}
            <div className="lg:col-span-5 bg-[#F2F7F4] text-[#1C2E24] rounded-xl border border-[#D5E2DA] p-5 sm:p-6 flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
                    Fresh Is Now OzoSafe
                  </span>
                  <h3 className="font-display text-lg font-bold text-[#1C2E24] mt-0.5">
                    Ozone-Washed Fruits &amp; Veggies
                  </h3>
                </div>
                <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#D5E2DA] text-[#4B5E53]">
                      <th className="py-2 pr-2 font-semibold">Feature</th>
                      <th className="py-2 px-2 font-semibold text-[#2D6A4F]">
                        Ozone Washing
                      </th>
                      <th className="py-2 pl-2 font-semibold text-[#5C6F64]">
                        Water Washing
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2ECE6]">
                    {OZOSAFE_COMPARISON.map((row) => (
                      <tr key={row.feature}>
                        <td className="py-2 pr-2 text-[#1C2E24] font-medium">{row.feature}</td>
                        <td className="py-2 px-2 font-mono-tabular font-bold text-[#2D6A4F]">
                          {row.ozoSafe}
                        </td>
                        <td className="py-2 pl-2 text-[#5C6F64]">{row.basicWater}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-[#4B5E53]">
                Zero chemical residue · Scientifically cleaned before packing into morning crates.
              </p>
            </div>
          </div>

          {/* Store Category Filter Bar */}
          <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
            <div className="flex items-center gap-1.5 p-1.5 bg-[#F2F6F3] rounded-lg border border-[#E2EBE4] overflow-x-auto">
              {storeCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setStoreCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    storeCategory === cat
                      ? 'bg-white text-[#1C2E24] shadow-2xs border border-[#DCE6DF]'
                      : 'text-[#4B5E53] hover:text-[#1C2E24]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {totalCartItems > 0 && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#EFF5F1] border border-[#D5E2DA] text-[#1C2E24] text-xs">
                <span className="font-mono-tabular font-semibold">
                  Demo Bag: {totalCartItems} items · ₹{totalCartAmount.toLocaleString('en-IN')}
                </span>
                <Link
                  to="/my-orders"
                  className="text-[#2D6A4F] font-semibold hover:underline"
                >
                  View Order Preview →
                </Link>
              </div>
            )}
          </div>

          {/* Store Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const qty = cartQuantities[product.id] || 0;
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-xl border border-[#DCE6DF] overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[4/3] w-full bg-[#FAFDFB] border-b border-[#E6EFE8] flex items-center justify-center overflow-hidden p-3">
                      <SmartImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-xs text-[#2D6A4F] font-medium">
                        <span>{product.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{product.deliveryMode}</span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-[#1C2E24] leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-[#4B5E53]">
                        {product.packSize} · {product.tag}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-[#E6EFE8] flex items-center justify-between gap-3">
                    <div>
                      <span className="font-mono-tabular text-lg font-bold text-[#1C2E24]">
                        ₹{product.price}
                      </span>
                      <span className="font-mono-tabular text-xs text-[#708278] line-through ml-2">
                        ₹{product.mrp}
                      </span>
                      <span className="block text-[11px] text-[#2D6A4F] font-medium">
                        Save ₹{product.mrp - product.price} / pack
                      </span>
                    </div>

                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => updateCart(product.id, 1)}
                        className="px-4 py-2 text-xs font-semibold text-[#2D6A4F] bg-[#F2F7F4] hover:bg-[#2D6A4F] hover:text-white border border-[#B8D0C2] rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-[#2D6A4F] text-white px-2.5 py-1.5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-mono-tabular text-xs font-bold min-w-[16px] text-center">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCart(product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center rounded hover:bg-white/15 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* MODAL: BOOK SERVICE WORK ESTIMATOR */}
      {bookingModalProvider && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-service-title"
        >
          <div className="bg-white rounded-2xl border border-[#DCE6DF] max-w-md w-full overflow-hidden shadow-xl">
            <div className="bg-[#EFF5F1] text-[#1C2E24] border-b border-[#DCE6DF] px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#2D6A4F] font-semibold uppercase">
                  {bookingModalProvider.bookingType} · {bookingModalProvider.village}
                </p>
                <h3 id="book-service-title" className="font-display text-base font-bold">
                  Book Service
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setBookingModalProvider(null)}
                className="w-8 h-8 rounded-lg bg-white border border-[#DCE6DF] flex items-center justify-center hover:bg-[#F2F6F3] cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E6EFE8]">
                <div>
                  <h4 className="font-display text-base font-bold text-[#1C2E24]">
                    {bookingModalProvider.name}
                  </h4>
                  <p className="text-xs text-[#5C6F64]">{bookingModalProvider.providerName}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono-tabular text-base font-bold text-[#2D6A4F]">
                    ₹{bookingModalProvider.rate}
                  </span>
                  <span className="block text-[10px] text-[#5C6F64]">
                    {bookingModalProvider.rateUnit}
                  </span>
                </div>
              </div>

              {bookedSuccessId ? (
                <div className="p-4 rounded-xl bg-[#F2F7F4] border border-[#B8D0C2] space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#1C2E24] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                    <span>Demo Request Logged ({bookedSuccessId})</span>
                  </div>
                  <p className="text-[#4B5E53]">
                    Farmer: <strong>{BRAND_INFO.farmerName}</strong> ({BRAND_INFO.mobileNo}) · Work:{' '}
                    <strong>{workQuantity} Units/Acres</strong> · Est. Total:{' '}
                    <strong className="font-mono-tabular">
                      ₹{(Number(workQuantity || 1) * bookingModalProvider.rate).toLocaleString('en-IN')}
                    </strong>
                  </p>
                  <div className="pt-2 flex justify-end gap-2">
                    <Link
                      to="/my-bookings"
                      onClick={() => setBookingModalProvider(null)}
                      className="px-3.5 py-2 bg-[#2D6A4F] text-white rounded-lg font-semibold"
                    >
                      View in My Bookings →
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-3 text-xs">
                    <p className="font-display text-sm font-bold text-[#1C2E24]">
                      Enter estimated work detail
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#5C6F64] mb-1">
                          How much work? (e.g. 3 or 3.5)
                        </label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          value={workQuantity}
                          onChange={(e) => setWorkQuantity(e.target.value)}
                          className="w-full px-3 py-2 border border-[#2D6A4F] rounded-lg font-mono-tabular font-bold text-sm text-[#1C2E24]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#5C6F64] mb-1">Tariff Basis</label>
                        <div className="px-3 py-2 bg-[#F4F8F5] border border-[#DCE6DF] rounded-lg font-medium text-[#4B5E53]">
                          {bookingModalProvider.rateUnit}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#5C6F64] mb-1">
                        Additional Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={workNote}
                        onChange={(e) => setWorkNote(e.target.value)}
                        placeholder="Any special instructions for field entry or crop..."
                        className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg text-[#1C2E24]"
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-[#F4F8F5] flex items-center justify-between">
                      <span className="text-[#4B5E53]">Estimated Rent Total:</span>
                      <span className="font-mono-tabular text-base font-bold text-[#1C2E24]">
                        ₹
                        {(
                          Math.max(0.5, Number(workQuantity) || 1) *
                          bookingModalProvider.rate
                        ).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setBookingModalProvider(null)}
                      className="px-4 py-2 text-xs font-semibold text-[#4B5E53] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookedSuccessId('CHC-2026-904')}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#23533D] rounded-lg transition-colors cursor-pointer"
                    >
                      Confirm Demo Booking
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
