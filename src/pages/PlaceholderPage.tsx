import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, MapPin } from 'lucide-react';
import {
  BRAND_INFO,
  MACHINERY_PROVIDERS,
  STORE_PRODUCTS,
  FARM_OPERATIONS_MAP,
  EQUIPMENT_GRID_ITEMS,
} from '../data/mockData';
import { SmartImage } from '../components/ui/SmartImage';
import { MachinerySketch } from '../components/ui/MachinerySketch';
import { APP_ROUTES } from '../components/layout/Navbar';

export type RouteKey =
  | 'machinery'
  | 'shop'
  | 'my-bookings'
  | 'my-orders'
  | 'my-account'
  | 'admin';

interface PlaceholderPageProps {
  routeKey: RouteKey;
}

const ROUTE_CONFIG: Record<
  RouteKey,
  {
    kicker: string;
    title: string;
    subtitle: string;
  }
> = {
  machinery: {
    kicker: 'App Screen · Equipment Sketches & CHC Providers',
    title: 'Farm Machinery Finder (District Fazilka)',
    subtitle:
      'Browse equipment via technical line-art sketches and real field units across Field Preparation, Sowing, Weeding, Spraying, and Harvesting.',
  },
  shop: {
    kicker: 'App Screen · Morning 7:30 AM & OzoSafe Store',
    title: 'OzoSafe Fruits & Veggies, Milk, Ghee & Honey',
    subtitle:
      'Orders by Midnight delivered by 7:30 AM, plus everyday organic staples including Desi Danedar Ghee, Wild Forest Honey, and Cold-Pressed Oils.',
  },
  'my-bookings': {
    kicker: 'App Screen · Drawer Menu -> My Booking Details',
    title: 'My Machinery Bookings & Order Receipts',
    subtitle:
      'Active and past custom hiring bookings for Shobhit (Mobile No. 7668927719 · Village Chhachhreki, Fazilka).',
  },
  'my-orders': {
    kicker: 'App Screen · Morning Subscriptions & Store Orders',
    title: 'My 7:30 AM Deliveries & Grocery Orders',
    subtitle:
      'Track daily morning milk & OzoSafe vegetable deliveries and manage your ₹216.15 app wallet balance.',
  },
  'my-account': {
    kicker: 'App Screen · Farmer Registration & Profile (PDF Pages 1, 6, 7)',
    title: 'Farmer Profile & Language Preferences',
    subtitle:
      'Registered Farmer: Shobhit · Mobile: 7668927719 · Location: VPR6+J3, Shakhupur Urf Chachraki, District Fazilka.',
  },
  admin: {
    kicker: 'App Screen · CHC Partner & Hub Admin',
    title: 'Hire Out Machinery & CHC Partner Console',
    subtitle:
      'List your tractor or implement for rent in Fazilka and manage incoming farmer booking requests.',
  },
};

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ routeKey }) => {
  const config = ROUTE_CONFIG[routeKey];
  const [profileSaved, setProfileSaved] = useState(false);

  return (
    <div className="min-h-screen bg-[#F9FBF9] text-[#1C2E24] pb-20">
      <section className="bg-[#F2F7F4] text-[#1C2E24] py-10 border-b border-[#DCE6DF]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-wider uppercase text-[#2D6A4F]">
              {config.kicker}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2D6A4F] hover:text-[#1C2E24] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Interactive Demo Home</span>
            </Link>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1C2E24]">
            {config.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#4B5E53] max-w-2xl leading-relaxed">
            {config.subtitle}
          </p>
        </div>
      </section>

      <div className="bg-white border-b border-[#E5ECE8]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-2 overflow-x-auto">
          {APP_ROUTES.map((route) => {
            const isCurrent = route.path === `/${routeKey}`;
            return (
              <Link
                key={route.path}
                to={route.path}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isCurrent
                    ? 'bg-[#2D6A4F] text-white'
                    : 'text-[#4B5E53] hover:bg-[#EFF5F1]'
                }`}
              >
                {route.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {routeKey === 'my-account' && (
          <div className="max-w-xl bg-white rounded-xl border border-[#DCE6DF] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#1C2E24]">
              Complete Your Profile / Farmer Registration (PDF Pages 1 &amp; 7)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#5C6F64] mb-1">Select Role *</label>
                <input
                  type="text"
                  defaultValue="Farmer"
                  className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg font-medium"
                />
              </div>
              <div>
                <label className="block text-[#5C6F64] mb-1">Full Name *</label>
                <input
                  type="text"
                  defaultValue={BRAND_INFO.farmerName}
                  className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg font-medium"
                />
              </div>
              <div>
                <label className="block text-[#5C6F64] mb-1">Mobile No. *</label>
                <input
                  type="text"
                  defaultValue={BRAND_INFO.mobileNo}
                  className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg font-mono-tabular font-medium"
                />
              </div>
              <div>
                <label className="block text-[#5C6F64] mb-1">District *</label>
                <input
                  type="text"
                  defaultValue={BRAND_INFO.district}
                  className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg font-medium"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-[#5C6F64] mb-1">
                  Location / Village Address *
                </label>
                <input
                  type="text"
                  defaultValue={BRAND_INFO.address}
                  className="w-full px-3 py-2 bg-[#F9FBF9] border border-[#CBD8CE] rounded-lg font-medium"
                />
                <p className="text-[11px] text-[#2D6A4F] mt-1 inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> GPS Current Location Enabled
                </p>
              </div>
            </div>

            {profileSaved && (
              <div className="p-3 rounded-lg bg-[#F2F7F4] border border-[#B8D0C2] text-xs text-[#1C2E24] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2D6A4F]" />
                <span>Farmer Profile saved for Shobhit (Fazilka).</span>
              </div>
            )}

            <button
              type="button"
              onClick={() => setProfileSaved(true)}
              className="px-5 py-2.5 bg-[#2D6A4F] hover:bg-[#23533D] text-white text-xs font-semibold rounded-lg cursor-pointer transition-colors"
            >
              Update Profile
            </button>
          </div>
        )}

        {routeKey === 'machinery' && (
          <div className="space-y-8">
            <div>
              <h2 className="font-display text-lg font-bold text-[#1C2E24] mb-4">
                Equipment Technical Sketches (Matches App Grid)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {EQUIPMENT_GRID_ITEMS.map((eq) => (
                  <div
                    key={eq.id}
                    className="rounded-2xl border border-[#DCE6DF] bg-white p-3 flex flex-col items-center text-center"
                  >
                    <MachinerySketch
                      name={eq.name}
                      imageSrc={eq.sketchSrc}
                      className="w-full aspect-square rounded-xl mb-2"
                    />
                    <span className="font-display text-sm font-bold text-[#1C2E24]">
                      {eq.name}
                    </span>
                    <span className="font-mono-tabular text-[11px] text-[#5C6F64] mt-0.5">
                      ₹{eq.basePrice} / {eq.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold text-[#1C2E24] mb-4">
                Available Providers in Fazilka
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MACHINERY_PROVIDERS.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white rounded-xl border border-[#DCE6DF] overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[4/3] bg-white border-b border-[#E6EFE8] flex items-center justify-center">
                        <SmartImage
                          src={p.image}
                          alt={p.name}
                          className={`w-full h-full ${
                            p.isSketch ? 'object-contain p-4' : 'object-cover'
                          }`}
                        />
                      </div>
                      <div className="p-5 space-y-2">
                        <p className="text-xs text-[#2D6A4F] font-medium">
                          {p.bookingType} · {p.operation} · {p.distanceKm} km
                        </p>
                        <h3 className="font-display text-lg font-bold text-[#1C2E24]">
                          {p.name}
                        </h3>
                        <p className="text-xs text-[#4B5E53]">{p.providerName}</p>
                      </div>
                    </div>
                    <div className="px-5 pb-5 pt-3 border-t border-[#E6EFE8] flex items-center justify-between">
                      <span className="font-mono-tabular text-base font-bold text-[#1C2E24]">
                        ₹{p.rate} · {p.rateUnit}
                      </span>
                      <Link
                        to="/"
                        className="text-xs font-semibold text-[#2D6A4F] hover:underline"
                      >
                        Estimate &amp; Book →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {routeKey === 'shop' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STORE_PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#DCE6DF] overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-[#FAFDFB] border-b border-[#E6EFE8] p-3 flex items-center justify-center">
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <p className="text-xs text-[#2D6A4F] font-medium">
                      {item.category} · {item.deliveryMode}
                    </p>
                    <h3 className="font-display text-lg font-bold text-[#1C2E24]">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#4B5E53]">
                      {item.packSize} · {item.tag}
                    </p>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 border-t border-[#E6EFE8] flex items-center justify-between">
                  <span className="font-mono-tabular text-base font-bold text-[#1C2E24]">
                    ₹{item.price}{' '}
                    <span className="text-xs text-[#708278] line-through font-normal">
                      ₹{item.mrp}
                    </span>
                  </span>
                  <Link
                    to="/"
                    className="text-xs font-semibold text-[#2D6A4F] hover:underline"
                  >
                    Add on Home →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {(routeKey === 'my-bookings' ||
          routeKey === 'my-orders' ||
          routeKey === 'admin') && (
          <div className="bg-white rounded-xl border border-[#DCE6DF] p-6 space-y-4">
            <h2 className="font-display text-lg font-bold text-[#1C2E24]">
              {config.title} — Demo Records
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#DCE6DF] text-[#4B5E53]">
                    <th className="py-2.5 pr-4">Order / Booking ID</th>
                    <th className="py-2.5 px-4">Service / Item</th>
                    <th className="py-2.5 px-4">Location / Mode</th>
                    <th className="py-2.5 pl-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6EFE8] font-mono-tabular">
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[#2D6A4F]">CHC-2026-901</td>
                    <td className="py-3 px-4 font-sans">
                      Manure Spreader (खत पसरवणे यंत्र) · 3 Acres
                    </td>
                    <td className="py-3 px-4 font-sans">
                      Hub Assured · Chhachhreki, Fazilka
                    </td>
                    <td className="py-3 pl-4 text-right font-semibold">₹1,650</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[#2D6A4F]">CHC-2026-898</td>
                    <td className="py-3 px-4 font-sans">
                      Field Preparation · Rotavator (Tractor Included) · 3.5 Acres
                    </td>
                    <td className="py-3 px-4 font-sans">
                      Hub Assured · District Fazilka
                    </td>
                    <td className="py-3 pl-4 text-right font-semibold">₹2,275</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-[#2D6A4F]">MORN-730-412</td>
                    <td className="py-3 px-4 font-sans">
                      Morning 7:30 AM Slot: Organic Cow Milk (2x 500ml) + OzoSafe Veggies
                    </td>
                    <td className="py-3 px-4 font-sans">
                      Daily Subscription · Shakhupur Urf Chachraki
                    </td>
                    <td className="py-3 pl-4 text-right font-semibold">₹249</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {routeKey === 'admin' && (
              <div className="pt-4 border-t border-[#E6EFE8] text-xs text-[#4B5E53]">
                <p className="font-semibold text-[#1C2E24] mb-1">
                  Supported Farm Operations in CHC Catalog:
                </p>
                <p>{Object.keys(FARM_OPERATIONS_MAP).join(' · ')}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
