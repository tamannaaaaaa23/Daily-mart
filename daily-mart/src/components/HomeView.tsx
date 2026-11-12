/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag, ArrowRight, Clock, Percent, ShieldCheck, ChevronLeft, ChevronRight, CheckCircle, Apple, Shirt, Smartphone, Sofa, Sparkles, Baby, Trophy, Notebook, Bone } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Product, ActiveTab } from '../types';
import { motion } from 'motion/react';

interface HomeViewProps {
  lang: 'en' | 'bn';
  onSelectProduct: (p: Product) => void;
  addToCart: (p: Product) => void;
  addToWishlist: (p: Product) => void;
  wishlist: Product[];
  setActiveTab: (tab: ActiveTab) => void;
  products: Product[];
}

export default function HomeView({
  lang,
  onSelectProduct,
  addToCart,
  addToWishlist,
  wishlist,
  setActiveTab,
  products,
}: HomeViewProps) {
  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: lang === 'en' ? 'Monsoon Freshness Curated' : 'বর্ষার সতেজ বাজার ডিল',
      subtitle: lang === 'en' ? 'Direct Organic Groceries' : 'জৈব ও শতভাগ তাজা কাঁচাবাজার',
      desc: lang === 'en' ? 'Sourced directly from organic farms in Dinajpur with guaranteed 3-hour super speed shipping.' : 'সরাসরি দিনাজপুরের খামার থেকে সুগন্ধি চাল ও পণ্য ৩ ঘণ্টার এক্সপ্রেস হোম ডেলিভারিতে।',
      buttonText: lang === 'en' ? 'Shop Premium Groceries' : 'বাজার করুন',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
      category: 'Grocery'
    },
    {
      title: lang === 'en' ? 'Aarong-Style Premium Handlooms' : 'ঐতিহ্যবাহী লাক্সারি তাঁত পোলাক',
      subtitle: lang === 'en' ? 'Heritage & Modern Fashion Fusion' : 'বাঙালি উৎসবের রাজকীয় সংগ্রহ',
      desc: lang === 'en' ? 'Explore our artisanal Panjabis & Shalwar Kameez set handwoven from purest natural fibers.' : 'সুতি ও জরি স্ট্রাইপযুক্ত পাঞ্জাবি এবং দৃষ্টিনন্দন ডিজাইনার সেটের আভিজাত্য কালেকশন।',
      buttonText: lang === 'en' ? 'Explore Festive Fashion' : 'ফ্যাশন গ্যালারি দেখুন',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200',
      category: 'Fashion'
    },
    {
      title: lang === 'en' ? 'Sleek Air Multiplier Tech' : 'স্মার্ট এয়ার পাওয়ার কুলিং',
      subtitle: lang === 'en' ? 'Smart Home Electronics' : 'আধুনিক হাই-টেক ইলেকট্রনিক্স',
      desc: lang === 'en' ? 'Upgrade your micro climate in humid seasons with bladeless active HEPA tower fans.' : 'অতিরিক্ত গরমের স্বস্তিদায়ক সেরা ব্লেডলেস কুলিং স্মার্ট টাওয়ার ফ্যান এবং এক্সেসরিজ।',
      buttonText: lang === 'en' ? 'View Intel Appliance' : 'ইলেকট্রনিক্স ডিল',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
      category: 'Electronics'
    },
  ];

  // Rotate Carousel slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 4, minutes: 0, seconds: 0 }; // Loop time
        }
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  // Interactive categories selection triggers search mapping or filters
  const categoriesList = [
    { name: 'Grocery', bn: 'নিত্যপ্রয়োজনীয়', icon: Apple, iconColor: 'text-emerald-700', bg: 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/35' },
    { name: 'Fashion', bn: 'ফ্যাশন পোশাক', icon: Shirt, iconColor: 'text-amber-700', bg: 'bg-amber-50 hover:bg-amber-100/80 border border-amber-250/50' },
    { name: 'Electronics', bn: 'ইলেকট্রনিক্স', icon: Smartphone, iconColor: 'text-sky-600', bg: 'bg-sky-50 hover:bg-sky-100/80 border border-sky-200/50' },
    { name: 'Home & Living', bn: 'গৃহস্থালি পণ্য', icon: Sofa, iconColor: 'text-indigo-600', bg: 'bg-indigo-50 hover:bg-indigo-100/80 border border-indigo-200/50' },
    { name: 'Beauty', bn: 'রূপচর্চা', icon: Sparkles, iconColor: 'text-pink-600', bg: 'bg-pink-50 hover:bg-pink-100/80 border border-pink-200/50' },
    { name: 'Baby Care', bn: 'শিশু যত্ন', icon: Baby, iconColor: 'text-orange-700', bg: 'bg-orange-50 hover:bg-orange-100/80 border border-orange-200/50' },
    { name: 'Sports', bn: 'খেলাধুলা', icon: Trophy, iconColor: 'text-blue-600', bg: 'bg-blue-50 hover:bg-blue-100/80 border border-blue-200/50' },
    { name: 'Stationery', bn: 'স্টেশনারি', icon: Notebook, iconColor: 'text-zinc-600', bg: 'bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-200/50' },
    { name: 'Pet Care', bn: 'পোষা প্রাণীর খাদ্য', icon: Bone, iconColor: 'text-red-650', bg: 'bg-red-50 hover:bg-red-100/80 border border-red-200/50' },
  ];

  // Active filter for products
  const [selectedHomeCat, setSelectedHomeCat] = useState<string>('All');
  const displayProducts = selectedHomeCat === 'All' 
    ? products 
    : products.filter(p => p.category === selectedHomeCat);

  const flashSaleProduct = products.find(p => p.flashSale);

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    } else {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 4.1 HERO BANNER CAROUSEL */}
      <section id="hero-slider" className="relative w-full overflow-hidden bg-zinc-950 text-white min-h-[460px] md:min-h-[520px] flex items-center md:rounded-3xl max-w-7xl mx-auto shadow-xl">
        {/* Carousel slide background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Hero Campaign"
            className="w-full h-full object-cover opacity-35 object-center transition-all duration-1000 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>
        </div>

        {/* Content slide */}
        <div className="relative z-10 max-w-3xl px-6 md:px-16 py-12 text-left space-y-4 md:space-y-6">
          <span className="text-[#D4AF37] font-semibold text-xs uppercase tracking-widest font-title bg-black/40 border border-amber-500/20 px-3 py-1.5 rounded-full inline-block">
            🔔 {heroSlides[currentSlide].subtitle}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold text-white tracking-tight leading-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl">
            {heroSlides[currentSlide].desc}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-1.5">
            <button
              onClick={() => { setSelectedHomeCat(heroSlides[currentSlide].category); }}
              className="bg-[#0E5E4A] hover:bg-[#0c503f] text-white text-xs md:text-sm font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {lang === 'en' ? 'Shop Organic Now' : 'এখনই কিনুন'}
            </button>
          </div>
        </div>

        {/* Slider manual arrows */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2.5 z-20">
          <button
            onClick={() => handleSlideChange('prev')}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/45 hover:bg-black/75 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleSlideChange('next')}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/45 hover:bg-black/75 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicators dots */}
        <div className="absolute bottom-6 left-6 flex items-center gap-1.5 z-20">
          {heroSlides.map((_, i) => (
            <div
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-1.5 transition-all rounded-full cursor-pointer ${
                currentSlide === i ? 'w-6 bg-[#D4AF37]' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* 4.2 CATEGORY GRID SECTION */}
      <section id="category-grid" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal">
              {lang === 'en' ? 'Shop by Category' : 'ক্যাটাগরি সমূহ'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {lang === 'en' ? 'Explore luxury catalog, and handloom local items.' : 'আপনার নিত্য প্রয়োজনীয় চমৎকার ডিজাইনার কালেকশন ও গ্রোসারি।'}
            </p>
          </div>
          {selectedHomeCat !== 'All' && (
            <button
              onClick={() => setSelectedHomeCat('All')}
              className="text-xs font-semibold text-[#0E5E4A] hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Grid block */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
          {categoriesList.map((cat) => {
            const isActive = selectedHomeCat === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setSelectedHomeCat(cat.name)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer text-center select-none transition-all outline-hidden ${
                  isActive
                    ? 'border-2 border-[#0E5E4A] bg-emerald-50/50 glass-panel scale-102 font-bold shadow-md shadow-emerald-500/5'
                    : 'glass-panel hover:border-emerald-500/25 hover:shadow-md hover:shadow-emerald-500/5 hover:-translate-y-1'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2.5 transition-transform ${cat.bg}`}>
                  <cat.icon className={`w-6 h-6 stroke-[1.8] ${cat.iconColor}`} style={{ fill: 'currentColor', fillOpacity: 0.15 }} />
                </div>
                <span className="text-[11px] font-semibold text-charcoal leading-tight line-clamp-1 block">
                  {lang === 'en' ? cat.name : cat.bn}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4.3 LIVE FLASH SALE COUNDOWN SECTION */}
      {flashSaleProduct && (
        <section id="flash-sale-banner" className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-linear-to-r from-[#0E5E4A] via-[#123E32] to-amber-600 rounded-3xl p-6 md:p-8 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
            {/* Countdown content */}
            <div className="space-y-4 text-center lg:text-left shrink-0">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[#D4AF37] font-semibold text-xs uppercase tracking-widest font-title">
                <Percent className="w-4 h-4" />
                <span>{lang === 'en' ? 'Limited Stock flash deals' : 'লিমিটেড স্টক ফ্ল্যাশ সেল ডিল'}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight">
                {lang === 'en' ? 'Super Sunday Flash Deals!' : 'সুপার ফ্ল্যাশ সেল অফার!'}
              </h2>
              
              {/* Dynamic countdown visualizer */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-gray-300 mr-1" />
                <div className="flex flex-col items-center">
                  <div className="bg-black/30 backdrop-blur-md text-white font-mono font-bold text-base md:text-lg px-2.5 py-1.5 rounded-lg border border-white/10">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-[9px] text-gray-300 uppercase tracking-wider mt-1">Hrs</span>
                </div>
                <span className="font-bold text-lg text-amber-400 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-black/30 backdrop-blur-md text-white font-mono font-bold text-base md:text-lg px-2.5 py-1.5 rounded-lg border border-white/10">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-[9px] text-gray-300 uppercase tracking-wider mt-1">Mins</span>
                </div>
                <span className="font-bold text-lg text-amber-400 font-mono">:</span>
                <div className="flex flex-col items-center">
                  <div className="bg-black/30 backdrop-blur-md text-white font-mono font-bold text-base md:text-lg px-2.5 py-1.5 rounded-lg border border-white/10">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-[9px] text-gray-300 uppercase tracking-wider mt-1">Secs</span>
                </div>
              </div>
            </div>

            {/* Flash Sale Featured product card */}
            <div className="bg-white rounded-2xl p-4 text-charcoal w-full max-w-md border border-white/10 shadow-lg flex items-center gap-4 relative animate-pulse-slow">
              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white font-bold text-[9px] tracking-wide uppercase px-2 py-0.5 rounded-md">
                -10% Off
              </div>
              <img
                src={flashSaleProduct.image}
                alt={flashSaleProduct.name}
                className="w-24 h-24 rounded-xl object-cover bg-gray-50 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 space-y-1.5">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wide font-title block">
                  {flashSaleProduct.category}
                </span>
                <h3 onClick={() => onSelectProduct(flashSaleProduct)} className="font-semibold text-xs md:text-sm leading-tight text-[#1A1A1A] cursor-pointer hover:text-[#0E5E4A] transition-colors line-clamp-1">
                  {lang === 'en' ? flashSaleProduct.name : (flashSaleProduct.bnName || flashSaleProduct.name)}
                </h3>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-charcoal text-sm">৳{flashSaleProduct.price - (flashSaleProduct.price * 10) / 100}</span>
                  <span className="text-xs text-gray-400 line-through">৳{flashSaleProduct.price}</span>
                </div>

                {/* Progress occupancy bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium font-sans">
                    <span>Sold: {flashSaleProduct.flashSaleStockSold} kg</span>
                    <span>Max cap: {flashSaleProduct.flashSaleStockMax} kg</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div 
                      className="bg-orange-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${(flashSaleProduct.flashSaleStockSold || 0) / (flashSaleProduct.flashSaleStockMax || 1) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2.5 pt-1">
                  <button
                    onClick={() => addToCart(flashSaleProduct)}
                    className="flex-1 bg-[#0E5E4A] hover:bg-[#0c503f] text-white font-bold py-1.5 px-3 rounded-lg text-[10px] uppercase tracking-wide transition-all cursor-pointer shadow-md"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => onSelectProduct(flashSaleProduct)}
                    className="border border-gray-250 hover:bg-gray-50 text-gray-650 font-bold p-1.5 rounded-lg text-xs cursor-pointer"
                    title="View details"
                  >
                    <ArrowRight className="w-3.5 h-3.5 animate-pulse-slow" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4.4 FEATURED PRODUCTS SECTION */}
      <section id="featured-products" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between border-b border-gray-150 pb-3 mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-charcoal">
              {selectedHomeCat === 'All' ? (lang === 'en' ? 'Featured Curated Products' : 'আমাদের বাছাইকৃত দারুণ প্রোডাক্টস') : selectedHomeCat}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {lang === 'en' ? 'Fresh farm sourcing, custom styles, and modern hardware.' : 'অরিজিনাল গ্যারান্টি, সহজ রিটার্ন সুবিধা ও ফাস্ট হোম ডেলিভারি।'}
            </p>
          </div>
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-mono">
            {displayProducts.length} Items Available
          </span>
        </div>

        {/* Dynamic products item grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.map((p) => {
            const hasDiscount = p.discountPercent && p.discountPercent > 0;
            const finalPrice = hasDiscount && p.discountPercent
              ? p.price - (p.price * p.discountPercent) / 100
              : p.price;
            const isWishlisted = wishlist.some(item => item.id === p.id);

            return (
              <div
                key={p.id}
                className="group glass-panel rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-500/5 hover:border-emerald-500/20 transition-all flex flex-col relative"
              >
                {/* Wishlist triggers in tactile realistic structure */}
                <button
                  onClick={() => addToWishlist(p)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-red-550 hover:scale-105 active:scale-95 transition-all z-10 shrink-0 realistic-icon cursor-pointer animate-fade-in"
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-red-550 fill-red-500' : ''}`} />
                </button>

                {/* Badges block */}
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-red-650 text-white font-semibold text-[9px] px-2 py-1 rounded-md tracking-wide uppercase font-title shadow-sm z-10 font-mono">
                    -{p.discountPercent}% Off
                  </span>
                )}

                {/* Interactive Product Image zoom layout */}
                <div 
                  onClick={() => onSelectProduct(p)}
                  className="relative aspect-square w-full bg-gray-50/50 overflow-hidden cursor-pointer shrink-0"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {/* Quick Action Overlay on Desktop */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-charcoal text-[11px] font-bold px-4 py-2 rounded-xl shadow-md border hover:bg-white scale-95 group-hover:scale-100 transition-all">
                      Quick View
                    </span>
                  </div>
                </div>

                {/* Details layout */}
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full w-max text-amber-600 mb-2.5 shrink-0 select-none">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span className="text-[9px] font-bold font-sans">{p.rating}</span>
                    <span className="text-[9px] opacity-75">({p.ratingCount})</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(p)}
                    className="text-xs md:text-sm font-semibold text-charcoal cursor-pointer hover:text-[#0E5E4A] transition-colors line-clamp-2 md:h-10 leading-tight mb-2"
                  >
                    {lang === 'en' ? p.name : (p.bnName || p.name)}
                  </h3>

                  <div className="flex items-center justify-between pt-1.5 mt-auto border-t border-neutral-200/50 shrink-0">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#0E5E4A]">৳{finalPrice}</span>
                        {hasDiscount && (
                          <span className="text-[10px] text-gray-400 line-through font-medium font-mono">৳{p.price}</span>
                        )}
                      </div>
                      <span className="text-[9px] text-gray-400 block -mt-0.5 font-sans">
                        Per {p.unit}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(p)}
                      className="w-8 h-8 rounded-lg bg-[#0E5E4A] hover:bg-[#0c503f] hover:shadow-lg hover:shadow-emerald-500/10 flex items-center justify-center text-white cursor-pointer transition-all active:scale-95 shrink-0 border border-white/10"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIFESTYLE EDITORIAL MARKETING SLIDER BANNER (Aarong Style) */}
      <section id="editorial-banner" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="glass-panel border border-amber-500/20 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 animate-fade-in">
          <div className="space-y-4 md:max-w-md text-left">
            <span className="text-[#D4AF37] font-serif font-semibold text-xs uppercase tracking-widest block">
              HERITAGE EXCLUSIVES
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-amber-950 font-bold leading-tight">
              Aarong Handlooms Sourcing Series
            </h2>
            <p className="text-amber-900/70 text-xs md:text-sm leading-relaxed font-sans">
              Inspired by the fine thread counts of rural loom artists, each festive Panjabi and Georgette set embodies the pride of cultural identity. Beautifully comfortable, designed to elevate any Bengali occasion gracefully.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setSelectedHomeCat('Fashion')}
                className="bg-amber-950 hover:bg-amber-900 text-[#FAF8F5] text-xs font-bold px-5 py-3 rounded-lg flex items-center gap-2 tracking-wide font-sans cursor-pointer transition-transform hover:-translate-y-0.5"
              >
                <span>Browse Festive Cotton</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-lg shrink-0">
            <img
              src="https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=350"
              alt="Designer Panjabi"
              className="w-44 h-56 rounded-2xl object-cover shadow-md border border-amber-900/10 hover:scale-102 transition-transform"
              referrerPolicy="no-referrer"
            />
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=350"
              alt="Silk Salwar"
              className="w-44 h-56 rounded-2xl object-cover shadow-md border border-amber-900/10 mt-6 hover:scale-102 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* VERIFIED RATING / CAROUSEL CORNER */}
      <section id="reviews-slider" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-2.5 max-w-xl mx-auto mb-10">
          <span className="text-[#0E5E4A] font-semibold text-xs tracking-widest font-title uppercase">
            {lang === 'en' ? 'Satisfied Community Reviews' : 'গ্রাহক সন্তুষ্টি'}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal">
            {lang === 'en' ? 'What Buyers Say About Daily Mart' : 'ডেইলিমার্ট নিয়ে আমাদের গ্রাহকদের মতামত'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel text-left p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
            <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic mb-4">
              "Buying groceries online was always stressful until Daily Mart. The Kalijira aromatic rice aroma is stunning. Deliveries directly to Chattogram GEC on schedule!"
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0E5E4A] font-title flex items-center justify-center text-xs font-bold shrink-0">
                MK
              </div>
              <div>
                <span className="block text-xs font-bold text-charcoal">Mehrab Karim</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Verified Buyer • Chattogram
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel text-left p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
            <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed italic mb-4">
              "Their brass tea set is absolutely royal and hefty. The delivery team handled the ceramic pack inside bubble layers wonderfully with supreme concern. High class service!"
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0E5E4A] font-title flex items-center justify-center text-xs font-bold shrink-0">
                NR
              </div>
              <div>
                <span className="block text-xs font-bold text-charcoal">Nuzhat Ruhi</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Verified Buyer • Dhaka Gulsan
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel text-left p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative">
            <div className="flex items-center gap-1 text-[#D4AF37] mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <p className="text-xs text-gray-550 leading-relaxed italic mb-4">
               "The Georgette Festive set fits beautifully and looks exactly as showcased on Aarong campaign series. Truly outstanding value and elegant support response."
            </p>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0E5E4A] font-title flex items-center justify-center text-xs font-bold shrink-0">
                TJ
              </div>
              <div>
                <span className="block text-xs font-bold text-charcoal">Tohfa Jannat</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  Verified Buyer • Sylhet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPACT APP DOWNLOADING PROMOTIONS GRID */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-[#111111] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0E5E4A] to-amber-500 text-white flex items-center justify-center text-2xl font-bold shrink-0">
              📱
            </div>
            <div>
              <h3 className="font-title font-semibold text-sm text-[#D4AF37]">DAILY MART MOBILE COMPANION</h3>
              <p className="text-xs text-gray-300 mt-1 max-w-md">Enjoy exclusive app vouchers, bKash secure instant checkout cashback, and live delivery trackers by loading Daily Mart app.</p>
            </div>
          </div>
          <button 
            onClick={() => { window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}); }}
            className="w-full md:w-auto shrink-0 bg-white hover:bg-gray-150 text-charcoal text-xs font-bold py-3.5 px-6 rounded-xl transition-transform"
          >
            Retrieve App QR Code
          </button>
        </div>
      </section>

    </div>
  );
}
