/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, Tag, Ticket, HelpCircle, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, variantId: string | undefined, qty: number) => void;
  onRemoveItem: (productId: string, variantId: string | undefined) => void;
  lang: 'en' | 'bn';
  onCheckoutClick: () => void;
  appliedCoupon: { code: string; discount: number; type: 'percent' | 'flat' } | null;
  setAppliedCoupon: (coupon: { code: string; discount: number; type: 'percent' | 'flat' } | null) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  lang,
  onCheckoutClick,
  appliedCoupon,
  setAppliedCoupon,
}: CartDrawerProps) {
  const [couponText, setCouponText] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  if (!isOpen) return null;

  // Pricing calculations
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const basePrice = item.product.price;
      const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
      const itemPrice = basePrice + offset;
      
      const p = item.product;
      const hasDiscount = p.discountPercent && p.discountPercent > 0;
      const finalPrice = hasDiscount && p.discountPercent
        ? itemPrice - (itemPrice * p.discountPercent) / 100
        : itemPrice;

      return acc + finalPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  // Validate coupon logic
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');

    const query = couponText.trim().toUpperCase();
    if (!query) return;

    if (query === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', discount: 10, type: 'percent' });
      setCouponSuccess('Success! 10% coupon applied.');
    } else if (query === 'DAILYMART') {
      setAppliedCoupon({ code: 'DAILYMART', discount: 200, type: 'flat' });
      setCouponSuccess('Success! Flat BDT 200 applied.');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or DAILYMART.');
    }
  };

  const getCouponDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.type === 'percent') {
      return (subtotal * appliedCoupon.discount) / 100;
    }
    return Math.min(appliedCoupon.discount, subtotal);
  };

  const discountAmount = getCouponDiscountAmount();
  const deliveryFee = subtotal > 0 ? 60 : 0; // Default GEC G-ship
  const grandTotal = subtotal + deliveryFee - discountAmount;

  return (
    <div id="cart-drawer-overlay" className="fixed inset-0 z-50 flex justify-end font-sans">
      
      {/* Slide overlay background */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Cart Drawer Panel Container */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 border-l border-gray-150 animate-in slide-in-from-right duration-350">
        
        {/* Header Block */}
        <div className="p-5 border-b border-gray-150 flex items-center justify-between bg-zinc-55/20 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#0E5E4A] flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-charcoal uppercase tracking-wider font-title">
                {lang === 'en' ? 'My Cart Basket' : 'আমার কার্ট'}
              </h2>
              <span className="text-[10px] text-gray-400 font-mono -mt-0.5 block">{cartItems.length} Products Added</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-charcoal cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mid area: List of items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item, index) => {
                const basePrice = item.product.price;
                const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
                const itemPrice = basePrice + offset;

                const p = item.product;
                const hasDiscount = p.discountPercent && p.discountPercent > 0;
                const finalUnitPrice = hasDiscount && p.discountPercent
                  ? itemPrice - (itemPrice * p.discountPercent) / 100
                  : itemPrice;

                return (
                  <div 
                    key={`${item.product.id}-${item.selectedVariant?.id || 'none'}-${index}`}
                    className="flex gap-3.5 p-3.5 rounded-2xl border border-gray-105 bg-gray-50/20"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0 border border-gray-150"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between text-left">
                      <div>
                        <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wide font-title block">
                          {item.product.category}
                        </span>
                        <h4 className="text-xs font-semibold text-charcoal truncate">
                          {lang === 'en' ? item.product.name : (item.product.bnName || item.product.name)}
                        </h4>
                        {item.selectedVariant && (
                          <span className="bg-white border text-[10px] text-gray-500 font-medium px-2 py-0.5 rounded-md inline-block mt-1 font-sans">
                            Selected: {item.selectedVariant.name}
                          </span>
                        )}
                      </div>

                      {/* Controls rows */}
                      <div className="flex items-center justify-between pt-1 mt-1.5 border-t border-gray-100/75 row-span-1">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant?.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-250 hover:bg-gray-50 text-xs font-bold leading-none flex items-center justify-center select-none"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold text-charcoal w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.selectedVariant?.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-md bg-white border border-gray-250 hover:bg-gray-50 text-xs font-bold leading-none flex items-center justify-center select-none"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-bold text-emerald-800">
                          ৳{finalUnitPrice * item.quantity}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id, item.selectedVariant?.id)}
                      className="w-7 h-7 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center cursor-pointer mt-0.5"
                      title="Remove product"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12 text-gray-400">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-title font-semibold text-charcoal text-sm">Your Cart Basket is Empty</h3>
                <p className="text-[11px] text-gray-550 leading-relaxed mt-1 max-w-xs">Scan through from our featured groceries, high-class designer clothing, or electronics and add them.</p>
              </div>
              <button
                onClick={onClose}
                className="bg-[#0E5E4A] hover:bg-[#0c503f] text-white font-bold text-xs py-2 px-5 rounded-lg"
              >
                Start Shopping Now
              </button>
            </div>
          )}
        </div>

        {/* Bottom Block, Checkout pricing and coupon fields */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-gray-150 bg-gray-50 espacio-checkout-drawer shrink-0">
            
            {/* Promo Code Input panel */}
            <form onSubmit={handleApplyCoupon} className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={couponText}
                    onChange={(e) => setCouponText(e.target.value)}
                    placeholder="Enter Coupon (WELCOME10 / DAILYMART)"
                    className="w-full bg-white border border-gray-250 text-[10px] md:text-xs font-semibold rounded-lg pl-8 pr-3 py-1.5 focus:outline-hidden text-charcoal uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="bg-zinc-800 hover:bg-black text-white text-[10px] md:text-xs font-bold px-4 rounded-lg cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </div>
              
              {couponError && <p className="text-[10px] text-red-500 font-semibold mt-1 text-left">⚠️ {couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-600 font-semibold mt-1 text-left">🎉 {couponSuccess}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between text-[11px] bg-emerald-50 p-1.5 rounded-lg text-[#0E5E4A] font-bold mt-2">
                  <span>Coupon {appliedCoupon.code} Active</span>
                  <button type="button" onClick={() => { setAppliedCoupon(null); setCouponText(''); setCouponSuccess(''); }} className="text-red-550 hover:underline">Remove</button>
                </div>
              )}
            </form>

            {/* Calculations summaries */}
            <div className="space-y-2 border-b border-gray-200/50 pb-3 mb-3 text-xs text-left">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal amount</span>
                <span className="font-semibold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Delivery processing</span>
                <span className="font-semibold">৳{deliveryFee}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount savings</span>
                  <span>-৳{discountAmount}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-left mb-5">
              <div>
                <span className="font-bold text-gray-800">Total BDT</span>
                <p className="text-[9px] text-gray-400 font-sans mt-0.5">VAT inside Bangladesh included</p>
              </div>
              <span className="text-lg font-serif font-bold text-[#0E5E4A]">
                ৳{grandTotal}
              </span>
            </div>

            {/* Process checkout redirect triggers */}
            <button
              onClick={onCheckoutClick}
              className="w-full bg-[#0E5E4A] hover:bg-[#0c503f] text-white py-3 px-4 rounded-xl cursor-pointer text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-emerald-500/10 active:scale-99 shadow-md"
            >
              <span>{lang === 'en' ? 'Proceed to Secure Checkout' : 'চেকআউট সম্পন্ন করুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
