/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, CategoryType } from '../types';
import { Package, Trash2, Plus, LogOut, BarChart3, Coins, LayoutGrid, CheckCircle2, RefreshCw, Layers } from 'lucide-react';

interface AdminDashboardViewProps {
  lang: 'en' | 'bn';
  products: Product[];
  onAddProduct: (newProduct: Product) => void;
  onRemoveProduct: (productId: string) => void;
  onLogout: () => void;
  userName: string;
}

export default function AdminDashboardView({
  lang,
  products,
  onAddProduct,
  onRemoveProduct,
  onLogout,
  userName,
}: AdminDashboardViewProps) {
  // --- Form States ---
  const [nameEn, setNameEn] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [category, setCategory] = useState<CategoryType>('Grocery');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [unit, setUnit] = useState('kg');
  const [discountPercent, setDiscountPercent] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search filter for listing inside admin
  const [adminSearch, setAdminSearch] = useState('');

  const categoryChoices: CategoryType[] = [
    'Grocery',
    'Fashion',
    'Electronics',
    'Home & Living',
    'Beauty',
    'Baby Care',
    'Sports',
    'Stationery',
    'Pet Care',
  ];

  const unitsList = ['kg', 'litre', 'pcs', 'pack', 'set', 'bottle', 'pair', 'g'];

  const placeholderImages: Record<CategoryType, string> = {
    Grocery: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400',
    Fashion: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=400',
    Electronics: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=400',
    'Home & Living': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=400',
    Beauty: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
    'Baby Care': 'https://images.unsplash.com/photo-1519689680058-324335c77eb2?auto=format&fit=crop&q=80&w=400',
    Sports: 'https://images.unsplash.com/photo-1531415050242-0b171350041d?auto=format&fit=crop&q=80&w=400',
    Stationery: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=400',
    'Pet Care': 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&q=80&w=400',
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('');

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock, 10);
    const parsedDiscount = discountPercent ? parseFloat(discountPercent) : undefined;

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert('Price must be a positive number');
      return;
    }
    if (isNaN(parsedStock) || parsedStock < 0) {
      alert('Stock cannot be negative');
      return;
    }

    const defaultImg = placeholderImages[category] || placeholderImages.Grocery;
    const finalImage = imageUrl.trim() || defaultImg;

    const newProduct: Product = {
      id: `admin-added-${Date.now()}`,
      name: nameEn.trim(),
      bnName: nameBn.trim() || undefined,
      category,
      price: parsedPrice,
      discountPercent: parsedDiscount && parsedDiscount > 0 ? parsedDiscount : undefined,
      rating: 5.0,
      ratingCount: 1,
      image: finalImage,
      gallery: [finalImage],
      description: descriptionEn.trim() || 'No description provided.',
      bnDescription: descriptionBn.trim() || undefined,
      stock: parsedStock,
      unit,
      reviews: [],
      specifications: {
        'Source': 'Admin Inserted',
        'Added On': new Date().toISOString().split('T')[0],
      },
    };

    onAddProduct(newProduct);
    
    // Clear fields
    setNameEn('');
    setNameBn('');
    setPrice('');
    setStock('');
    setDiscountPercent('');
    setDescriptionEn('');
    setDescriptionBn('');
    setImageUrl('');

    setSuccessMsg(lang === 'en' ? 'Product successfully compiled into catalog!' : 'পণ্যটি স্টোরে যোগ করা হয়েছে!');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // Derived metrics calculations
  const totalInval = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const totalStockItems = products.reduce((acc, p) => acc + p.stock, 0);
  const lowStockProducts = products.filter((p) => p.stock < 20);

  const filteredList = products.filter((p) => {
    const q = adminSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <div id="admin-viewport-box" className="max-w-7xl mx-auto py-8 px-4 font-sans text-charcoal text-left">
      
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#0E5E4A] to-[#123E32] text-white rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-8 relative overflow-hidden">
        {/* Subtle glowing lights */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-xl uppercase shadow-inner shrink-0 border border-white/10">
            {userName && userName.length > 0 ? userName.slice(0, 2) : 'AD'}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <span className="bg-[#0E5E4A]/30 text-emerald-200 text-[10px] font-bold font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Authorized Administrator
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight mt-1">{userName}</h2>
            <p className="text-xs text-emerald-200">admin@dailymart.com • Active workspace console</p>
          </div>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={onLogout}
            className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-2.5 px-6 rounded-2xl text-xs flex items-center gap-2 transition-all cursor-pointer shadow-sm select-none"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </div>

      {/* 2. Visual summary widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 shadow-3xs">
          <div className="w-12 h-12 bg-emerald-50 text-[#0E5E4A] rounded-xl flex items-center justify-center shrink-0 border border-emerald-150">
            <LayoutGrid className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-gray-550 text-[10px] uppercase font-mono font-bold">Catalog Listings</span>
            <span className="text-2xl font-bold text-neutral-900 block mt-0.5">{products.length} Products</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 shadow-3xs">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center shrink-0 border border-amber-150">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-gray-550 text-[10px] uppercase font-mono font-bold">Total Stock count</span>
            <span className="text-2xl font-bold text-neutral-900 block mt-0.5">{totalStockItems} items</span>
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl flex items-center gap-4 shadow-3xs text-[#0E5E4A]">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-150">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-gray-550 text-[10px] uppercase font-mono font-bold">Inventory Value</span>
            <span className="text-xl font-bold block mt-0.5 text-neutral-900 font-sans">৳ {totalInval.toLocaleString('en-US')}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Split View Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ADD PRODUCT FORM PANEL (COL 5) */}
        <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-5 sticky top-[120px]">
          <div>
            <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#0E5E4A]" />
              {lang === 'en' ? 'Add New Product' : 'নতুন পণ্য চালুন'}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Insert a completely custom product into Daily Mart catalogs instantly.
            </p>
          </div>

          {successMsg && (
            <div className="p-4 bg-emerald-50 border border-emerald-150 text-[#0E5E4A] rounded-2xl text-xs font-semibold flex items-center gap-2.5 animate-in fade-in-50">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-3.5">
              {/* English Name */}
              <div className="space-y-0.5">
                <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Product Title (English) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Organic Black Garam Masala"
                  value={nameEn}
                  onChange={(e) => setNameEn(e.target.value)}
                  className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                />
              </div>

              {/* Bangla Name */}
              <div className="space-y-0.5">
                <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Product Title (Bangla)</label>
                <input
                  type="text"
                  placeholder="যেমন: অরগানিক কালো গোলমরিচ"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                  className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Category的选择 */}
                <div className="space-y-0.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-2 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] text-charcoal"
                  >
                    {categoryChoices.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pack Unit */}
                <div className="space-y-0.5">
                  <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Unit Measures *</label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-2 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] text-charcoal"
                  >
                    {unitsList.map((un) => (
                      <option key={un} value={un}>
                        {un}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {/* Price in BDT */}
                <div className="space-y-0.5">
                  <label className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Price (৳) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="350"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] text-charcoal shadow-inner"
                  />
                </div>

                {/* Starting Stock */}
                <div className="space-y-0.5">
                  <label className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Stock Level *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="120"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] text-charcoal shadow-inner"
                  />
                </div>

                {/* Discount Percentage */}
                <div className="space-y-0.5">
                  <label className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Discount %</label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    placeholder="15"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] text-charcoal shadow-inner"
                  />
                </div>
              </div>

              {/* Image URL text input */}
              <div className="space-y-0.5">
                <label className="text-[10px] uppercase font-mono text-gray-550 font-bold block">Optional Spec Image URL</label>
                <input
                  type="url"
                  placeholder="Leave empty for category fallback"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] text-charcoal shadow-inner"
                />
              </div>

              {/* English description */}
              <div className="space-y-0.5">
                <label className="text-[10px] uppercase font-mono text-gray-550 font-bold block">En Description *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Organic, clean product description..."
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] text-charcoal resize-none shadow-inner"
                />
              </div>

              {/* Bangla description */}
              <div className="space-y-0.5">
                <label className="text-[10px] uppercase font-mono text-gray-550 font-bold block">Bn Description</label>
                <textarea
                  rows={2}
                  placeholder="বাংলায় বর্ণনা প্রদান করুন..."
                  value={descriptionBn}
                  onChange={(e) => setDescriptionBn(e.target.value)}
                  className="w-full bg-white/60 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] text-charcoal resize-none shadow-inner"
                />
              </div>

            </div>

            <button
              type="submit"
              className="w-full bg-[#0E5E4A] hover:bg-[#0c503f] text-white font-bold py-3 px-4 rounded-xl text-xs cursor-pointer flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all select-none"
            >
              <Plus className="w-4 h-4" />
              <span>Add Dynamic Product Catalog</span>
            </button>

          </form>
        </div>

        {/* ACTIVE INVENTORY LISTINGS PANEL (COL 7) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white border border-gray-150 rounded-3xl p-6 shadow-xs space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-neutral-900 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#0E5E4A]" />
                  <span>Inventory Control & Stock Logs</span>
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  See live remaining stocks of products and drop lists instantly.
                </p>
              </div>

              {/* Compact search component */}
              <div className="w-full sm:w-52">
                <input
                  type="text"
                  placeholder="Search inventory..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="w-full bg-white/75 border border-gray-200 rounded-xl py-2 px-3 text-[11px] font-semibold text-charcoal focus:outline-hidden focus:border-[#0E5E4A] focus:bg-white"
                />
              </div>
            </div>

            {/* Low stock alerts dashboard inline */}
            {lowStockProducts.length > 0 && (
              <div className="p-3 bg-red-500/10 border border-red-200/50 rounded-2xl text-[11px] text-red-800 space-y-1">
                <strong className="font-semibold block uppercase font-mono tracking-wider text-[9px] text-red-650 flex items-center gap-1">
                  ⚠️ INVENTORY STOCK ALERTS ({lowStockProducts.length})
                </strong>
                <p className="text-red-700 leading-snug">
                  The following items are running below crucial levels (under 20 remaining stock):{' '}
                  <span className="font-semibold">
                    {lowStockProducts.map((p) => p.name).slice(0, 3).join(', ')}
                    {lowStockProducts.length > 3 ? ` and ${lowStockProducts.length - 3} more.` : '.'}
                  </span>
                </p>
              </div>
            )}

            {/* Listing loop */}
            <div className="divide-y divide-gray-100 max-h-[640px] overflow-y-auto pr-1 no-scrollbar space-y-1.5">
              {filteredList.length > 0 ? (
                filteredList.map((p) => {
                  const hasDiscount = p.discountPercent && p.discountPercent > 0;
                  const isLow = p.stock < 20;

                  return (
                    <div
                      key={p.id}
                      className="flex items-center gap-3.5 py-4 transition-colors hover:bg-gray-50/40 rounded-xl px-2 text-xs"
                    >
                      {/* Product small thumb */}
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-11 h-11 rounded-lg object-cover bg-gray-100 border border-gray-200 shrink-0"
                        referrerPolicy="no-referrer"
                      />

                      {/* Info details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[8px] font-mono uppercase bg-neutral-100 px-1.5 py-0.5 rounded-md text-gray-500 shrink-0">
                            {p.category}
                          </span>
                          {hasDiscount && (
                            <span className="text-[8px] bg-red-100 text-red-800 font-bold px-1.5 py-0.5 rounded-md shrink-0">
                              -{p.discountPercent}% OFF
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-neutral-900 truncate mt-1">
                          {lang === 'en' ? p.name : (p.bnName || p.name)}
                        </h4>
                        
                        {/* Remaining stock count inline */}
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className={`font-semibold px-2 py-0.5 rounded-lg text-[9px] ${
                            isLow 
                              ? 'bg-red-50 text-red-700 border border-red-100' 
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-100'
                          }`}>
                            {p.stock > 0 ? `${p.stock} remaining ${p.unit}` : 'OUT OF STOCK'}
                          </span>
                          <span className="text-gray-400 text-[10px]">• Price: ৳{p.price}</span>
                        </div>
                      </div>

                      {/* Drop action button */}
                      <button
                        onClick={() => {
                          if (confirm(`Are you absolutely sure you want to remove "${p.name}" from the active store catalogs?`)) {
                            onRemoveProduct(p.id);
                          }
                        }}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition-all cursor-pointer select-none"
                        title="Remove Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
                  <span className="text-xl">🔍</span>
                  <p className="text-xs font-semibold">No items matched search.</p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
