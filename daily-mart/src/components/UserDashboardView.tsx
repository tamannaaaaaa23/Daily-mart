/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, Order, Product, ActiveTab } from '../types';
import { Award, ShoppingBag, MapPin, Trash2, Heart, ShieldCheck, Ticket } from 'lucide-react';

interface UserDashboardViewProps {
  lang: 'en' | 'bn';
  userProfile: UserProfile;
  orderHistory: Order[];
  wishlist: Product[];
  onProductClick: (p: Product) => void;
  onRemoveWishlist: (p: Product) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onLogout?: () => void;
}

export default function UserDashboardView({
  lang,
  userProfile,
  orderHistory,
  wishlist,
  onProductClick,
  onRemoveWishlist,
  setActiveTab,
  onLogout,
}: UserDashboardViewProps) {
  return (
    <div id="user-dashboard-container" className="max-w-7xl mx-auto py-8 px-4 font-sans text-charcoal text-left">
      
      {/* Visual profile header card */}
      <div className="bg-linear-to-r from-[#0E5E4A] to-[#123E32] rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-8">
        <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-18 h-18 rounded-2xl object-cover border-2 border-white/20 shrink-0 shadow-md bg-gray-100"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight">{userProfile.name}</h2>
            <p className="text-xs text-gray-300 font-sans mt-0.5">{userProfile.email} • Joined {userProfile.joinedDate}</p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs">
              <span className="bg-white/10 text-white font-semibold py-1 px-3 rounded-full flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Primary Hub: Chattogram GEC
              </span>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="bg-red-400/20 hover:bg-red-400/30 text-red-200 hover:text-white font-bold py-1 px-3.5 rounded-full text-[10px] select-none cursor-pointer transition-all border border-red-500/20 active:scale-95"
                >
                  {lang === 'en' ? 'Sign Out Customer' : 'সাইন আউট কাস্টমার'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Loyalty reward tracker block */}
        <div className="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center gap-3.5 max-w-sm w-full">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-[#D4AF37] flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-gray-300 text-[10px] uppercase font-mono block">LOYALTY REWARDS POINTS</span>
            <span className="text-xl font-bold text-[#D4AF37] block mt-0.5">{userProfile.points} Pts</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">1 Point accrual for every ৳100 spent</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COMPACTS: DETAILS, LOGS, HISTORY */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section 1: Order log history */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-title font-semibold text-sm text-gray-800 uppercase tracking-wider flex items-center gap-2 pb-2.5 border-b border-gray-150">
              <ShoppingBag className="w-4.5 h-4.5 text-[#0E5E4A]" />
              {lang === 'en' ? 'My Order Log History' : 'অর্ডার হিস্টোরি লগ'}
            </h3>

            {orderHistory.length > 0 ? (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div key={order.id} className="border border-gray-150 rounded-2xl overflow-hidden text-xs">
                    {/* Header bar of order card */}
                    <div className="bg-zinc-50/50 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-gray-150">
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase font-mono">Invoice reference</span>
                        <span className="font-bold text-charcoal">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase font-mono">Order placement date</span>
                        <span className="font-semibold">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase font-mono">Status</span>
                        <span className={`font-bold px-2.5 py-0.5 rounded-lg text-[10px] ${
                          order.status === 'Delivered' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-orange-100 text-orange-850'
                        }`}>{order.status}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[9px] uppercase font-mono">Grand BDT total</span>
                        <span className="font-bold text-[#0E5E4A]">৳{order.total}</span>
                      </div>
                    </div>

                    {/* Order items lists */}
                    <div className="p-3.5 space-y-3 bg-white">
                      {order.items.map((it, idx) => (
                        <div key={`${it.productId}-${idx}`} className="flex items-center gap-3">
                          <img
                            src={it.image}
                            alt={it.productName}
                            className="w-8 h-8 rounded-lg object-cover bg-gray-50 border border-gray-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-charcoal truncate">{it.productName}</h4>
                            {it.variantName && (
                              <span className="text-[10px] text-gray-400">Variant: {it.variantName}</span>
                            )}
                          </div>
                          <span className="text-gray-400">Qty {it.quantity}</span>
                          <span className="font-bold">৳{it.price * it.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Shipping recap footer */}
                    <div className="p-3.5 bg-gray-50/20 border-t border-gray-150/50 text-[11px] text-gray-500 leading-relaxed">
                      <strong>Delivery To:</strong> {order.deliveryInfo.fullName}, {order.deliveryInfo.phone} | {order.deliveryInfo.address}, {order.deliveryInfo.city} ({order.deliveryInfo.division} division). 
                      <span className="ml-1 text-emerald-700 font-semibold">(Method: {order.paymentMethod})</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
                <span className="text-2xl select-none">📦</span>
                <p className="text-xs font-semibold">No placed order logs found.</p>
                <button 
                  onClick={() => setActiveTab('home')}
                  className="bg-[#0E5E4A] text-white hover:bg-[#0c503f] text-[10px] font-bold py-1.5 px-4 rounded-lg mt-2 cursor-pointer uppercase tracking-wider"
                >
                  Shop supermarket items
                </button>
              </div>
            )}
          </div>

          {/* Section 2: Account management details */}
          <div className="bg-white border border-gray-150 rounded-2xl p-6 shadow-xs text-xs space-y-4">
            <h3 className="font-title font-semibold text-sm text-gray-800 uppercase tracking-wider flex items-center gap-2 pb-2.5 border-b border-gray-150">
              <MapPin className="w-4.5 h-4.5 text-[#0E5E4A]" />
              Registered Shipping & Office Addresses
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-emerald-500/20 bg-emerald-50/10 rounded-2xl space-y-2 text-left relative">
                <span className="absolute top-3.5 right-3.5 bg-[#0E5E4A] text-white text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                  PRIMARY RESIDENCE
                </span>
                <h4 className="font-bold text-charcoal font-title">Home Address (Anisur)</h4>
                <p className="text-gray-500 line-clamp-2 leading-relaxed">
                  {userProfile.address}
                </p>
                <span className="block text-gray-450 text-[10px] mt-1">Mobile: {userProfile.phone}</span>
              </div>

              <div className="p-4 border border-gray-200 bg-white rounded-2xl space-y-2 text-left relative">
                <h4 className="font-bold text-charcoal font-title">Agrabad Office Address</h4>
                <p className="text-gray-500 line-clamp-2 leading-relaxed">
                  Level 8, World Trade Center Tower, Agrabad C/A, Chattogram
                </p>
                <span className="block text-gray-450 text-[10px] mt-1">Mobile: +8801911223344</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WISHLIST MODULE PANEL */}
        <div className="lg:col-span-4 bg-white border border-gray-150 rounded-2xl p-5 space-y-4">
          <h3 className="font-title font-semibold text-sm text-gray-800 uppercase tracking-wider flex items-center gap-2 pb-2.5 border-b border-gray-150">
            <Heart className="w-4.5 h-4.5 text-red-500 fill-red-500 animate-pulse" />
            Wishlist Savings ({wishlist.length})
          </h3>

          {wishlist.length > 0 ? (
            <div className="space-y-3.5">
              {wishlist.map((p) => (
                <div 
                  key={p.id}
                  className="flex gap-2.5 p-2 bg-gray-50/50 hover:bg-gray-50 rounded-xl border border-gray-105 transition-all text-xs text-left relative group shrink-0"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-50 border shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0 pr-6 flex flex-col justify-between">
                    <div>
                      <h4 
                        onClick={() => onProductClick(p)}
                        className="font-semibold text-charcoal truncate cursor-pointer hover:text-[#0E5E4A] transition-colors"
                      >
                        {lang === 'en' ? p.name : (p.bnName || p.name)}
                      </h4>
                      <span className="text-[10px] text-gray-400 block -mt-0.5">{p.category}</span>
                    </div>
                    <span className="font-bold text-[#0E5E4A] block">৳{p.price}</span>
                  </div>

                  {/* Remove wishlist button */}
                  <button
                    onClick={() => onRemoveWishlist(p)}
                    className="absolute top-2.5 right-2.5 text-gray-400 hover:text-red-500 cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-gray-400 flex flex-col items-center gap-2">
              <span className="text-xl select-none">🤍</span>
              <p className="text-[10px] font-sans">Your wishlist is currently clean and empty.</p>
            </div>
          )}

          {/* Loyalty reward points mock gift voucher panel */}
          <div className="p-4 bg-amber-500/10 border border-amber-300/30 rounded-2xl text-xs space-y-2 text-left shrink-0">
            <span className="text-[#D4AF37] font-semibold text-[10px] tracking-wider uppercase font-title flex items-center gap-1">
              <Ticket className="w-3.5 h-3.5" />
              Gift Voucher Unlocks
            </span>
            <p className="text-amber-900 text-[11px] leading-relaxed">
              You have accumulated {userProfile.points} points. Reach <strong>500 points</strong> to unlock your flat <strong>৳450 cashback voucher</strong> automatically!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
