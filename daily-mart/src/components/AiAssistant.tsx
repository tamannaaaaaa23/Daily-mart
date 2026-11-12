/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, ShoppingCart, Eye, HelpCircle, ArrowRight } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Product } from '../types';

interface AiAssistantProps {
  lang: 'en' | 'bn';
  onAddToCart: (p: Product) => void;
  onSelectProduct: (p: Product) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  recommendedProduct?: Product;
}

export default function AiAssistant({ lang, onAddToCart, onSelectProduct }: AiAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'agent',
      text: lang === 'en'
        ? "Assalamu Alaikum! I am your Daily Mart Smart AI Sourcing Assistant. How can I guide your premium shopping experience inside Bangladesh today? (Try asking about: Kalijira rice, traditional panjabi, or sandalwood!)"
        : "আসসালামু আলাইকুম! ডেইলিমার্ট এআই অ্যাসিস্ট্যান্ট-এ আপনাকে স্বাগতম। আপনার কেনাকাটায় সাহায্য করার জন্য আমি প্রস্তুত। কালিজিরা চাল, ঐতিহ্যবাহী পাঞ্জাবি বা রূপচর্চার অর্গানিক চন্দন নিয়ে প্রশ্ন করতে পারেন!",
      timestamp: 'Just now'
    }
  ]);

  const listEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to lowest message
  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Generate responsive agent outputs matching keywords
    setTimeout(() => {
      const resp = generateAgentReply(query);
      const agentMsg: Message = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: resp.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendedProduct: resp.product
      };
      setMessages(prev => [...prev, agentMsg]);
    }, 1200);
  };

  const generateAgentReply = (text: string): { text: string; product?: Product } => {
    const query = text.toLowerCase();
    
    // Matched 1: Aromatic/Chinigura Kalijira Rice
    if (query.includes('rice') || query.includes('kcal') || query.includes('চাল') || query.includes('kalijira')) {
      const prod = SAMPLE_PRODUCTS.find(p => p.id === 'g1');
      return {
        text: lang === 'en'
          ? "Excellent choice. Our premium Dinajpur Kalijira (Chini Gura) parboiled rice is fully organic and incredibly fragrant. I've attached the item link for quick access:"
          : "চমৎকার পছন্দ! আমাদের দিনাজপুরের সুগন্ধি চিনিগুড়া কালিজিরা চাল অত্যন্ত প্রিমিয়াম এবং খাঁটি। এটি পোলাও, বিরিয়ানি ও পায়েসের স্বাদ বহুগুণ বাড়িয়ে দেয়। প্রোডাক্ট কার্ডটি নিচে যুক্ত করলাম:",
        product: prod
      };
    }

    // Matched 2: Mustard Tel
    if (query.includes('oil') || query.includes('tel') || query.includes('সরিষা') || query.includes('তেল')) {
      const prod = SAMPLE_PRODUCTS.find(p => p.id === 'g2');
      return {
        text: lang === 'en'
          ? "Our pure cold-pressed Mustard Oil (Khalis Shorishar Tel) is pressed using authentic wooden Ghani methods preserving full nutritional pungency. Perfect for making traditional Bangladeshi pickles!"
          : "আমাদের কাঠের ঘানি ভাঙা খাঁটি সরিষার তেল সম্পূর্ণ কেমিক্যাল মুক্ত এবং আসল ঝাঁঝালো স্বাদযুক্ত। জলপাই বা আমের আচার বানানোর জন্য এটি আইডিয়াল! প্রোডাক্ট কার্ডটি নিচে শেয়ার করলাম:",
        product: prod
      };
    }

    // Matched 3: Panjabi / Fashion
    if (query.includes('panjabi') || query.includes('fashion') || query.includes('dress') || query.includes('কাপড়') || query.includes('পাঞ্জাবি')) {
      const prod = SAMPLE_PRODUCTS.find(p => p.id === 'f1');
      return {
        text: lang === 'en'
          ? "Check out our gorgeous Handloom Jari-Stripe Dhupian Cotton Panjabi. Sourced with deep Aarong-style Campaign guidelines and comfortable tailoring for Bangladeshi festive occasions."
          : "তাঁত বুনন এবং সোনালী জরির স্ট্রাইপ ডিজাইন সমৃদ্ধ আমাদের কটন ধুপিয়ান পাঞ্জাবি উৎসবের সম্পূর্ণ রাজকীয় আভিজাত্য এনে দেয়। নিচে এর বিস্তারিত লিঙ্ক দিলাম:",
        product: prod
      };
    }

    // Matched 4: Sandalwood / Cosmetics
    if (query.includes('chondon') || query.includes('sandalwood') || query.includes('cosm') || query.includes('চন্দন') || query.includes('রূপচর্চা')) {
      const prod = SAMPLE_PRODUCTS.find(p => p.id === 'b1');
      return {
        text: lang === 'en'
          ? "Our triple-sifted Organic Sandalwood Powder (Chondon) is excellent for organic skin brightening and cooling down in sunny humid seasons. Chemical and additive-free!"
          : "রূপচর্চায় আমাদের অর্গানিক চন্দন গুঁড়া অত্যন্ত মিহি ও শতভাগ বিশুদ্ধ। এটি ত্বকের সতেজতা বাড়াতে প্রাকৃতিকভাবে দারুণ সাহায্য করে:",
        product: prod
      };
    }

    // Fallback general recommendations match
    const featured = SAMPLE_PRODUCTS.find(p => p.featured) || SAMPLE_PRODUCTS[0];
    return {
      text: lang === 'en'
        ? "I understand. I highly recommend taking a look at our featured product of the day! It has verified quality badges and is available for 3-hour fast shipping inside GEC Chattogram:"
        : "আমি বুঝতে পেরেছি। আপনার সুবিধার্থে আমাদের আজকের সর্বোচ্চ বিক্রিত ও বাছাইকৃত এই প্রিমিয়াম প্রোডাক্ট ড্রাইভারটি দেখার জন্য সাজেস্ট করছি:",
      product: featured
    };
  };

  const onRecommendCardClick = (p: Product) => {
    onSelectProduct(p);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Mini launcher trigger button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-[#0E5E4A] hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-2xl shadow-emerald-500/30 transition-all border border-emerald-400/20"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 rounded-full border border-white text-[10px] font-bold text-white flex items-center justify-center animate-pulse-slow">
              AI
            </span>
          </div>
        </button>
      )}

      {/* Expaned Chat Board dialog card container */}
      {isOpen && (
        <div className="w-[340px] md:w-[380px] h-[500px] bg-white rounded-3xl border border-gray-150 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-linear-to-r from-[#0E5E4A] to-emerald-800 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-left">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-orange-300" />
              </div>
              <div>
                <span className="font-title text-xs font-bold tracking-wide block uppercase">DM Smart Sourcing</span>
                <span className="text-[10px] text-emerald-200 block -mt-0.5">• Online Assistant</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages list center */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 no-scrollbar">
            {messages.map((m) => {
              const isAgent = m.sender === 'agent';
              return (
                <div key={m.id} className={`flex gap-2 text-xs text-left ${isAgent ? 'justify-start' : 'justify-end'}`}>
                  {isAgent && (
                    <div className="w-6 h-6 rounded-md bg-emerald-100 text-[#0E5E4A] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      AI
                    </div>
                  )}

                  <div className="space-y-2 max-w-[80%]">
                    <div className={`p-3 rounded-2xl ${
                      isAgent 
                        ? 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-xs' 
                        : 'bg-[#0E5E4A] text-white rounded-tr-none'
                    }`}>
                      <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                    </div>

                    {/* Interactive inline recommendation card */}
                    {isAgent && m.recommendedProduct && (
                      <div className="border border-gray-150 bg-white rounded-xl p-2.5 flex items-center gap-3 shadow-xs">
                        <img
                          src={m.recommendedProduct.image}
                          alt={m.recommendedProduct.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-50 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 
                            onClick={() => onRecommendCardClick(m.recommendedProduct!)}
                            className="font-bold text-[11px] text-charcoal truncate cursor-pointer hover:text-[#0E5E4A]"
                          >
                            {lang === 'en' ? m.recommendedProduct.name : (m.recommendedProduct.bnName || m.recommendedProduct.name)}
                          </h4>
                          <span className="text-[10px] font-semibold text-[#0E5E4A] block">৳{m.recommendedProduct.price} BDT</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(m.recommendedProduct!)}
                          className="w-7 h-7 rounded-lg bg-[#0E5E4A] hover:bg-[#0c503f] text-white flex items-center justify-center shrink-0 active:scale-95 transition-transform"
                          title="Quick add to basket"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={listEndRef} />
          </div>

          {/* Quick chip queries */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            {[
              { id: 'kalijira', text: lang === 'en' ? '🌾 Kalijira rice' : '🌾 কালিজিরা চাল' },
              { id: 'fashion', text: lang === 'en' ? '👗 Modern Fashion' : '👗 ফ্যাশন কামিজ' },
              { id: 'tel', text: lang === 'en' ? '🍶 Mustard Oil' : '🍶 সরিষার তেল' },
            ].map(chip => (
              <button
                key={chip.id}
                onClick={() => setInputValue(chip.text.replace(/🌾|👗|🍶\s*/g, ''))}
                className="bg-gray-120 hover:bg-emerald-50 hover:text-[#0E5E4A] text-[10px] font-semibold tracking-wide py-1 px-2.5 rounded-lg whitespace-nowrap shrink-0 border border-transparent hover:border-emerald-100 uppercase"
              >
                {chip.text}
              </button>
            ))}
          </div>

          {/* Text footer form fields */}
          <form onSubmit={handleSendMessage} className="p-3.5 bg-white border-t border-gray-150 flex gap-2 shrink-0">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={lang === 'en' ? "Ask about products, deliveries or stores..." : "গ্রোসারি সোর্সিং, ফ্যাশন বা গাড়ি সম্পর্কে জিজ্ঞাসা করুন..."}
              className="flex-1 bg-gray-50 border border-gray-250 text-xs rounded-xl py-2 px-3 focus:outline-hidden focus:bg-white text-charcoal font-semibold"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#0E5E4A] hover:bg-[#0c503f] text-white flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
