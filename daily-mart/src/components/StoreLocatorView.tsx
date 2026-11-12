/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, Phone, Clock, Compass, Search, HelpCircle, Navigation, ParkingSquare, ShieldCheck } from 'lucide-react';

interface StoreLocatorViewProps {
  lang: 'en' | 'bn';
}

export default function StoreLocatorView({ lang }: StoreLocatorViewProps) {
  const outlets = [
    {
      id: 'out-1',
      name: 'Daily Mart GEC Flagship (Central Hub)',
      bnName: 'ডেইলিমার্ট জিইসি ফ্ল্যাগশিপ (প্রধান হাব)',
      address: 'Plot 4, Road 2, GEC Circle (Adjacent to GEC Convention), Chattogram, Bangladesh',
      phone: '+880 1711 223344',
      hours: '08:00 AM - 11:30 PM (Daily)',
      parking: 'Complementary basement customer parking available (30+ slots)',
      featured: true,
      coords: { x: 45, y: 65 }, // coordinate relative points
      image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'out-2',
      name: 'Daily Mart Banani Premium Sourcing',
      bnName: 'ডেইলিমার্ট বনানী প্রিমিয়াম সোর্সিং',
      address: 'Safura Tower Ground floor, Kemal Ataturk Avenue, Banani, Dhaka, Bangladesh',
      phone: '+880 1811 556677',
      hours: '09:00 AM - 11:00 PM (Daily)',
      parking: 'Standard street valet parking support on request',
      featured: false,
      coords: { x: 38, y: 35 },
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=600'
    },
    {
      id: 'out-3',
      name: 'Daily Mart Sylhet Ambarkhana Outlet',
      bnName: 'ডেইলিমার্ট আম্বরখানা আউটলেট',
      address: 'Mahanagar Mansion Level 1, Ambarkhana Point, Sylhet, Bangladesh',
      phone: '+880 1911 990088',
      hours: '10:00 AM - 10:00 PM (Daily)',
      parking: 'Rear multi-level public vehicle parking',
      featured: false,
      coords: { x: 75, y: 22 },
      image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=600'
    }
  ];

  const [selectedOutlet, setSelectedOutlet] = useState(outlets[0]);
  const [directionsStatusMsg, setDirectionsStatusMsg] = useState('');

  const triggerGetDirections = (storeName: string) => {
    setDirectionsStatusMsg(`Simulating navigation satellite handshake... Directions route to ${storeName} compiled and exported to your localized device map successfully!`);
    setTimeout(() => {
      setDirectionsStatusMsg('');
    }, 4500);
  };

  return (
    <div id="store-locator-view" className="max-w-7xl mx-auto py-8 px-4 font-sans text-charcoal">
      
      {/* Visual Intro */}
      <div className="mb-8 text-center md:text-left">
        <span className="text-[#D4AF37] font-semibold text-xs tracking-widest font-title uppercase">
          RETAIL STOREFRONT LOCATOR
        </span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#0E5E4A] mt-1">
          Daily Mart Store Locator
        </h1>
        <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xl">
          Locate your nearest premium offline shopping outlets in Bangladesh. Walk in to explore elite Aarong fashion campaigns and fresh parboiled rice collections physically.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: OUTLET PICKERS CARDS */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="border border-gray-150 rounded-2xl bg-gray-50 p-3 flex items-center gap-2.5 relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-6" />
            <span className="text-xs font-semibold text-gray-400 pl-10">Searching 3 Authorized Outlets...</span>
          </div>

          <div className="space-y-4">
            {outlets.map((outlet) => {
              const isSelected = selectedOutlet.id === outlet.id;
              return (
                <div
                  key={outlet.id}
                  onClick={() => setSelectedOutlet(outlet)}
                  className={`p-4 rounded-2xl border cursor-pointer select-none transition-all ${
                    isSelected
                      ? 'border-[#0E5E4A] bg-emerald-500/5 glass-panel scale-101 shadow-xs'
                      : 'border-gray-150/60 bg-white/60 hover:border-[#0E5E4A]/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      {outlet.featured && (
                        <span className="bg-[#D4AF37]/15 text-[#D4AF37] font-bold text-[8px] px-2 py-0.5 rounded-md uppercase tracking-wider font-title">
                          PRIMARY CENTRAL HUB
                        </span>
                      )}
                      <h4 className="font-semibold text-sm text-charcoal">
                        {lang === 'en' ? outlet.name : outlet.bnName}
                      </h4>
                    </div>
                    <MapPin className={`w-4 h-4 ${isSelected ? 'text-[#0E5E4A]' : 'text-gray-300'}`} />
                  </div>
                  
                  <p className="text-xs text-gray-500 leading-normal mt-2 line-clamp-2">{outlet.address}</p>
                  
                  <span className="block text-[10px] text-gray-400 mt-2.5 font-sans">Phone: {outlet.phone}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE MAP & DETAILS VIEW */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          {/* Interactive CSS satellite map layout block */}
          <div className="relative aspect-video rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl flex items-center justify-center">
            
            {/* Visual Grid representing streets / paths */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            {/* Outline vector paths representing Bangladesh Divisions Map */}
            <svg className="w-full h-full opacity-20 absolute inset-0 text-white" viewBox="0 0 400 300" fill="none">
              <path d="M150 50 C180 80, 220 120, 250 150 S300 220, 280 270 M80 120 C110 150, 160 180, 180 220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
              <rect x="50" y="30" width="100" height="90" rx="10" stroke="currentColor" strokeWidth="1" />
              <rect x="230" y="140" width="120" height="110" rx="12" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Simulated Live Compass indicator */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-2 flex items-center gap-2 text-white font-mono text-[9px] select-none">
              <Compass className="w-4 h-4 text-[#D4AF37] animate-spin-slow animate-pulse-slow" />
              <span>LOGISTICS COORDINATES ACTIVE</span>
            </div>

            {/* Static marker nodes */}
            {outlets.map((out) => {
              const isSelected = selectedOutlet.id === out.id;
              return (
                <div
                  key={out.id}
                  onClick={() => setSelectedOutlet(out)}
                  className="absolute cursor-pointer group transition-all"
                  style={{ left: `${out.coords.x}%`, top: `${out.coords.y}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    <div className={`w-3.5 h-3.5 rounded-full absolute animate-ping duration-1000 ${
                      isSelected ? 'bg-red-500' : 'bg-emerald-500/50'
                    }`} />
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center relative ${
                      isSelected ? 'bg-red-500' : 'bg-[#0E5E4A]'
                    }`}>
                      <span className="text-[7px] text-white font-bold font-title">DM</span>
                    </div>

                    {/* Hover labels inside vector board */}
                    <div className="absolute bottom-5 bg-black/85 text-[8px] text-white font-semibold py-1 px-2 rounded-md tracking-wide opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/15">
                      {lang === 'en' ? out.name : out.bnName}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Scale card */}
            <div className="absolute bottom-4 right-4 bg-black/55 backdrop-blur-md rounded-md border border-white/10 p-2 text-white text-[9px] font-mono select-none">
              <span>SATELLITE SCALE: 1 : 28,000</span>
            </div>
          </div>

          {/* Directions success modal */}
          {directionsStatusMsg && (
            <div className="p-4 bg-emerald-50 text-[#0E5E4A] border border-emerald-200/55 rounded-xl font-semibold flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#0E5E4A] shrink-0" />
              <p className="text-xs leading-normal">{directionsStatusMsg}</p>
            </div>
          )}

          {/* Sourcing location expanded statistics */}
          <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-xs flex flex-col md:flex-row gap-6 p-6 items-center">
            <img
              src={selectedOutlet.image}
              alt={selectedOutlet.name}
              className="w-full md:w-44 aspect-square rounded-2xl object-cover bg-gray-50 shrink-0 border border-gray-100"
              referrerPolicy="no-referrer"
            />

            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-charcoal">
                  {lang === 'en' ? selectedOutlet.name : selectedOutlet.bnName}
                </h3>
                <p className="text-xs text-gray-410">{selectedOutlet.address}</p>
              </div>

              {/* Specifications row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="space-y-0.5 text-left">
                  <span className="text-gray-400 block text-[8px] uppercase font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    HOURS DAILY
                  </span>
                  <span className="font-semibold text-charcoal text-[11px]">{selectedOutlet.hours}</span>
                </div>
                <div className="space-y-0.5 text-left border-l border-gray-200 pl-3">
                  <span className="text-gray-400 block text-[8px] uppercase font-mono flex items-center gap-1">
                    <ParkingSquare className="w-3 h-3 text-[#0E5E4A]" />
                    PARKING ACCESS
                  </span>
                  <span className="font-semibold text-charcoal text-[11px] leading-tight block">{selectedOutlet.parking}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => triggerGetDirections(selectedOutlet.name)}
                  className="bg-[#0E5E4A] hover:bg-[#0c503f] hover:shadow-lg hover:shadow-emerald-500/10 text-white text-xs font-bold uppercase tracking-wider py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>Request Live Directions Route</span>
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
