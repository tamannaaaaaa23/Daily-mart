/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingCart, Heart, MapPin, Globe, ChevronDown, Sparkles, TrendingUp, HelpCircle } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ActiveTab, Product } from '../types';

interface NavbarProps {
  lang: 'en' | 'bn';
  setLang: (l: 'en' | 'bn') => void;
  cartCount: number;
  onCartClick: () => void;
  wishlistCount: number;
  onWishlistClick: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onSelectProduct: (p: Product) => void;
  products: Product[];
}

export default function Navbar({
  lang,
  setLang,
  cartCount,
  onCartClick,
  wishlistCount,
  onWishlistClick,
  activeTab,
  setActiveTab,
  onSelectProduct,
  products,
}: NavbarProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('Chattogram');
  const [zoneDropdownOpen, setZoneDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const zones = ['Chattogram', 'Dhaka', 'Sylhet', 'Khulna', 'Rajshahi'];

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search
  const filteredProducts = searchQuery.trim()
    ? products.filter(p => {
        const query = searchQuery.toLowerCase();
        const mainMatch = p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
        const bnMatch = p.bnName && p.bnName.toLowerCase().includes(query);
        return mainMatch || bnMatch;
      }).slice(0, 5)
    : [];

  const handleSuggestionClick = (p: Product) => {
    onSelectProduct(p);
    setSearchQuery('');
    setSearchFocused(false);
  };

  const trendingSearches = lang === 'en' 
    ? ['Kalijira Rice', 'Mustard Oil', 'Handloom Panjabi', 'Sandalwood']
    : ['কালিজিরা চাল', 'সরিষার তেল', 'তাঁতের পাঞ্জাবি', 'চন্দন গুঁড়া'];

  return (
    <header id="app-header" className="sticky top-0 z-45 glass-panel shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div 
            id="brand-logo-container"
            onClick={() => setActiveTab('home')} 
            className="flex items-center gap-2.5 cursor-pointer shrink-0 transition-transform hover:scale-102"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0E5E4A] to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 border border-white/10">
              <span className="font-title text-xl font-bold tracking-tighter">DM</span>
            </div>
            <div>
              <span className="font-title text-xl font-bold text-[#1A1A1A] tracking-tight block">
                Daily <span className="text-[#0E5E4A]">Mart</span>
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase -mt-1 block">
                Premium Retail
              </span>
            </div>
          </div>

          {/* Location Delivery Selector (Bangladesh Zones) */}
          <div className="hidden lg:flex items-center gap-2 border-r border-gray-100 pr-4 relative">
            <div className="realistic-icon w-8 h-8 text-[#0E5E4A] shrink-0">
              <MapPin className="w-4 h-4 filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <span className="text-[10px] text-gray-400 block font-sans">
                {lang === 'en' ? 'Deliver to' : 'ডেলিভারি জোন'}
              </span>
              <button 
                onClick={() => setZoneDropdownOpen(!zoneDropdownOpen)}
                className="text-xs font-semibold text-charcoal flex items-center gap-1 hover:text-[#0E5E4A] transition-colors"
              >
                {selectedZone === 'Chattogram' && lang === 'bn' ? 'চট্টগ্রাম (হাব)' : selectedZone}
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>
            </div>

            {zoneDropdownOpen && (
              <div className="absolute top-12 left-0 w-44 bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {zones.map((zone) => (
                  <button
                    key={zone}
                    onClick={() => {
                      setSelectedZone(zone);
                      setZoneDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-gray-50 flex items-center justify-between ${
                      selectedZone === zone ? 'text-[#0E5E4A] bg-emerald-55/40' : 'text-gray-600'
                    }`}
                  >
                    {zone}
                    {selectedZone === zone && <div className="w-1.5 h-1.5 rounded-full bg-[#0E5E4A]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SMART FLOATING SEARCH BAR with Autocomplete */}
          <div ref={searchRef} className="flex-1 max-w-xl relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder={lang === 'en' ? "Search groceries, fashion, electronics, cosmetics..." : "খাদ্যসামগ্রী, ফ্যাশন, ইলেকট্রনিক্স খুঁজুন..."}
                className="w-full bg-white/50 backdrop-blur-xs border border-gray-250 rounded-xl py-2.5 pl-11 pr-4 text-xs font-medium focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white transition-all text-charcoal shadow-inner"
              />
              <Search className="w-4 h-4 text-[#0E5E4A]/80 absolute left-4 top-3.5 filter drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" strokeWidth={2.5} />
            </div>

            {/* Smart Search Predictions Dropdown */}
            {searchFocused && (
              <div className="absolute top-13 left-0 w-full bg-white/95 backdrop-blur-md rounded-xl border border-neutral-200/50 shadow-2xl py-4 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                {/* Search Query Matches */}
                {searchQuery.trim() ? (
                  <div className="px-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-2 font-mono">
                      {lang === 'en' ? 'Matched Products' : 'মেলা পণ্য তালিকা'}
                    </span>
                    {filteredProducts.length > 0 ? (
                      <div className="space-y-2">
                        {filteredProducts.map((p) => {
                          const hasDiscount = p.discountPercent && p.discountPercent > 0;
                          const finalPrice = hasDiscount && p.discountPercent
                            ? p.price - (p.price * p.discountPercent) / 100
                            : p.price;
                          return (
                            <div
                              key={p.id}
                              onClick={() => handleSuggestionClick(p)}
                              className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50/80 cursor-pointer transition-all border border-transparent hover:border-gray-100"
                            >
                              <img src={p.image} alt={p.name} className="w-10 h-10 rounded-md object-cover bg-gray-100 shrink-0" referrerPolicy="no-referrer" />
                              <div className="flex-1 min-w-0">
                                <span className="block text-xs font-semibold text-charcoal truncate">
                                  {lang === 'en' ? p.name : (p.bnName || p.name)}
                                </span>
                                <span className="text-[10px] text-gray-400 block">{p.category} • {p.unit}</span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="block text-xs font-bold text-[#0E5E4A]">৳{finalPrice}</span>
                                {hasDiscount && (
                                  <span className="text-[10px] text-gray-400 line-through">৳{p.price}</span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-gray-400 text-xs flex flex-col items-center gap-1.5">
                        <HelpCircle className="w-5 h-5 text-gray-300" />
                        {lang === 'en' ? 'No products match your search' : 'খুঁজে পাওয়া যায়নি'}
                      </div>
                    )}
                  </div>
                ) : (
                  // Default Trending Searches & Categories
                  <div className="px-4 space-y-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5 mb-2.5 font-mono">
                        <TrendingUp className="w-3 h-3 text-[#D4AF37]" strokeWidth={2.5} />
                        {lang === 'en' ? 'Trending Searches' : 'ট্রেন্ডিং অনুসন্ধান'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((tag) => (
                          <button
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="bg-gray-100/80 hover:bg-emerald-50 hover:text-[#0E5E4A] text-gray-650 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border border-transparent hover:border-emerald-100"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 flex items-center gap-1.5 mb-2 font-mono">
                        <Sparkles className="w-3 h-3 text-[#0E5E4A]" strokeWidth={2.5} />
                        {lang === 'en' ? 'AI Smart Navigation Suggestions' : 'এআই সাজেস্টেড ন্যাভিগেশন'}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button onClick={() => { setActiveTab('user-dashboard'); setSearchFocused(false); }} className="text-left py-1.5 px-2 rounded-md hover:bg-gray-50 text-charcoal font-medium flex items-center gap-1.5">
                          🔐 {lang === 'en' ? 'Customer/Admin Portal' : 'কাস্টমার/এডমিন লগইন'}
                        </button>
                        <button onClick={() => { setActiveTab('store-locator'); setSearchFocused(false); }} className="text-left py-1.5 px-2 rounded-md hover:bg-gray-50 text-charcoal font-medium flex items-center gap-1.5">
                          📍 {lang === 'en' ? 'Chattogram Store Map' : 'চট্টগ্রাম আউটলেট মানচিত্র'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Navigation controls */}
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            
            {/* Language Toggle English / বাংলা */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="glass-btn flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200/50 text-charcoal text-xs font-semibold transition-colors shrink-0"
              title="Change Language"
            >
              <div className="w-5 h-5 flex items-center justify-center rounded-full bg-emerald-50 text-[#0E5E4A]">
                <Globe className="w-3.5 h-3.5" strokeWidth={2.5} />
              </div>
              <span className="tracking-wide">{lang === 'en' ? 'বাংলা' : 'EN'}</span>
            </button>

            {/* User dashboard navigation button */}
            <button
              onClick={() => setActiveTab('user-dashboard')}
              className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                activeTab === 'user-dashboard'
                  ? 'bg-[#0E5E4A] text-white shadow-md shadow-emerald-500/15 border-[#0E5E4A]'
                  : 'glass-btn border-neutral-200/50 text-neutral-700'
              }`}
              title={lang === 'en' ? 'User Dashboard' : 'ব্যবহারকারী ড্যাশবোর্ড'}
            >
              <span className="text-sm font-bold">👤</span>
            </button>

            {/* Wishlist triggers tab */}
            <button
              onClick={onWishlistClick}
              className="w-9 h-9 rounded-xl border border-neutral-200/50 flex items-center justify-center text-neutral-700 glass-btn relative transition-transform hover:scale-105 shrink-0"
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-red-500 fill-red-500 filter drop-shadow-[0_1px_2px_rgba(239,68,68,0.4)]' : ''}`} strokeWidth={2.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-tr from-red-500 to-rose-600 text-white text-[9px] font-bold flex items-center justify-center border border-white/60 shadow-md">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart dynamic display */}
            <button
              onClick={onCartClick}
              className="bg-gradient-to-br from-orange-500 to-orange-600 border border-orange-500/20 text-white rounded-xl py-2 px-3.5 md:px-4.5 flex items-center gap-2 transition-all hover:scale-102 hover:shadow-lg hover:shadow-orange-500/15 relative select-none shrink-0 cursor-pointer animate-pulse"
            >
              <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
              <span className="text-xs font-bold hidden sm:inline">
                {lang === 'en' ? 'Cart' : 'কার্ট'}
              </span>
              <span className="bg-white/20 text-white rounded-full text-[10px] font-mono font-bold px-2 py-0.5 border border-white/10 shadow-inner">
                {cartCount}
              </span>
            </button>

          </div>
        </div>
      </div>
    </header>
  );
}
