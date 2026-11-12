/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ChevronLeft, Star, ShoppingCart, Heart, ShieldCheck, MapPin, Truck, HelpCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Product, ProductVariant } from '../types';
import { SAMPLE_PRODUCTS } from '../data/products';

interface ProductDetailViewProps {
  product: Product;
  lang: 'en' | 'bn';
  onAddToCart: (p: Product, variant?: ProductVariant, quantity?: number) => void;
  onBuyNow: (p: Product, variant?: ProductVariant, quantity?: number) => void;
  onSelectProduct: (p: Product) => void;
  onBackClick: () => void;
  wishlist: Product[];
  addToWishlist: (p: Product) => void;
  products: Product[];
}

export default function ProductDetailView({
  product,
  lang,
  onAddToCart,
  onBuyNow,
  onSelectProduct,
  onBackClick,
  wishlist,
  addToWishlist,
  products,
}: ProductDetailViewProps) {
  // Main gallery focus
  const [activeImage, setActiveImage] = useState(product.gallery[0] || product.image);
  
  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants && product.variants.length > 0 ? product.variants[0] : undefined
  );

  // Counter quantity state
  const [quantity, setQuantity] = useState(1);

  // Bangladesh division delivery calculation
  const [selectedHub, setSelectedHub] = useState('Chattogram');

  const deliveryZones = [
    { name: 'Chattogram', fee: 60, time: '3-12 Hours (Express Hub)' },
    { name: 'Dhaka', fee: 110, time: '24-48 Hours' },
    { name: 'Sylhet', fee: 120, time: '2 Days' },
    { name: 'Khulna', fee: 130, time: '3 Days' },
    { name: 'Rajshahi', fee: 130, time: '3 Days' }
  ];

  const currentZone = deliveryZones.find(z => z.name === selectedHub) || deliveryZones[0];

  // Calculate dynamic price based on variant offset
  const basePrice = product.price;
  const offset = selectedVariant ? selectedVariant.priceOffset : 0;
  const currentPrice = basePrice + offset;
  
  const hasDiscount = product.discountPercent && product.discountPercent > 0;
  const discountedPrice = hasDiscount && product.discountPercent
    ? currentPrice - (currentPrice * product.discountPercent) / 100
    : currentPrice;

  // Filter related products
  const related = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  const isWishlisted = wishlist.some(item => item.id === product.id);

  return (
    <div id="product-details-container" className="max-w-7xl mx-auto px-4 md:px-6 py-6 font-sans text-charcoal">
      
      {/* Back breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackClick}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0E5E4A] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{lang === 'en' ? 'Back to Collection' : 'আগের পেজে ফিরুন'}</span>
        </button>
        <span className="text-xs text-gray-400 font-mono">ID: {product.id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl p-6 md:p-8 border border-gray-150 shadow-xs">
        
        {/* LEFT COLUMN: INTERACTIVE GALLERY */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square w-full rounded-2xl bg-gray-50 border border-gray-150 overflow-hidden group">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-102"
              referrerPolicy="no-referrer"
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-red-650 text-white font-bold text-xs uppercase px-2.5 py-1 rounded-md z-15">
                -{product.discountPercent}% Off
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          {product.gallery.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.gallery.map((img, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveImage(img)}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square w-full rounded-xl border-2 overflow-hidden bg-gray-50 transition-all ${
                    activeImage === img ? 'border-[#0E5E4A] scale-102 shadow-xs' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Sincerity badge */}
          <div className="p-4 border border-emerald-50 bg-emerald-50/15 rounded-2xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-[#0E5E4A] uppercase tracking-wide font-title">
                {lang === 'en' ? 'Daily Mart Verified Purchase' : 'ডেইলিমার্ট ভেরিফাইড গ্যারান্টি'}
              </h4>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                {lang === 'en' ? '100% genuine farm sourcing, chemical-free testing protocols. Returned inside 7 days on mismatch.' : 'শতভাগ অর্গানিক খামার থেকে সংগৃহীত। যেকোনো অমিল দেখা দিলে ৭ দিনের মধ্যে ফ্রি রিটার্ন সুবিধা।'}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: RELEVANT PRODUCT STATS */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Header titles */}
          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase font-title inline-block">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-charcoal leading-snug">
              {lang === 'en' ? product.name : (product.bnName || product.name)}
            </h1>
            
            {/* Star ratings */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-250'}`} />
                ))}
              </div>
              <span className="text-xs font-bold text-charcoal">{product.rating}</span>
              <span className="text-xs text-gray-400">• {product.ratingCount} Reviews</span>
              <span className="text-xs text-gray-400">• {product.stock > 0 ? (
                <span className="text-emerald-600 font-bold">In Stock ({product.stock} {product.unit})</span>
              ) : (
                <span className="text-red-500 font-bold">Out of Stock</span>
              )}</span>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="p-4 border border-gray-150 rounded-2xl bg-gray-55/30 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-gray-400 block uppercase font-mono">Special Price ৳</span>
              <div className="flex items-baseline gap-2.5">
                <span className="text-2xl md:text-3xl font-serif font-bold text-[#0E5E4A]">৳{discountedPrice}</span>
                {hasDiscount && (
                  <span className="text-xs text-gray-400 line-through">৳{currentPrice}</span>
                )}
              </div>
            </div>
            
            {hasDiscount && (
              <div className="bg-red-55 border border-red-200/50 rounded-xl px-3 py-1.5 text-center">
                <span className="text-[10px] text-red-650 font-bold uppercase tracking-wide block">You Save</span>
                <span className="text-xs font-bold text-red-600">৳{currentPrice - discountedPrice}</span>
              </div>
            )}
          </div>

          {/* Visual remaining stock details helper block */}
          <div className="p-4 border border-zinc-200 bg-neutral-50 rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-500">Remaining Warehouse Stock:</span>
              <span className={`font-bold ${product.stock > 15 ? 'text-emerald-700' : 'text-red-650'}`}>
                {product.stock > 0 ? `${product.stock} ${product.unit} left` : 'Sold out'}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${product.stock > 15 ? 'bg-[#0E5E4A]' : 'bg-red-500 animate-pulse'}`}
                style={{ width: `${Math.min(100, Math.max(8, (product.stock / 200) * 100))}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-gray-400 leading-normal">
              {product.stock > 15 
                ? 'High inventory availability index. In-stock & ready to dispatch inside the standard local 3-hour cycle.' 
                : 'Crucial stock warnings. Grab yours before this batch sells out entirely.'}
            </p>
          </div>

          {/* Product description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Description</h4>
            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
              {lang === 'en' ? product.description : (product.bnDescription || product.description)}
            </p>
          </div>

          {/* Part A: VARIANT SELECTOR CHIPS */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                Select Option / Pack Size
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((variant) => {
                  const isChosen = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`text-xs px-4 py-2.5 rounded-xl border font-semibold tracking-wide transition-all ${
                        isChosen
                          ? 'border-[#0E5E4A] bg-emerald-55/10 text-[#0E5E4A] shadow-xs'
                          : 'border-gray-250 bg-white text-gray-650 hover:bg-gray-50'
                      }`}
                    >
                      <span>{variant.name}</span>
                      {variant.priceOffset !== 0 && (
                        <span className="text-[10px] text-gray-400 ml-1">
                          ({variant.priceOffset > 0 ? `+৳${variant.priceOffset}` : `-৳${Math.abs(variant.priceOffset)}`})
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Part B: QUANTITY & BUY TRIGGERS */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            
            <div className="space-y-1 bg-gray-50 p-1.5 rounded-xl border border-gray-150 inline-block">
              <span className="text-[9px] text-gray-400 uppercase font-mono block text-center">QUANTITY</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={decrementQty}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs border text-charcoal hover:bg-gray-50 font-bold flex items-center justify-center select-none"
                >
                  -
                </button>
                <span className="font-mono font-bold text-xs w-6 text-center">{quantity}</span>
                <button
                  onClick={incrementQty}
                  className="w-7 h-7 rounded-lg bg-white shadow-xs border text-charcoal hover:bg-gray-50 font-bold flex items-center justify-center select-none"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex-1 flex gap-3 text-xs md:text-sm font-bold min-w-[240px]">
              <button
                onClick={() => onAddToCart(product, selectedVariant, quantity)}
                className="flex-1 border-2 border-[#0E5E4A] hover:bg-emerald-50/40 text-[#0E5E4A] py-3.5 px-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add To Cart</span>
              </button>
              
              <button
                onClick={() => onBuyNow(product, selectedVariant, quantity)}
                className="flex-1 bg-[#0E5E4A] hover:bg-[#0c503f] text-white py-3.5 px-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
              >
                Buy Now
              </button>

              <button
                onClick={() => addToWishlist(product)}
                className={`w-12 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted ? 'border-red-200 bg-red-50 text-red-500' : 'border-gray-200 text-gray-400 hover:text-red-500'
                }`}
                title="Save product"
              >
                <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

          </div>

          {/* Part C: LOCALIZED DIVISION DELIVERY FEE ESTIMATOR */}
          <div className="border border-gray-105 rounded-2xl p-4.5 space-y-3.5 bg-gray-55/20 text-xs">
            <div className="flex items-center gap-2 text-charcoal font-bold">
              <Truck className="w-4.5 h-4.5 text-[#0E5E4A]" />
              <span>{lang === 'en' ? 'Division Delivery Sourcing & Fees' : 'ডেলিভারি খরচ ও সময় হিসাবকারী'}</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-400 font-mono text-[10px] uppercase">Select Division</span>
              <div className="flex flex-wrap gap-2.5">
                {deliveryZones.map((zone) => (
                  <button
                    key={zone.name}
                    onClick={() => setSelectedHub(zone.name)}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      selectedHub === zone.name
                        ? 'border-[#0E5E4A] bg-emerald-55/10 text-[#0E5E4A]'
                        : 'border-gray-250 bg-white text-gray-550'
                    }`}
                  >
                    {zone.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-gray-150/70 pt-3 text-xs bg-white/40 p-2.5 rounded-xl">
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-mono">HOMESHIP FEE</span>
                <span className="font-bold text-emerald-800 text-sm">৳{currentZone.fee} BDT</span>
              </div>
              <div>
                <span className="text-gray-400 block text-[9px] uppercase font-mono">HOURS ESTIMATION</span>
                <span className="font-bold text-charcoal">{currentZone.time}</span>
              </div>
            </div>
          </div>

          {/* Technical Specifications specs mapping */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Product Specifications</h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden text-xs">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 border-b border-gray-105 last:border-0">
                  <div className="bg-gray-50 p-2.5 font-semibold text-gray-500 uppercase font-mono text-[10px] border-r border-gray-100">{key}</div>
                  <div className="col-span-2 p-2.5 text-gray-655 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* REVIEWS COMMENTS BOARD */}
      <section className="mt-10 bg-white rounded-3xl p-6 border border-gray-150 text-left">
        <h3 className="font-serif font-bold text-lg text-charcoal border-b border-gray-150 pb-3 mb-4">
          Verified Customer Experiences ({product.reviews.length})
        </h3>
        {product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/30">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#0E5E4A] flex items-center justify-center font-bold text-xs border border-emerald-100">
                      {rev.userName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="block text-xs font-bold">{rev.userName}</span>
                      <span className="text-[9px] text-gray-400 flex items-center gap-0.5">
                        {rev.verified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                        {rev.date} • Verified buyer
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2.5 font-sans leading-relaxed pl-10">"{rev.comment}"</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 font-medium">No reviews written for this batch yet. Be the first to express opinion!</p>
        )}
      </section>

      {/* RELATED PRODUCTS DRAWER */}
      {related.length > 0 && (
        <section className="mt-12 text-left">
          <div className="border-b border-gray-100 pb-3 mb-6">
            <h3 className="font-serif font-bold text-lg text-charcoal">Related Premium Finds</h3>
            <p className="text-xs text-gray-400 mt-0.5">Other curated selections belonging to our {product.category} catalogue.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => { onSelectProduct(p); setActiveImage(p.gallery[0] || p.image); }}
                className="group flex gap-4 p-3 bg-white border border-gray-150 rounded-2xl shadow-xs hover:shadow-md cursor-pointer hover:border-gray-250 transition-all"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-16 h-16 rounded-xl object-cover bg-gray-50 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex flex-col justify-between py-0.5">
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal line-clamp-1 group-hover:text-[#0E5E4A] transition-colors">
                      {lang === 'en' ? p.name : (p.bnName || p.name)}
                    </h4>
                    <span className="text-[10px] text-gray-400 block">{p.category}</span>
                  </div>
                  <span className="text-xs font-bold text-[#0E5E4A] block">৳{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
