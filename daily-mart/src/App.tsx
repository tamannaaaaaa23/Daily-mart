/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ProductDetailView from './components/ProductDetailView';
import CartDrawer from './components/CartDrawer';
import CheckoutView from './components/CheckoutView';
import UserDashboardView from './components/UserDashboardView';
import StoreLocatorView from './components/StoreLocatorView';
import AiAssistant from './components/AiAssistant';
import LoginView from './components/LoginView';
import AdminDashboardView from './components/AdminDashboardView';

import { ActiveTab, CartItem, Product, ProductVariant, Order, UserProfile } from './types';
import { SAMPLE_PRODUCTS } from './data/products';
import { Sparkles, ShoppingBag, Terminal, CheckCircle2, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Dynamic product state synced to local storage
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('dm_v2_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback
      }
    }
    return SAMPLE_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('dm_v2_products', JSON.stringify(products));
  }, [products]);

  // Authentication states
  const [auth, setAuth] = useState<{ role: 'user' | 'admin'; email: string; name: string } | null>(null);

  // Navigation active route
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeProduct, setActiveProduct] = useState<Product>(products[0] || SAMPLE_PRODUCTS[0]);
  const [lang, setLang] = useState<'en' | 'bn'>('en');

  // Slide-Drawer control
  const [cartOpen, setCartOpen] = useState(false);

  // Core baskets states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // User Profile with dynamic points calculations
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Anisur Rahman',
    email: 'anisur.gec@gmail.com',
    phone: '01711223344',
    address: 'Flat 4B, GEC Tower, GEC Circle, Chattogram',
    points: 85,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    joinedDate: 'March 2026'
  });

  // Placed Order logs storage
  const [orderHistory, setOrderHistory] = useState<Order[]>([
    {
      id: 'DM-INV-93821',
      date: '2026-06-02',
      items: [
        {
          productId: 'g1',
          productName: 'Premium Kalijira Rice (Aromatic Chini Gura)',
          variantName: '5 kg Bulk',
          price: 785,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=150'
        }
      ],
      total: 845, // 785 + 60 fee
      status: 'Delivered',
      paymentMethod: 'COD',
      deliveryInfo: {
        fullName: 'Anisur Rahman',
        phone: '01711223344',
        division: 'Chattogram',
        city: 'Chattogram Central',
        address: 'Flat 4B, GEC Tower, GEC Circle, Chattogram'
      }
    }
  ]);

  // Applied Promo coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; type: 'percent' | 'flat' } | null>(null);

  // --- Dynamic floating interactive notification toasts ---
  const [toast, setToast] = useState<{ id: string; text: string; mode: 'success' | 'info' | 'cart' } | null>(null);

  const showNotification = (text: string, mode: 'success' | 'info' | 'cart' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, text, mode });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Navigation callbacks
  const handleSelectProduct = (p: Product) => {
    setActiveProduct(p);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // State cart additions
  const handleAddToCart = (p: Product, selectedVariant?: ProductVariant, qty: number = 1) => {
    setCart((prev) => {
      // Check if duplicate exists with exact variant
      const isDuplicate = prev.find(
        (item) => item.product.id === p.id && item.selectedVariant?.id === selectedVariant?.id
      );

      if (isDuplicate) {
        return prev.map((item) =>
          item.product.id === p.id && item.selectedVariant?.id === selectedVariant?.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: p, selectedVariant, quantity: qty }];
    });

    const vName = selectedVariant ? ` (${selectedVariant.name})` : '';
    showNotification(`Successfully added ${qty}x ${p.name}${vName} to your basket!`, 'cart');
    setCartOpen(true); // Open drawer instantly
  };

  // Buy now shortcut: adds to cart and jumps straight to checkout
  const handleBuyNow = (p: Product, selectedVariant?: ProductVariant, qty: number = 1) => {
    setCart((prev) => {
      const isDuplicate = prev.find(
        (item) => item.product.id === p.id && item.selectedVariant?.id === selectedVariant?.id
      );
      if (isDuplicate) {
        return prev.map((item) =>
          item.product.id === p.id && item.selectedVariant?.id === selectedVariant?.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: p, selectedVariant, quantity: qty }];
    });

    setActiveTab('checkout');
    setCartOpen(false);
  };

  // State wishlist additions
  const handleAddToWishlist = (p: Product) => {
    setWishlist((prev) => {
      const isSaved = prev.some((item) => item.id === p.id);
      if (isSaved) {
        showNotification(`Removed ${p.name} from savings list.`, 'info');
        return prev.filter((item) => item.id !== p.id);
      }
      showNotification(`Saved ${p.name} to wishlist!`, 'success');
      return [...prev, p];
    });
  };

  // Quantity updates
  const handleUpdateCartQty = (productId: string, variantId: string | undefined, qty: number) => {
    if (qty <= 0) {
      handleRemoveCartItem(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId && item.selectedVariant?.id === variantId
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string, variantId: string | undefined) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedVariant?.id === variantId)
      )
    );
    showNotification('Item removed from cart basket.', 'info');
  };

  // Place order gateway
  const handleCreateOrder = (paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card' | 'COD', deliveryInfo: any) => {
    const subtotal = cart.reduce((acc, item) => {
      const basePrice = item.product.price;
      const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
      const finalPrice = item.product.discountPercent
        ? (basePrice + offset) - ((basePrice + offset) * item.product.discountPercent) / 100
        : basePrice + offset;
      return acc + finalPrice * item.quantity;
    }, 0);

    const discountAmount = appliedCoupon
      ? (appliedCoupon.type === 'percent' ? (subtotal * appliedCoupon.discount) / 100 : appliedCoupon.discount)
      : 0;

    const deliveryFee = 60;
    const finalBill = subtotal + deliveryFee - discountAmount;

    // Convert items
    const orderItems = cart.map((item) => {
      const basePrice = item.product.price;
      const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
      const calculatedPrice = item.product.discountPercent
        ? (basePrice + offset) - ((basePrice + offset) * item.product.discountPercent) / 100
        : basePrice + offset;

      return {
        productId: item.product.id,
        productName: item.product.name,
        variantName: item.selectedVariant?.name,
        price: calculatedPrice,
        quantity: item.quantity,
        image: item.product.image
      };
    });

    const newOrder: Order = {
      id: `DM-INV-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: orderItems,
      total: finalBill,
      status: 'Processing',
      paymentMethod,
      deliveryInfo
    };

    // Update orders history log
    setOrderHistory((prev) => [newOrder, ...prev]);

    // Calculate accrued rewards loyalty points: 1% point balance increase (1 point per ৳100 spent)
    const pointsEarned = Math.floor(finalBill / 100);
    setUserProfile((prev) => ({
      ...prev,
      points: prev.points + pointsEarned
    }));

    // Reset items
    setCart([]);
    setAppliedCoupon(null);
    setActiveTab('user-dashboard'); // Transition of screen
    showNotification(`Outstanding order placed! Invoice Reference: ${newOrder.id}. Accrued +${pointsEarned} loyalty points!`, 'success');
  };

  // Admin capabilities callbacks
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const handleRemoveProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      // Clean up dependencies
      setCart((c) => c.filter((it) => it.product.id !== productId));
      setWishlist((w) => w.filter((it) => it.id !== productId));
      return updated;
    });
  };

  // Helper variables for subtab pricing passed down
  const getSubtotal = () => {
    return cart.reduce((acc, item) => {
      const basePrice = item.product.price;
      const offset = item.selectedVariant ? item.selectedVariant.priceOffset : 0;
      const finalPrice = item.product.discountPercent
        ? (basePrice + offset) - ((basePrice + offset) * item.product.discountPercent) / 100
        : basePrice + offset;
      return acc + finalPrice * item.quantity;
    }, 0);
  };

  const currentSubtotal = getSubtotal();
  const activeDeliveryFee = currentSubtotal > 0 ? 60 : 0;
  const currentDiscountAmount = appliedCoupon
    ? (appliedCoupon.type === 'percent' ? (currentSubtotal * appliedCoupon.discount) / 100 : appliedCoupon.discount)
    : 0;

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans antialiased text-[#1A1A1A]">
      
      {/* Visual top utility helper bar */}
      <div className="bg-neutral-950/90 text-neutral-400 py-2 px-4 text-[11px] font-medium flex items-center justify-between border-b border-neutral-800/60 backdrop-blur-md">
        <div className="flex items-center gap-1.5 md:gap-4 select-none">
          <span className="text-emerald-400 font-semibold">
            {lang === 'en' ? 'GEC Flagship Hub Online' : 'জিইসি প্ল্যাটফর্ম অনলাইন'}
          </span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline">{lang === 'en' ? 'Hotline Support: +8801711223344' : 'সরাসরি হেল্পলাইন: +৮৮০১৭১১২২৩৩৪৪'}</span>
        </div>
        <div className="font-mono text-neutral-500 flex items-center gap-1.5 select-none">
          <span>LATENCY: 42ms</span>
        </div>
      </div>

      {/* Main navigation systems */}
      <Navbar
        lang={lang}
        setLang={setLang}
        cartCount={cart.reduce((v, item) => v + item.quantity, 0)}
        onCartClick={() => setCartOpen(true)}
        wishlistCount={wishlist.length}
        onWishlistClick={() => { setActiveTab('user-dashboard'); window.scrollTo({ top: 300, behavior: 'smooth' }); }}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSelectProduct={handleSelectProduct}
        products={products}
      />

      {/* Dynamic secondary navigation links row for simple, elegant context shifting */}
      <nav className="bg-white/45 backdrop-blur-xl border-b border-white/50 py-3 px-4 md:px-6 shrink-0 shadow-xs sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between md:justify-start gap-4 md:gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveTab('home')}
            className={`text-xs font-bold tracking-wide uppercase transition-all shrink-0 ${
              activeTab === 'home' || activeTab === 'product-detail'
                ? 'text-[#0E5E4A] border-b-2 border-[#0E5E4A] pb-1'
                : 'text-neutral-500 hover:text-charcoal pb-1'
            }`}
          >
            {lang === 'en' ? 'Shop Marketplace' : 'পণ্য শপফ্রন্ট'}
          </button>
          
          <button
            onClick={() => setActiveTab('store-locator')}
            className={`text-xs font-bold tracking-wide uppercase transition-all shrink-0 ${
              activeTab === 'store-locator'
                ? 'text-[#0E5E4A] border-b-2 border-[#0E5E4A] pb-1'
                : 'text-neutral-500 hover:text-charcoal pb-1'
            }`}
          >
            {lang === 'en' ? 'Store Locator' : 'আউটলেট মানচিত্র'}
          </button>

          <button
            onClick={() => setActiveTab('user-dashboard')}
            className={`text-xs font-bold tracking-wide uppercase transition-all shrink-0 ${
              activeTab === 'user-dashboard'
                ? 'text-[#0E5E4A] border-b-2 border-[#0E5E4A] pb-1'
                : 'text-neutral-500 hover:text-charcoal pb-1'
            }`}
          >
            {lang === 'en' ? 'Account Profile' : 'প্রোফাইল অ্যাকাউন্ট'}
          </button>


        </div>
      </nav>

      {/* Primary body screen router mapping */}
      <main id="primary-viewport" className="flex-1">
        
        {activeTab === 'home' && (
          <HomeView
            lang={lang}
            onSelectProduct={handleSelectProduct}
            addToCart={handleAddToCart}
            addToWishlist={handleAddToWishlist}
            wishlist={wishlist}
            setActiveTab={setActiveTab}
            products={products}
          />
        )}

        {/* View dynamic detail of selected product */}
        {activeTab === 'product-detail' && (
          <ProductDetailView
            product={activeProduct}
            lang={lang}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onSelectProduct={handleSelectProduct}
            onBackClick={() => setActiveTab('home')}
            wishlist={wishlist}
            addToWishlist={handleAddToWishlist}
            products={products}
          />
        )}

        {activeTab === 'store-locator' && (
          <StoreLocatorView lang={lang} />
        )}

        {activeTab === 'user-dashboard' && (
          auth === null ? (
            <LoginView
              lang={lang}
              onLoginSuccess={(role, email, name) => setAuth({ role, email, name })}
            />
          ) : auth.role === 'admin' ? (
            <AdminDashboardView
              lang={lang}
              products={products}
              onAddProduct={handleAddProduct}
              onRemoveProduct={handleRemoveProduct}
              onLogout={() => setAuth(null)}
              userName={auth.name}
            />
          ) : (
            <UserDashboardView
              lang={lang}
              userProfile={{
                ...userProfile,
                name: auth.name,
                email: auth.email,
              }}
              orderHistory={orderHistory}
              wishlist={wishlist}
              onProductClick={handleSelectProduct}
              onRemoveWishlist={handleAddToWishlist}
              setActiveTab={setActiveTab}
              onLogout={() => setAuth(null)}
            />
          )
        )}



      </main>

      {/* SECURE MULTI-STEP CHECKOUT FULL VIEW OVERLAY SCREEN */}
      {activeTab === 'checkout' && (
        <section className="bg-white min-h-screen z-10 py-4 border-t border-gray-150">
          <CheckoutView
            cartItems={cart}
            subtotal={currentSubtotal}
            deliveryFee={activeDeliveryFee}
            discountAmount={currentDiscountAmount}
            lang={lang}
            onOrderSuccess={handleCreateOrder}
            onCancel={() => setActiveTab('home')}
          />
        </section>
      )}

      {/* PERSISTENT MODULAR CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        lang={lang}
        onCheckoutClick={() => { setCartOpen(false); setActiveTab('checkout'); }}
        appliedCoupon={appliedCoupon}
        setAppliedCoupon={setAppliedCoupon}
      />

      {/* FLOATING AI ASSISTANT CONSOLE */}
      <AiAssistant
        lang={lang}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* Floating sliding Notifications toast */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-6 z-50 rounded-2xl bg-zinc-950 text-white shadow-2xl p-4 border border-white/10 flex items-center gap-3 max-w-sm text-xs text-left animate-in border-emerald-500/20"
          >
            {toast.mode === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : toast.mode === 'info' ? (
              <Info className="w-5 h-5 text-sky-400 shrink-0" />
            ) : (
              <ShoppingBag className="w-5 h-5 text-[#D4AF37] shrink-0" />
            )}
            
            <div className="flex-1">
              <span className="block font-title font-bold uppercase text-[9px] text-[#D4AF37] tracking-wider">
                Daily Mart Alert
              </span>
              <p className="text-gray-200 mt-0.5 leading-snug">{toast.text}</p>
            </div>

            <button 
              onClick={() => setToast(null)} 
              className="text-gray-400 hover:text-white cursor-pointer hover:bg-white/10 p-1 rounded-md"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer lang={lang} setActiveTab={setActiveTab} />
    </div>
  );
}
