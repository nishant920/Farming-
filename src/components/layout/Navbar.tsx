import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowUpRight,
  Home,
  Tractor,
  ShoppingBag,
  CalendarCheck,
  User,
} from 'lucide-react';
import { BrandLogo } from '../ui/BrandLogo';

interface NavRouteItem {
  label: string;
  path: string;
  primaryNav?: boolean;
}

export const APP_ROUTES: NavRouteItem[] = [
  { label: 'Home', path: '/', primaryNav: true },
  { label: 'Machinery', path: '/machinery', primaryNav: true },
  { label: 'Shop', path: '/shop', primaryNav: true },
  { label: 'My Bookings', path: '/my-bookings', primaryNav: true },
  { label: 'My Orders', path: '/my-orders', primaryNav: false },
  { label: 'My Account', path: '/my-account', primaryNav: true },
  { label: 'Admin Dashboard', path: '/admin', primaryNav: false },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const primaryLinks = APP_ROUTES.filter((r) => r.primaryNav);

  const bottomTabs = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Machinery', path: '/machinery', icon: Tractor },
    { label: 'Store', path: '/shop', icon: ShoppingBag },
    { label: 'Bookings', path: '/my-bookings', icon: CalendarCheck },
    { label: 'Profile', path: '/my-account', icon: User },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5ECE8]">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
          {/* Zone 1: Single-line Brand Wordmark */}
          <BrandLogo variant="dark" />

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#4B5E53]"
            aria-label="Primary Navigation"
          >
            {primaryLinks.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'text-[#1C2E24] font-semibold border-[#2D6A4F]'
                      : 'border-transparent hover:text-[#1C2E24] hover:border-[#2D6A4F]/40'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action (+ Mobile Menu Toggle) */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/machinery"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D6A4F] hover:bg-[#23533D] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Hire In Machinery</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#1C2E24] hover:bg-[#F1F6F3] transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* App Drawer Menu (Light, soft sage styling) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E5ECE8] px-4 pt-3 pb-5 space-y-3">
            <div className="p-3.5 rounded-xl bg-[#F2F7F4] border border-[#DCE7E0] text-[#1C2E24] flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-bold">Welcome Shobhit !!</p>
                <p className="font-mono-tabular text-xs text-[#4B5E53]">
                  Mobile No. 7668927719 · District Fazilka
                </p>
              </div>
              <Link
                to="/my-account"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline"
              >
                Update Profile
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {APP_ROUTES.map((item) => {
                const isActive =
                  item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive
                        ? 'bg-[#E8F1EC] text-[#1C2E24] font-semibold'
                        : 'text-[#4B5E53] hover:bg-[#F4F8F6]'
                    }`}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Mobile App Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5ECE8] grid grid-cols-5 items-center h-14 px-2"
        aria-label="Mobile App Tab Navigation"
      >
        {bottomTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(tab.path);
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center min-h-[44px] transition-colors ${
                isActive ? 'text-[#2D6A4F] font-semibold' : 'text-[#5C6F64] hover:text-[#1C2E24]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};
