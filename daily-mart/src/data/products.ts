/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const SAMPLE_PRODUCTS: Product[] = [
  // --- 1. Grocery ---
  {
    id: 'g1',
    name: 'Premium Kalijira Rice (Aromatic Chini Gura)',
    bnName: 'প্রিমিয়াম কালিজিরা চাল (সুগন্ধি চিনিগুড়া)',
    category: 'Grocery',
    price: 165,
    discountPercent: 10,
    rating: 4.8,
    ratingCount: 142,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1536304997881-a372c179924b?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Traditionally parboiled, super aromatic Kalijira rice curated from organic farms in Dinajpur. Perfect for polao, biryani, and payesh.',
    bnDescription: 'দিনাজপুরের জৈব খামার থেকে উৎপাদিত সুগন্ধি চিনিগুড়া চাল। পোলাও, বিরিয়ানি এবং পায়েসের জন্য আদর্শ।',
    stock: 250,
    unit: 'kg',
    variants: [
      { id: 'g1-v1', name: '1 kg', priceOffset: 0, stock: 150 },
      { id: 'g1-v2', name: '5 kg Bulk', priceOffset: 620, stock: 100 }
    ],
    featured: true,
    flashSale: true,
    flashSaleStockMax: 100,
    flashSaleStockSold: 74,
    reviews: [
      { id: 'r1', userName: 'Rahat Chowdhury', rating: 5, comment: 'Excellent aroma! Polao turned out outstanding.', date: '2026-06-05', verified: true },
      { id: 'r2', userName: 'Anwara Begum', rating: 4, comment: 'Very clean rice, no stones found. Fragrance is authentic.', date: '2026-06-01', verified: true }
    ],
    specifications: {
      'Origin': 'Dinajpur, Bangladesh',
      'Quality Point': 'Grade A Aromatic',
      'Grain Size': 'Super Short-grain',
      'Moisture': 'Under 12%'
    }
  },
  {
    id: 'g2',
    name: 'Premium Mustard Oil (Khalis Ghani Shorishar Tel)',
    bnName: 'খাঁটি ঘানি ভাঙা সরিষার তেল',
    category: 'Grocery',
    price: 380,
    rating: 4.9,
    ratingCount: 98,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Cold-pressed under master supervision from selected local mustard seeds in a traditional wooden Ghani. Retains strong natural pungency and deep golden hue.',
    bnDescription: 'কাঠের ঘানি থেকে সরাসরি প্রস্তুতকৃত খাঁটি সরিষার তেল। প্রচণ্ড ঝাঁঝ এবং আসল পুষ্টিগুণ বজায় রাখে।',
    stock: 120,
    unit: 'litre',
    variants: [
      { id: 'g2-v1', name: '500 ml', priceOffset: -190, stock: 50 },
      { id: 'g2-v2', name: '1 Litre', priceOffset: 0, stock: 70 }
    ],
    featured: true,
    reviews: [
      { id: 'r3', userName: 'Sadman Alvi', rating: 5, comment: 'Perfect for making pickles and Jhalmuri. Real authentic pungency!', date: '2026-06-11', verified: true }
    ],
    specifications: {
      'Process': 'Cold Pressed Wood Ghani',
      'Seed Type': 'Deshi Yellow & Black Mustard',
      'Purity': '100% Pure',
      'Shelf Life': '12 Months'
    }
  },
  {
    id: 'g3',
    name: 'Organic Sundarbans Honey (Khalis Modhu)',
    bnName: 'সুন্দরবনের খাঁটি মধু',
    category: 'Grocery',
    price: 750,
    discountPercent: 15,
    rating: 4.7,
    ratingCount: 88,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Wild multi-floral honey harvested directly from the deep mangrove forests of Sundarbans of Bangladesh. Rich in antioxidants and absolute nature.',
    bnDescription: 'সুন্দরবনের গভীর ম্যানগ্রোভ বন থেকে সংগৃহীত প্রাকৃতিক মধু। এন্টিঅক্সিডেন্ট ও পুষ্টিগুণে ভরপুর।',
    stock: 80,
    unit: 'kg',
    variants: [
      { id: 'g3-v1', name: '250g jar', priceOffset: -450, stock: 40 },
      { id: 'g3-v2', name: '500g jar', priceOffset: -200, stock: 25 },
      { id: 'g3-v3', name: '1kg pack', priceOffset: 0, stock: 15 }
    ],
    flashSale: true,
    flashSaleStockMax: 50,
    flashSaleStockSold: 32,
    reviews: [
      { id: 'r4', userName: 'Nabila Karim', rating: 5, comment: 'Taste is slightly tangy indicating real honey from Sundarbans. Loving it!', date: '2026-05-24', verified: true }
    ],
    specifications: {
      'Location': 'Sundarbans Mangrove',
      'Type': 'Wild Khalisha flower major',
      'Moisture Content': '18.5%',
      'Additives': '0% No Sugar syrup'
    }
  },
  {
    id: 'g4',
    name: 'Finest Sreehatta Jasmine Black Tea',
    bnName: 'শ্রীহট্ট প্রিমিয়াম জুঁই কালো চা',
    category: 'Grocery',
    price: 290,
    discountPercent: 5,
    rating: 4.9,
    ratingCount: 64,
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Hand-picked premium orthodox black tea leaves from Sylhet gardens, infused with fresh therapeutic jasmine petals. Refreshing and deeply aromatic.',
    bnDescription: 'সিলেটের চা বাগান থেকে সংগৃহীত ফার্স্ট-ফ্লাশ ব্ল্যাক টি লিভস, প্রাকৃতিক ফ্রেশ জুঁই ফুলের পাপড়ি সমাহার সহ। প্রচণ্ড সতেজতাদায়ক।',
    stock: 140,
    unit: 'pack',
    variants: [
      { id: 'g4-v1', name: '250g Pack', priceOffset: 0, stock: 90 },
      { id: 'g4-v2', name: '500g Pack', priceOffset: 240, stock: 50 }
    ],
    reviews: [
      { id: 'rg4-1', userName: 'Taskeen Ahmed', rating: 5, comment: 'Simply beautiful aroma, takes away all fatigue after a long workday!', date: '2026-06-09', verified: true }
    ],
    specifications: {
      'Origin': 'Sreemangal, Sylhet',
      'Grade': 'OP (Orthodox Orange Pekoe)',
      'Aroma': 'Natural Floral Jasmine',
      'Harvest Season': 'First Flush'
    }
  },
  {
    id: 'g5',
    name: 'Pure Deshi Cow Ghee (Premium Pabna Fresh)',
    bnName: 'খাঁটি গাওয়া ঘি (পাবনা প্রিমিয়াম)',
    category: 'Grocery',
    price: 1350,
    rating: 4.9,
    ratingCount: 76,
    image: 'https://images.unsplash.com/photo-1631149162482-10a4f46e308c?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1631149162482-10a4f46e308c?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Exquisite Deshi country cow ghee boiled and clarified using legacy firewood stoves in Pabna. Imparts phenomenal aroma and golden grain texture to your kacchi, khichuri, and sweets.',
    bnDescription: 'পাবনার ঐতিহ্যবাহী কাঠের উনুনে প্রস্তুতকৃত শতভাগ গব্য ঘি। পোলাও, বিরিয়ানি ও খিচুড়ির স্বাদ ও সুবাস বদলে দেবে নিমেষেই।',
    stock: 90,
    unit: 'kg',
    variants: [
      { id: 'g5-v1', name: '400g glass jar', priceOffset: -750, stock: 50 },
      { id: 'g5-v2', name: '900g glass jar', priceOffset: 0, stock: 40 }
    ],
    reviews: [
      { id: 'rg5-1', userName: 'Mahtab Uddin', rating: 5, comment: 'The aroma is so distinct and granular texture is pristine. True Pabna taste.', date: '2026-06-13', verified: true }
    ],
    specifications: {
      'Origin': 'Pabna, Bangladesh',
      'Fat Content': '99.8% Milch Fat',
      'Boiling Style': 'Classic Firewood Vessel',
      'Preservatives': 'Zero Additives'
    }
  },

  // --- 2. Fashion ---
  {
    id: 'f1',
    name: 'Handloom Cotton Jari-Stripe Dhupian Panjabi',
    bnName: 'তাতঁ সুতি জারি-স্ট্রাইপ ধুপিয়ান পাঞ্জাবি',
    category: 'Fashion',
    price: 2450,
    discountPercent: 20,
    rating: 4.9,
    ratingCount: 220,
    image: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Artisanal handwoven lightweight cotton Panjabi blended with dynamic golden Jari stripe detailing. Tailored with modern regular fit and custom metallic shank buttons.',
    bnDescription: 'হস্তশিল্প তাঁত বোনা সুতি পাঞ্জাবি, সাথে সোনালী জরি সুতার স্ট্রাইপ ডিজাইন। আধুনিক রেগুলার ফিট এবং ধাতব বোতামের চমৎকার ফিনিশিং।',
    stock: 45,
    unit: 'pcs',
    variants: [
      { id: 'f1-v1', name: 'Size 40', priceOffset: 0, stock: 15 },
      { id: 'f1-v2', name: 'Size 42', priceOffset: 0, stock: 15 },
      { id: 'f1-v3', name: 'Size 44', priceOffset: 50, stock: 15 }
    ],
    featured: true,
    reviews: [
      { id: 'r5', userName: 'Adnan Sami', rating: 5, comment: 'Perfect fit! Quality of the weave is premium. Absolutely looks luxury.', date: '2026-06-12', verified: true }
    ],
    specifications: {
      'Fabric': '80% Premium Handloom Cotton, 20% Dhupian Silk blend',
      'Weave Pattern': 'Jari Stripe detailing',
      'Length': 'Knee length',
      'Care': 'Dry clean recommended'
    }
  },
  {
    id: 'f2',
    name: 'Pure Georgette Embodied Premium Festive Kamiz Set',
    bnName: 'প্রিমিয়াম উৎসব জর্জেট কামিজ সেট',
    category: 'Fashion',
    price: 4950,
    rating: 4.8,
    ratingCount: 112,
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Rich, floating Georgette base embellished with modern Nakshi embroidery along panels. Accompanied by a pure organza dupatta detailing luxury gold lace.',
    bnDescription: 'প্রিমিয়াম জর্জেট কামিজ সেট, চমৎকার নকশিকাঁথা কাজের এমব্রয়ডারি ডিজাইন সহ এবং অর্গানজা ওড়না।',
    stock: 20,
    unit: 'set',
    variants: [
      { id: 'f2-v1', name: 'Medium size', priceOffset: 0, stock: 10 },
      { id: 'f2-v2', name: 'Large size', priceOffset: 100, stock: 10 }
    ],
    reviews: [
      { id: 'r6', userName: 'Tasnima Rahman', rating: 5, comment: 'A stunning set. Got so many compliments on Eid evening. Worth every BDT.', date: '2026-05-30', verified: true }
    ],
    specifications: {
      'Top Fabric': 'Pure Fine Georgette',
      'Dupatta': 'Organza with gold laces',
      'Embroidery': 'Zardosi & Resham hand stitching',
      'Fit': 'Semi-stitched / A-line layout'
    }
  },
  {
    id: 'f3',
    name: 'Authentic Handwoven Tangail Jamdani Saree',
    bnName: 'টাঙ্গাইলের ঐতিহ্যবাহী জামদানি শাড়ি',
    category: 'Fashion',
    price: 7800,
    rating: 4.9,
    ratingCount: 84,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'A masterpiece from Tangail loom. Exquisitely hand-guided cotton-silk threads weave timeless subcontinental geometric motifs representing heritage.',
    bnDescription: 'টাঙ্গাইলের তাঁতের কারিগরদের অনবদ্য সৃষ্টি। সুতি ও রেশম সুতার নিখুঁত সমন্বয়ে বোনা জমকালো জামদানি নকশা শাড়ি।',
    stock: 15,
    unit: 'pcs',
    variants: [
      { id: 'f3-v1', name: '84 Count Premium', priceOffset: 0, stock: 15 }
    ],
    reviews: [
      { id: 'rf3-1', userName: 'Sumaiya Khan', rating: 5, comment: 'Extremely soft fabric and very lightweight. Perfect for wedding receptions!', date: '2026-06-08', verified: true }
    ],
    specifications: {
      'Weaving Type': 'Handloom Jamdani Weave',
      'Count': '84 Count Fine Silk-Cotton',
      'Origin': 'Tangail, Bangladesh',
      'Size': '12 Cubit (6 yards) standard'
    }
  },

  // --- 3. Electronics ---
  {
    id: 'e1',
    name: 'DailyMart Smart Air Multiplier Tower Fan',
    bnName: 'ডেইলিমার্ট স্মার্ট টাওয়ার ফ্যান',
    category: 'Electronics',
    price: 8900,
    discountPercent: 12,
    rating: 4.6,
    ratingCount: 57,
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Bladeless intelligent cooling hub featuring remote control, active HEPA air filtration filter, and oscillation modes designed to navigate Bangladeshi humid summers gracefully.',
    bnDescription: 'ব্লেডবিহীন ইন্টেলিজেন্ট কুলিং ফ্যান, সাথে রিমোট কন্ট্রোল এবং হেপা ফিল্টার এয়ার পিউরিফায়ার যুক্ত।',
    stock: 35,
    unit: 'pcs',
    variants: [
      { id: 'e1-v1', name: 'Standard Charcoal', priceOffset: 0, stock: 20 },
      { id: 'e1-v2', name: 'Sleek Platinum Gold', priceOffset: 600, stock: 15 }
    ],
    featured: true,
    flashSale: true,
    flashSaleStockMax: 15,
    flashSaleStockSold: 8,
    reviews: [
      { id: 'r7', userName: 'Ziaul Hoque', rating: 4, comment: 'Very quiet and filters the dust nicely. Essential for Chattogram central apartments.', date: '2026-06-08', verified: true }
    ],
    specifications: {
      'Fan Style': 'Bladeless Air Multiplier',
      'Power Watt': '45 Watts Energy Saver',
      'Noise Levels': 'Under 35 dB',
      'Warranty': '2 Year Reputable Brand Warranty'
    }
  },
  {
    id: 'e2',
    name: 'Multi-Device Fast Wireless Powerbank 20000mAh',
    bnName: 'ফাস্ট ওয়্যারলেস পাওয়ার ব্যাংক ২০০০০mAh',
    category: 'Electronics',
    price: 3200,
    discountPercent: 5,
    rating: 4.7,
    ratingCount: 189,
    image: 'https://images.unsplash.com/photo-1609592424109-dd77894371fa?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1609592424109-dd77894371fa?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'High capacity 22.5W Power Delivery powerbank supporting active Qi wireless charging. Back-up and load-shedding lifesaver.',
    bnDescription: 'উচ্চ ক্ষমতাসম্পন্ন ২২.৫ ওয়াট পাওয়ার ব্যাংক যা কিউআই ওয়্যারলেস চার্জিং সাপোর্ট করে। লোডশেডিংয়ের সেরা সমাধান।',
    stock: 140,
    unit: 'pcs',
    reviews: [
      { id: 'r8', userName: 'Imran Sakib', rating: 5, comment: 'Charges my phone really fast. Solid premium matte body.', date: '2026-06-10', verified: true }
    ],
    specifications: {
      'Capacity': '20,000 mAh Lithium Polymer',
      'Output Ports': '2x USB-A, 1x Type-C bidirectional',
      'Charging Protocol': 'PD 3.0 & QC 4.0 fast-charge',
      'Security': 'IC Smart Overcharge Safeguard'
    }
  },
  {
    id: 'e3',
    name: 'Active ANC Wireless Stereo Earbuds (Pulse X)',
    bnName: 'অ্যাক্টিভ নয়েজ ক্যান্সেলিং ইয়ারবাডস (পালস এক্স)',
    category: 'Electronics',
    price: 2900,
    rating: 4.8,
    ratingCount: 134,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'True Wireless Audio featuring 32dB Hybrid Active Noise Cancellation, waterproof nano coat, and stellar 40-hour deep bass playback cycle.',
    bnDescription: 'হাইব্রিড নয়েজ ক্যান্সেলিং এয়ারবাডস, আইপিএক্স৫ ওয়াটারপ্রুফ রেটিং এবং দীর্ঘ ৪০ ঘণ্টার ব্যাটারি ব্যাকআপ সহ।',
    stock: 85,
    unit: 'pcs',
    reviews: [
      { id: 're3-1', userName: 'Tanvir Hossain', rating: 5, comment: 'Active noise cancellation works extremely well in heavy traffic. Highly recommended!', date: '2026-06-14', verified: true }
    ],
    specifications: {
      'ANC Rating': 'Up to 32dB Active Shield',
      'Bluetooth Version': '5.3 Audio low-latency',
      'Playtime': '10 Hrs Buds, 40 Hrs Case',
      'Waterproof': 'IPX5 Sweat & Rain Shield'
    }
  },

  // --- 4. Home & Living ---
  {
    id: 'h1',
    name: 'Brass Handcrafted Nakshi Tea Pot & Traditional Cups',
    bnName: 'पितल নকশাকৃত কেটলি ও ঐতিহ্যবাহী কাপ সেট',
    category: 'Home & Living',
    price: 3500,
    rating: 4.9,
    ratingCount: 34,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Exquisitely hand-embossed brass tea set with 1 teapot and 6 matching traditional heavy brass cups made by master metalsmiths in Nawabpur.',
    bnDescription: 'নবাবপুরের ধাতব কারিগর দ্বারা হাতের নিখুঁত নকশায় তৈরি হেভি ব্রাস কেটলি ও ৬টি কাপ বিশিষ্ট রাজকীয় টি সেট।',
    stock: 12,
    unit: 'set',
    reviews: [
      { id: 'r9', userName: 'Mehrab Kabir', rating: 5, comment: 'Looks absolute royal. Displays perfectly in our living room cabinet and makes tea guesting special.', date: '2026-05-18', verified: true }
    ],
    specifications: {
      'Metal': '100% Solid Heavy Brass',
      'Handcrafting Style': 'Nakshi hand etching',
      'Set Package': '1 Teapot, 6 Cups',
      'Weight': '1.8 kg Solid'
    }
  },
  {
    id: 'h2',
    name: 'Artisan Woven Braided Bengal Jute Area Rug',
    bnName: 'কারুশিল্প বোনা সোনালী আঁশের পাট কার্পেট',
    category: 'Home & Living',
    price: 1850,
    discountPercent: 10,
    rating: 4.7,
    ratingCount: 42,
    image: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Beautiful textured circle area rug made of 100% organic local golden jute fibers. Bio-degredable, durable, and handcrafted at Savar craft centers.',
    bnDescription: 'শতভাগ পরিবেশবান্ধব সোনালী আঁশের তৈরি সুদৃশ্য গোলাকার পাটের কার্পেট। সাভারের হস্তশিল্পীদের নিখুঁত বুনোন।',
    stock: 30,
    unit: 'pcs',
    variants: [
      { id: 'h2-v1', name: '4 Feet Circle', priceOffset: 0, stock: 20 },
      { id: 'h2-v2', name: '6 Feet Circle', priceOffset: 950, stock: 10 }
    ],
    reviews: [
      { id: 'rh2-1', userName: 'Niloufer Yasmin', rating: 5, comment: 'Very high quality jute, doesn\'t shred, looks lovely on my wooden flooring.', date: '2026-06-11', verified: true }
    ],
    specifications: {
      'Material': '100% Premium Eco Jute Fiber',
      'Weaving Style': 'Braided Ribbed spiral pattern',
      'Origin': 'Savar Craft Center, Bangladesh',
      'Thickness': '10mm Heavy Duty'
    }
  },

  // --- 5. Beauty ---
  {
    id: 'b1',
    name: 'Premium Organic Sandalwood Powder (Chondon)',
    bnName: 'অর্গানিক খাঁটি চন্দন গুঁড়া',
    category: 'Beauty',
    price: 450,
    discountPercent: 15,
    rating: 4.8,
    ratingCount: 201,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Highly triple-sifted aromatic organic Red Sandalwood powder curated for absolute skin brightness, cooling, and ancient herbal face packaging.',
    bnDescription: 'রূপচর্চার জন্য শতভাগ বিশুদ্ধ চন্দন কাঠের মিহি গুঁড়ো। ত্বকের উজ্জ্বলতা ও সতেজতায় অনন্য।',
    stock: 95,
    unit: 'pack',
    variants: [
      { id: 'b1-v1', name: '100g pack', priceOffset: 0, stock: 50 },
      { id: 'b1-v2', name: '250g jar', priceOffset: 550, stock: 45 }
    ],
    reviews: [
      { id: 'r10', userName: 'Fariha Jannat', rating: 5, comment: 'Extremely fresh and smells pure. Helps cool down sunburns in summer!', date: '2026-06-03', verified: false }
    ],
    specifications: {
      'Botanical Name': 'Santalum album',
      'Formulation': '100% Raw Powdered Wood',
      'Admixtures': 'Preservative and fragrance free',
      'Skin Type': 'All skin types'
    }
  },
  {
    id: 'b2',
    name: 'Saffron & Gold Leaf Glow Brightening Day Serum',
    bnName: 'জাফরান ও স্বর্ণালি গ্লো ব্রাইটেনিং সেরাম',
    category: 'Beauty',
    price: 1850,
    rating: 4.9,
    ratingCount: 88,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Enriched with premium Kashmiri Saffron extract and 24K real gold dust flakes to actively eliminate pigmentation and bestow timeless glow.',
    bnDescription: 'প্রিমিয়াম কাশ্মীরি জাফরান ও ২৪ ক্যারেট গোল্ড লিফ সমৃদ্ধ ফেস সেরাম, যা ডার্ক সার্কেল দূর করে ত্বককে নিখুঁত উজ্জ্বলতা দেয়।',
    stock: 40,
    unit: 'pcs',
    reviews: [
      { id: 'rb2-1', userName: 'Zarin Subah', rating: 5, comment: 'Best serum ever. Replaced my expensive Korean imports!', date: '2026-06-12', verified: true }
    ],
    specifications: {
      'Ingredients': 'Kashmiri Saffron, 24K Gold Flakes, Rosehip Oil',
      'Volume': '30 ml glass dropper bottle',
      'Cruelty Free': 'Yes 100% Vegan',
      'Parabens': '0% Paraben Free'
    }
  },

  // --- 6. Baby Care ---
  {
    id: 'ba1',
    name: 'Organic Bamboo Fiber Super-Soft Baby Overalls',
    bnName: 'অর্গানিক বাঁশের সুতার নরম বেবি ওভারঅল',
    category: 'Baby Care',
    price: 850,
    discountPercent: 10,
    rating: 4.9,
    ratingCount: 62,
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eb2?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1519689680058-324335c77eb2?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Hypoallergenic infant romper crafted with certified organic bamboo fabrics. Keeps babies beautifully cool in Bangladesh summer heat.',
    bnDescription: 'শিশুদের সংবেদনশীল ত্বকের জন্য শতভাগ নিরাপদ অর্গানিক বাঁশের ফাইবার দিয়ে তৈরি আরামদায়ক পোশাক।',
    stock: 65,
    unit: 'pcs',
    variants: [
      { id: 'ba1-v1', name: '0-3 Months', priceOffset: 0, stock: 25 },
      { id: 'ba1-v2', name: '3-6 Months', priceOffset: 50, stock: 20 },
      { id: 'ba1-v3', name: '6-12 Months', priceOffset: 100, stock: 20 }
    ],
    reviews: [
      { id: 'rba1-1', userName: 'Sabina Sultana', rating: 5, comment: 'So incredibly soft! My baby feels extremely comfortable in it.', date: '2026-06-03', verified: true }
    ],
    specifications: {
      'Fabric Material': '95% Bamboo Viscose, 5% Elasthane',
      'Breathability': 'High Heat-Regulating Class',
      'Dye style': 'Non-toxic Eco Pigments',
      'Wash Care': 'Gentle handwash'
    }
  },
  {
    id: 'ba2',
    name: 'Gentle Chamomile No-Tears Baby wash',
    bnName: 'ক্যামোমাইল নো-টিয়ার্স কোমল বেবি ওয়াশ',
    category: 'Baby Care',
    price: 620,
    rating: 4.8,
    ratingCount: 45,
    image: 'https://images.unsplash.com/photo-1515488042361-404e92539b20?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1515488042361-404e92539b20?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Ph-balanced infant head-to-toe gentle wash integrated with organic Roman Chamomile essential oil. Certified 100% tear-free formulation.',
    bnDescription: 'শিশুর চুল ও ত্বকের যত্নে ক্যামোমাইল এক্সট্র্যাক্টযুক্ত টিয়ার-ফ্রি ও পিএইচ সুষম কোমল শাওয়ার জেল।',
    stock: 120,
    unit: 'bottle',
    reviews: [
      { id: 'rba2-1', userName: 'Rafiya Begum', rating: 5, comment: 'Delicious subtle fragrance. Leaves skin beautifully hydrated.', date: '2026-06-01', verified: true }
    ],
    specifications: {
      'Volume': '250 ml Pump Dispensing flask',
      'pH Balance': 'Slightly Acidic 5.5 Spec',
      'Active Botonicals': 'Roman Chamomile & Oat Kernels',
      'Chemicals': 'Free from Sulfates & Phthalates'
    }
  },

  // --- 7. Sports ---
  {
    id: 's1',
    name: 'Pro Kashmir Willow Hard-Tennis Cricket Bat',
    bnName: 'প্রো কাশ্মীর উইলো হার্ড-টেনিস ক্রিকেট ব্যাট',
    category: 'Sports',
    price: 2450,
    discountPercent: 12,
    rating: 4.7,
    ratingCount: 153,
    image: 'https://images.unsplash.com/photo-1531415050242-0b171350041d?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1531415050242-0b171350041d?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Individually pressed Kashmir willow bats designed specifically for hard tape-tennis cricket leagues. Imparts explosive drive rebound power.',
    bnDescription: 'পেশাদার ক্রিকেট খেলার জন্য দারুণ ব্যালেন্সড আসল কাশ্মীরি উইলো কাঠের তৈরি চমৎকার ক্রিকেট ব্যাট।',
    stock: 40,
    unit: 'pcs',
    variants: [
      { id: 's1-v1', name: 'Short Handle', priceOffset: 0, stock: 25 },
      { id: 's1-v2', name: 'Long Handle', priceOffset: 150, stock: 15 }
    ],
    reviews: [
      { id: 'rs1-1', userName: 'Naimyul Haque', rating: 5, comment: 'Perfect sweet spot and awesome handle grip. Hit so many sixes already!', date: '2026-06-10', verified: true }
    ],
    specifications: {
      'Wood Class': 'Grade 1 Selected Kashmir Willow',
      'Weight': '1150g - 1200g Balanced',
      'Swell depth': '40mm Premium Spines',
      'Handle': 'Singapore Cane Tri-piece'
    }
  },
  {
    id: 's2',
    name: 'Premium High-Density NBR Pro Yoga Mat',
    bnName: 'প্রিমিয়াম হাই-ডেনসিটি যোগব্যায়াম ইয়োগা ম্যাট',
    category: 'Sports',
    price: 1350,
    rating: 4.8,
    ratingCount: 91,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Eco-conscious non-slip active exercise mat featuring 8mm high cushioned thickness. Protects joints and knees during intensive home routines.',
    bnDescription: '৮মিমি নিখুঁত কুশনিং সমৃদ্ধ পরিবেশবান্ধব অ্যান্টি-স্লিপ ইয়োগা ম্যাট। পিঠ, কনুই ও হাঁটুর আঘাত থেকে সুরক্ষা দেয়।',
    stock: 75,
    unit: 'pcs',
    reviews: [
      { id: 'rs2-1', userName: 'Nadia Siffat', rating: 5, comment: 'Nice thick cushion, doesn\'t slip on titles. Comes with a carrying strap.', date: '2026-06-05', verified: true }
    ],
    specifications: {
      'Thickness': '8mm Triple Density Cushioning',
      'Dimensions': '72 inches x 24 inches regular',
      'Material': 'Odorless High-Density Eco NBR',
      'Accessories': 'Comes with polyester carry harness'
    }
  },

  // --- 8. Stationery ---
  {
    id: 'st1',
    name: 'Handcrafted Genuine Leather Journal Book',
    bnName: 'হস্তশিল্প খাঁটি চামড়ার ডায়েরি বুক',
    category: 'Stationery',
    price: 1450,
    discountPercent: 15,
    rating: 4.9,
    ratingCount: 48,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Rustic hand-sewn journal covered with premium oil-pullup Bangladeshi leather. Fitted with 120gsm bleeding-resistant parchment sheets.',
    bnDescription: 'খাঁটি দেশি চামড়া দিয়ে ঢাকা নান্দনিক হস্তশিল্প রুল ট্রি পার্চমেন্ট ডায়েরি। দারুণ উপহার সামগ্রী।',
    stock: 35,
    unit: 'pcs',
    reviews: [
      { id: 'rst1-1', userName: 'Asif Murtaza', rating: 5, comment: 'The smell of the real leather is so classic! Paper quality is great for fountain pens too.', date: '2026-06-04', verified: true }
    ],
    specifications: {
      'Cover Coat': '100% Genuine Bangladeshi Leather',
      'Paper Weight': '120 gsm Acid-Free archival parchment',
      'Page Count': '240 Unruled Pages',
      'Binding Type': 'Sturdy Long-stitch wax thread sewn'
    }
  },
  {
    id: 'st2',
    name: 'Elegant Classic Lacquered Fountain Pen Set',
    bnName: 'ক্যালোগ্রাফি ক্যালাসিক ফাউন্টেন পেন সেট',
    category: 'Stationery',
    price: 1850,
    rating: 4.8,
    ratingCount: 39,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Professional high-grade fountain pen and calligraphy adapter ink well. Lacquered metal body featuring 24K gold-plated iridium fine nib.',
    bnDescription: 'অভিজাত মেটাল বডি ফাউন্টেন পেন সেট, ২৪ ক্যারেট গোল্ড প্লেটেড ফাস্ট-ফ্লো রাইটিং নিব সহ।',
    stock: 25,
    unit: 'set',
    reviews: [
      { id: 'rst2-1', userName: 'Waseeq Billah', rating: 5, comment: 'Writes beautifully and flows seamlessly. Looks like an expensive collector’s item!', date: '2026-05-29', verified: true }
    ],
    specifications: {
      'Nib Size': '0.5mm Iridium Fine Point',
      'Body Frame': 'Lacquered Brass with Gold Trim Accent',
      'Ink System': 'Piston Converter Included (Bottled Ink compatible)',
      'Box': 'Handcrafted velvet collection case'
    }
  },

  // --- 9. Pet Care ---
  {
    id: 'p1',
    name: 'Premium Salmon Grain-Free Special Cat Food',
    bnName: 'প্রিমিয়াম সালমন শস্য-মুক্ত বিড়ালের খাবার',
    category: 'Pet Care',
    price: 950,
    discountPercent: 10,
    rating: 4.9,
    ratingCount: 112,
    image: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Highly digestible grain-free formula boasting real Alaskan Salmon meat, rich in omega oils to nourish coat shine, skin safety, and robust immune health.',
    bnDescription: 'বিড়ালের উজ্জ্বল লোমের জন্য ওমেগা অয়েল এবং আলস্কান সালমন সমৃদ্ধ পুষ্টিকর শস্য-মুক্ত ক্যাট ফুড।',
    stock: 140,
    unit: 'pack',
    variants: [
      { id: 'p1-v1', name: '1.2 kg Pack', priceOffset: 0, stock: 100 },
      { id: 'p1-v2', name: '3 kg Eco Bag', priceOffset: 1250, stock: 40 }
    ],
    reviews: [
      { id: 'rp1-1', userName: 'Jannat Ava', rating: 5, comment: 'My Persian cats absolutely love this. Their hair shedding is visibly reduced!', date: '2026-06-11', verified: true }
    ],
    specifications: {
      'Protein source': '34% Pure Salmon & Whitefish meal',
      'Fat': '15% Crude Fat with Omega 3 & 6',
      'Grain Content': '0% Soy, Wheat, Corn Free',
      'Age Level': 'All Life Stages (Kittens & Adult Cats)'
    }
  },
  {
    id: 'p2',
    name: 'Multi-Level Cat Climbing Tree with Scratching Post',
    bnName: 'মাল্টি-লেভেল ক্যাট স্ক্র্যাচিং ও ক্লাইম্বিং প্লে হাউস',
    category: 'Pet Care',
    price: 3900,
    rating: 4.7,
    ratingCount: 31,
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Tall luxury cat playground fitted with organic sisal fiber scratching columns, cozy plush observation towers, and suspended hanging visual toys.',
    bnDescription: 'প্রাকৃতিক সিসাল ফাইবার ও নরম প্লাশ কাপড়ে মোড়ানো বিড়ালের খেলার ও নখ আঁচড়ানোর জন্য ৫-ফিট মাল্টি-লেভেল হাউজ।',
    stock: 15,
    unit: 'pcs',
    reviews: [
      { id: 'rp2-1', userName: 'Farhan Adil', rating: 5, comment: 'Very sturdy build. My kitten spends the entire day climbing it and doesn\'t scratch the sofa anymore.', date: '2026-06-03', verified: false }
    ],
    specifications: {
      'Height': '138 cm (approx 54 inches) Elite Play Tower',
      'Pillars Coating': '100% Biodegradable Sisal Fibers',
      'Frame Base': 'Thicken Carb Phase 2 engineered wood',
      'Platforms': '2 Plush watch towers, 1 cozy bedroom cube'
    }
  }
];
