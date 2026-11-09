/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PlaceholderPage } from './pages/PlaceholderPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#F9FBF9] text-[#1C2E24]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/machinery" element={<PlaceholderPage routeKey="machinery" />} />
            <Route path="/shop" element={<PlaceholderPage routeKey="shop" />} />
            <Route path="/my-bookings" element={<PlaceholderPage routeKey="my-bookings" />} />
            <Route path="/my-orders" element={<PlaceholderPage routeKey="my-orders" />} />
            <Route path="/my-account" element={<PlaceholderPage routeKey="my-account" />} />
            <Route path="/admin" element={<PlaceholderPage routeKey="admin" />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
