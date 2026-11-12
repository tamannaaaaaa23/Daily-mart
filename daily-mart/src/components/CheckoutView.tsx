/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Truck, CreditCard, CheckCircle2, ShoppingBag, ArrowLeft, Loader2, Coins, Phone, FileCheck } from 'lucide-react';
import { CartItem, DeliveryInfo } from '../types';

interface CheckoutViewProps {
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  lang: 'en' | 'bn';
  onOrderSuccess: (paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card' | 'COD', deliveryInfo: DeliveryInfo) => void;
  onCancel: () => void;
}

export default function CheckoutView({
  cartItems,
  subtotal,
  deliveryFee,
  discountAmount,
  lang,
  onOrderSuccess,
  onCancel,
}: CheckoutViewProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [fullName, setFullName] = useState('Anisur Rahman');
  const [phone, setPhone] = useState('01711223344');
  const [division, setDivision] = useState('Chattogram');
  const [city, setCity] = useState('Chattogram Central');
  const [address, setAddress] = useState('Flat 4B, GEC Tower, GEC Circle');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Rocket' | 'Card' | 'COD'>('bKash');
  const [walletNumber, setWalletNumber] = useState('');
  const [walletPin, setWalletPin] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Processing indicators
  const [processing, setProcessing] = useState(false);

  const grandTotal = subtotal + deliveryFee - discountAmount;

  const bdtDivisions = ['Chattogram', 'Dhaka', 'Sylhet', 'Khulna', 'Rajshahi'];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (!fullName || !phone || !city || !address) {
        alert('Please complete all mandatory field entries.');
        return;
      }
      setStep(2);
    }
  };

  const handleBackStep = () => {
    if (step === 2) setStep(1);
  };

  const triggerMockPaymentProcessing = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate merchant pay handshake
    setTimeout(() => {
      setProcessing(false);
      onOrderSuccess(paymentMethod, {
        fullName,
        phone,
        division,
        city,
        address,
        deliveryNotes,
      });
      setStep(3);
    }, 2800);
  };

  return (
    <div id="checkout-view-layout" className="max-w-4xl mx-auto py-8 px-4 font-sans text-charcoal text-left">
      
      {/* Title Header */}
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#0E5E4A]">Secure Checkout Desk</h1>
        <p className="text-xs text-gray-400 mt-1">Multi-step localized shipping & processing gateway.</p>
      </div>

      {/* Checkout step indicator tracker */}
      <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 1 ? 'bg-[#0E5E4A] text-white' : 'bg-gray-100 text-gray-400'
          }`}>1</div>
          <span className="text-xs font-semibold">Shipping Address</span>
        </div>
        <div className="w-12 h-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 2 ? 'bg-[#0E5E4A] text-white' : 'bg-gray-100 text-gray-400'
          }`}>2</div>
          <span className="text-xs font-semibold">Payment Settle</span>
        </div>
        <div className="w-12 h-px bg-gray-200"></div>
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
            step >= 3 ? 'bg-[#0E5E4A] text-white' : 'bg-gray-100 text-gray-400'
          }`}>3</div>
          <span className="text-xs font-semibold">Invoice Confirmation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: PRIMARY MODULE FORMS */}
        <div className="lg:col-span-8 bg-white border border-gray-150 rounded-2xl p-6 shadow-xs space-y-6">
          
          {/* STEP 1: SHIPPING ADDRESS MODULE */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h3 className="font-title font-semibold text-sm text-gray-800 uppercase tracking-wider flex items-center gap-2 pb-2.5 border-b border-gray-100">
                <Truck className="w-4.5 h-4.5 text-[#0E5E4A]" />
                Customer Shipping Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium">
                <div className="space-y-1.5 text-left">
                  <label className="text-gray-450 font-mono text-[10px] uppercase">Full Receiver Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-charcoal font-semibold text-xs text-left"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-gray-450 font-mono text-[10px] uppercase">Contact Mobile Number *</label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="e.g., 01711223344"
                      className="w-full bg-gray-50 border border-gray-250 rounded-lg pl-14 p-2.5 focus:outline-hidden text-charcoal font-semibold text-xs text-left"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-450 font-mono block text-xs border-r border-gray-200 pr-2">+88</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium">
                <div className="space-y-1.5 text-left">
                  <label className="text-gray-450 font-mono text-[10px] uppercase">Bangladesh Division *</label>
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-250 rounded-lg p-2.5 focus:outline-hidden font-semibold text-charcoal"
                  >
                    {bdtDivisions.map((div) => (
                      <option key={div} value={div}>{div}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5 text-left col-span-2">
                  <label className="text-gray-450 font-mono text-[10px] uppercase font-medium">Area / City Location *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="e.g. GEC Circle, Khulshi or Banani"
                    className="w-full bg-gray-50 border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-charcoal font-semibold text-xs text-left"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left text-xs font-medium">
                <label className="text-gray-450 font-mono text-[10px] uppercase">Exact Street Sourcing / Apartment Address *</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows={2}
                  className="w-full bg-gray-50 border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-charcoal font-semibold text-xs leading-relaxed text-left"
                />
              </div>

              <div className="space-y-1.5 text-left text-xs">
                <label className="text-gray-450 font-mono text-[10px] uppercase font-medium">Driver Delivery Notes (Optional)</label>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g., Please knock on neighbor flat if not responsive, or leave at reception desk..."
                  rows={1}
                  className="w-full bg-gray-50 border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-charcoal font-semibold text-xs text-left"
                />
              </div>

              {/* Submit trigger button */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onCancel}
                  className="text-xs font-bold text-gray-500 hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Cancel checkout</span>
                </button>
                <button
                  type="submit"
                  className="bg-[#0E5E4A] hover:bg-[#0c503f] text-white font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer shadow-md"
                >
                  Continue to Payments Selection
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: GATEWAY PAYMENT CHANNELS */}
          {step === 2 && (
            <form onSubmit={triggerMockPaymentProcessing} className="space-y-6">
              <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                <h3 className="font-title font-semibold text-sm text-gray-800 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4.5 h-4.5 text-[#0E5E4A]" />
                  Select Gateway Payment Channel
                </h3>
                <span className="text-xs text-[#0E5E4A] font-bold bg-emerald-50 px-2 py-0.5 rounded-lg">
                  Amount: ৳{grandTotal}
                </span>
              </div>

              {/* Grid selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { id: 'bKash', label: 'bKash Pay', bg: 'bg-pink-650 text-white border-pink-700' },
                  { id: 'Nagad', label: 'Nagad Cash', bg: 'bg-orange-600 text-white border-orange-700' },
                  { id: 'Rocket', label: 'Rocket', bg: 'bg-[#5c287a] text-white border-[#4d2166]' },
                  { id: 'Card', label: 'Bank Card', bg: 'bg-[#1A1A1A] text-white border-zinc-900' },
                  { id: 'COD', label: 'Cash on Delivery', bg: 'bg-amber-700 text-white border-amber-800' },
                ].map((meth) => {
                  const isChosen = paymentMethod === meth.id;
                  return (
                    <button
                      key={meth.id}
                      type="button"
                      onClick={() => setPaymentMethod(meth.id as any)}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center min-h-[64px] ${
                        isChosen
                          ? `${meth.bg} scale-102 ring-2 ring-emerald-500/25`
                          : 'border-gray-200 bg-white text-gray-650 hover:bg-gray-50'
                      }`}
                    >
                      <span>{meth.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Embedded localized simulator forms */}
              <div className="p-5 border border-gray-150 rounded-2xl bg-gray-50/60 text-xs">
                {paymentMethod === 'bKash' && (
                  <div className="space-y-3 max-w-sm text-left">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-wider tracking-wide flex items-center gap-1.5">
                      🌸 bKash Secure Merchant Checkout
                    </span>
                    <p className="text-[11px] text-gray-500">Provide your verified bKash wallet number. You will receive a simulated verification code instantly.</p>
                    <div className="space-y-1.5 font-medium">
                      <label className="text-gray-450 font-mono text-[9px] uppercase">bKash Active Number *</label>
                      <input
                        type="tel"
                        value={walletNumber}
                        onChange={(e) => setWalletNumber(e.target.value)}
                        placeholder="e.g. 017XXXXXXXX"
                        required
                        className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                      />
                    </div>
                    <div className="space-y-1.5 font-medium">
                      <label className="text-gray-450 font-mono text-[9px] uppercase">Sandbox PIN passcode *</label>
                      <input
                        type="password"
                        value={walletPin}
                        onChange={(e) => setWalletPin(e.target.value)}
                        placeholder="4 Digit secret PIN"
                        required
                        className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'Nagad' && (
                  <div className="space-y-3 max-w-sm text-left">
                    <span className="text-xs font-bold text-orange-650 uppercase tracking-wider tracking-wide flex items-center gap-1.5">
                      🍊 Nagad Wallet processing
                    </span>
                    <p className="text-[11px] text-gray-500">Fast checkout powered by Nagad digital banking network inside Bangladesh.</p>
                    <div className="space-y-1.5 font-medium">
                      <label className="text-gray-450 font-mono text-[9px] uppercase">Nagad Registered Number *</label>
                      <input
                        type="tel"
                        value={walletNumber}
                        onChange={(e) => setWalletNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        required
                        className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'Rocket' && (
                  <div className="space-y-3 max-w-sm text-left">
                    <span className="text-xs font-bold text-[#5c287a] uppercase tracking-widest flex items-center gap-1.5">
                      🚀 Dutch-Bangla Rocket Wallet
                    </span>
                    <p className="text-[11px] text-gray-500">Fast direct DBBL bank transfer using rocket codes.</p>
                    <div className="space-y-1.5 font-medium">
                      <label className="text-gray-450 font-mono text-[9px] uppercase">Rocket Number (12 Digits) *</label>
                      <input
                        type="tel"
                        value={walletNumber}
                        onChange={(e) => setWalletNumber(e.target.value)}
                        placeholder="017XXXXXXXXX"
                        required
                        className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'Card' && (
                  <div className="space-y-3 max-w-md text-left">
                    <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5">
                      💳 Credit or Debit Cards Settle
                    </span>
                    <p className="text-[11px] text-gray-500">Supports VISA, Mastercard, Amex, and local Nexus Cards.</p>
                    <div className="space-y-1.5 font-medium">
                      <label className="text-gray-450 font-mono text-[9px] uppercase">16-Digit Card Number *</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4123 4567 8901 2345"
                        required
                        className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5 font-medium">
                        <label className="text-gray-450 font-mono text-[9px] uppercase">Expiry MM/YY *</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="12/28"
                          required
                          className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                        />
                      </div>
                      <div className="space-y-1.5 font-medium">
                        <label className="text-gray-450 font-mono text-[9px] uppercase">CVV Code *</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="3 Digit Code"
                          required
                          className="w-full bg-white border border-gray-250 rounded-lg p-2.5 focus:outline-hidden text-xs font-semibold text-left"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'COD' && (
                  <div className="space-y-1.5 text-left py-2">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest flex items-center gap-1.5">
                      📦 Cash On Delivery Settle
                    </span>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      Absolutely secure! Place the order with infinite comfort first. Cash out or transition pay to our dispatch rider on GEC Chattogram delivery doorsteps.
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation controls */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackStep}
                  disabled={processing}
                  className="text-xs font-bold text-gray-500 hover:underline flex items-center gap-1 disabled:opacity-50"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to shipping address</span>
                </button>
                
                <button
                  type="submit"
                  disabled={processing}
                  className="bg-[#0E5E4A] hover:bg-[#0c503f] text-white font-bold text-xs py-3.5 px-6 rounded-xl cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 relative min-w-[180px] shadow-md"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying Settle...</span>
                    </>
                  ) : (
                    <span>Proceed & Settle Order</span>
                  )}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* RIGHT COLUMN: RECAP SUMMARY BASKET PANEL */}
        <div className="lg:col-span-4 bg-zinc-50 border border-gray-150 rounded-2xl p-5 space-y-4">
          <h3 className="font-title font-bold text-xs text-gray-500 uppercase tracking-wider">
            Order Basket Recap
          </h3>

          <div className="space-y-3 border-b border-gray-200 pb-4">
            {cartItems.map((item, index) => {
              const basePrice = item.product.price;
              const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
              const unitPrice = basePrice + offset;

              const p = item.product;
              const hasDiscount = p.discountPercent && p.discountPercent > 0;
              const finalPrice = hasDiscount && p.discountPercent
                ? unitPrice - (unitPrice * p.discountPercent) / 100
                : unitPrice;

              return (
                <div key={`${item.product.id}-${index}`} className="flex gap-2.5 items-center">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-150 border border-gray-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-semibold text-charcoal truncate">
                      {lang === 'en' ? item.product.name : (item.product.bnName || item.product.name)}
                    </h4>
                    <span className="text-[9px] text-gray-400 font-mono">Qty {item.quantity}</span>
                  </div>
                  <span className="text-xs font-bold text-[#0E5E4A] font-sans">
                    ৳{finalPrice * item.quantity}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="space-y-2 text-xs border-b border-gray-200 pb-3">
            <div className="flex justify-between">
              <span className="text-gray-500">Cart subtotal</span>
              <span className="font-semibold">৳{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">GEC Delivery fee</span>
              <span className="font-semibold">৳{deliveryFee}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Voucher discount</span>
                <span>-৳{discountAmount}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm pt-1">
            <span className="font-bold text-gray-800">Total pay BDT</span>
            <span className="text-base font-serif font-bold text-[#0E5E4A]">৳{grandTotal}</span>
          </div>

          {/* Secure lock metadata indicators */}
          <div className="pt-2.5 text-[10px] text-gray-400 space-y-1 bg-white/60 p-2.5 rounded-xl border border-gray-100">
            <span className="block text-emerald-700 font-bold font-title">🔒 SSL 256-BIT ENCRYPED</span>
            <p className="leading-relaxed">All payment sandbox transactions are completely isolated from standard client operations.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
