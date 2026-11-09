import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../ui/BrandLogo';
import { BRAND_INFO } from '../../data/mockData';
import { APP_ROUTES } from './Navbar';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F2F6F3] text-[#1C2E24] border-t border-[#DCE6DF] pb-16 lg:pb-0">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#DCE6DF]">
          {/* Brand & Farmer Demo Context */}
          <div className="md:col-span-5 space-y-3">
            <BrandLogo variant="dark" />
            <p className="text-xs sm:text-sm text-[#4B5E53] leading-relaxed max-w-md">
              {BRAND_INFO.tagline} Unified Web &amp; Mobile App Demo combining Custom Hiring Center (CHC) Machinery Rental and OzoSafe Morning 7:30 AM Farm Store.
            </p>
            <p className="text-xs text-[#5C6F64] font-mono-tabular">
              Active Demo Farmer: {BRAND_INFO.farmerName} · {BRAND_INFO.mobileNo} · {BRAND_INFO.address}, District {BRAND_INFO.district}
            </p>
          </div>

          {/* All 7 App & Web Routes */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              App Screens &amp; Demo Routes
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#4B5E53]">
              {APP_ROUTES.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  className="hover:text-[#1C2E24] transition-colors py-0.5 whitespace-nowrap"
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>

          {/* App Modules Summary */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#2D6A4F]">
              Core App Capabilities
            </h3>
            <ul className="space-y-1.5 text-xs text-[#4B5E53]">
              <li>Hire In &amp; Hire Out Farm Machinery</li>
              <li>Hub Assured vs. Direct Call Providers</li>
              <li>OzoSafe Ozone-Washed Veggies (&gt;90% Clean)</li>
              <li>Midnight Order · 7:30 AM Morning Subscription</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#5C6F64]">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.name} · Web &amp; Mobile App Interactive Prototype
          </p>
          <p>
            <span>District {BRAND_INFO.district} CHC</span>
            <span aria-hidden="true"> · </span>
            <span>Helpline: {BRAND_INFO.helpline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
