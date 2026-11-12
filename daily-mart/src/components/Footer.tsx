/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, Mail, Clock, MapPin, Download, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ActiveTab } from '../types';

interface FooterProps {
  lang: 'en' | 'bn';
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Footer({ lang, setActiveTab }: FooterProps) {
  return (
    <footer id="app-footer" className="bg-[#1A1A1A] text-gray-300 font-sans border-t border-gray-800">
      
      {/* Upper Marketing / Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12 border-b border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-[#0E5E4A] hover:bg-[#0E5E4A] hover:text-white transition-all">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-title">
                {lang === 'en' ? 'Absolute Quality Guaranteed' : 'শতভাগ খাঁটি পণ্যের নিশ্চয়তা'}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Sourced directly from verified farmers & original global brands.' : 'কৃষক ও মূল আমদানিকারক থেকে সরাসরি সুনিপুণভাবে সংগৃহীত।'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-400/10 flex items-center justify-center text-orange-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-title">
                {lang === 'en' ? 'Express Delivery' : 'এক্সপ্রেস হোম ডেলিভারি'}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Within 3 hours inside Chattogram GEC Hub & Dhaka central locations.' : 'চট্টগ্রাম জিইসি হাব এবং ঢাকার প্রধান স্থানে ৩ ঘণ্টার মধ্যে ডেলিভারি।'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-title">
                {lang === 'en' ? 'Secure Payment Vault' : 'নিরাপদ পেমেন্ট গেটওয়ে'}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Highly verified bKash, Nagad tokens and card transactions protection.' : 'বিকাশ, নগদ সহ আন্তর্জাতিক ক্রেডিট কার্ডের সুরক্ষিত লেনদেন।'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white font-title">
                {lang === 'en' ? 'Store Pick-up Available' : 'আউটলেট পিক-আপ সুবিধা'}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                {lang === 'en' ? 'Order online & collect from our offline flagship Chattogram GEC store.' : 'অনলাইনে অর্ডার করে সরাসরি আমাদের চট্টগ্রাম আউটলেট থেকে বুঝে নিন।'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Grid - Links, Address & App Download QR */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#0E5E4A] flex items-center justify-center text-white">
                <span className="font-title text-lg font-bold">DM</span>
              </div>
              <span className="font-title text-lg font-bold text-white tracking-tight">
                Daily <span className="text-emerald-500">Mart</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              {lang === 'en' 
                ? 'Daily Mart is a premium retail ecosystem. We combine advanced logistics, heritage fashion aesthetics, and local product directories to provide an elite online supermarket experience across Bangladesh.'
                : 'ডেইলিমার্ট বাংলাদেশের একটি প্রিমিয়াম রিটেইল প্ল্যাটফর্ম। আমরা আধুনিক শপিং অভিজ্ঞতা এবং দেশের ঐতিহ্যবাহী পণ্যসামগ্রীকে একই ড্যাশবোর্ডে নিয়ে এসেছি।'}
            </p>
            
            {/* Local Chattogram Hub Contact info */}
            <div className="space-y-2.5 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>GEC Circle, Central Hub, Chattogram, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-450 shrink-0" />
                <span>+880 1711 223344 (Hotline 24/7)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>support@dailymartbd.com</span>
              </div>
            </div>
          </div>

          {/* Quick Categories Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-semibold text-white font-title tracking-wider uppercase">
              {lang === 'en' ? 'Quick Links' : 'প্রয়োজনীয় লিংক'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li><button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home Page</button></li>
              <li><button onClick={() => setActiveTab('store-locator')} className="hover:text-white transition-colors">Store Locator Map</button></li>
              <li><button onClick={() => setActiveTab('user-dashboard')} className="hover:text-white transition-colors">My Profile Account</button></li>
            </ul>
          </div>

          {/* Delivery Divisions list */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="text-sm font-semibold text-white font-title tracking-wider uppercase">
              {lang === 'en' ? 'Delivery Zones' : 'ডেলিভারি এরিয়া'}
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>{lang === 'en' ? 'Chattogram Division (Primary Hub)' : 'চট্টগ্রাম বিভাগ (প্রধান হাব)'}</li>
              <li>{lang === 'en' ? 'Dhaka Division' : 'ঢাকা বিভাগ'}</li>
              <li>{lang === 'en' ? 'Sylhet Division' : 'সিলেট বিভাগ'}</li>
              <li>{lang === 'en' ? 'Khulna District' : 'খুলনা বিভাগ'}</li>
              <li>{lang === 'en' ? 'Rajshahi Division' : 'রাজশাহী বিভাগ'}</li>
            </ul>
          </div>

          {/* QR Code and App Download Panel */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold text-white font-title tracking-wider uppercase flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#D4AF37]" />
              {lang === 'en' ? 'Download Mobile App' : 'ডাউনলোড ডেইলিমার্ট অ্যাপ'}
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              {lang === 'en' 
                ? 'Scan the secure QR with your smartphone to download our native Android / iOS application directly.'
                : 'স্মার্টফোনের ক্যামেরা দিয়ে কিউআর স্ক্যান করে সরাসরি আমাদের অ্যান্ড্রয়েড এবং আইওএস অ্যাপটি ডাউনলোড করতে পারেন।'}
            </p>

            <div className="flex items-center gap-4 pt-1 bg-gray-900/40 p-3.5 rounded-xl border border-gray-800">
              {/* Simulated QR Code SVG */}
              <div className="w-20 h-20 bg-white p-1 rounded-lg flex items-center justify-center shrink-0 border border-gray-700">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="black">
                  <path d="M5 5h30v30H5zm10 10h10v10H15zM5 65h30v30H5zm10 10h10v10H15zM65 5h30v30H65zm10 10h10v10H75z" />
                  <path d="M45 15h10v10H45zm5 25h10v15H50zm10-10h10v10H60zm10 25h20v10H70zm-5 15h10v10H65zm20-25h10v10H85zm-30 15h10v10H55zm15-15h5v5h-5zm0 15h10v5H70z" />
                  <circle cx="50" cy="50" r="5" fill="#0E5E4A" />
                </svg>
              </div>
              
              <div className="space-y-2">
                <button className="w-full bg-black hover:bg-zinc-800 text-white text-[10px] font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 border border-zinc-700 transition-colors">
                  <span className="text-base select-none">🤖</span>
                  <div className="text-left font-sans">
                    <span className="text-[8px] text-gray-450 block">Get it on</span>
                    Google Play Store
                  </div>
                </button>
                <button className="w-full bg-black hover:bg-zinc-800 text-white text-[10px] font-semibold py-1.5 px-3 rounded-lg flex items-center gap-2 border border-zinc-700 transition-colors">
                  <span className="text-base select-none">🍏</span>
                  <div className="text-left font-sans">
                    <span className="text-[8px] text-gray-450 block">Download on</span>
                    Apple App Store
                  </div>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal / Payment partners board */}
      <div className="bg-[#111111] py-8 text-xs text-gray-500 border-t border-gray-850">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p>© 2026 Daily Mart Limited. Crafted with premium luxury guidelines.</p>
            <p className="text-[10px] text-gray-600 mt-1">Authorized digital merchant supplier in Chattogram Corporate Delivery Zone.</p>
          </div>

          {/* Payment Badges using elegant text indicators and colors */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-pink-600 text-white text-[9px] font-bold px-2 py-1 rounded tracking-wide font-mono select-none" title="bKash Merchant Pay">bKash</span>
            <span className="bg-orange-600 text-white text-[9px] font-bold px-2 py-1 rounded tracking-wide font-mono select-none" title="Nagad Cash Transfer">Nagad</span>
            <span className="bg-[#5c287a] text-white text-[9px] font-bold px-2 py-1 rounded tracking-wide font-mono select-none" title="Rocket Wallet Direct">Rocket</span>
            <span className="bg-zinc-800 text-gray-300 text-[9px] font-bold px-2 py-1 rounded tracking-wide font-mono select-none" title="Credit Cards Processing">Cards</span>
            <span className="bg-amber-700 text-white text-[9px] font-bold px-2 py-1 rounded tracking-wide font-mono select-none text-center block leading-none" title="Cash on Delivery">C.O.D</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
