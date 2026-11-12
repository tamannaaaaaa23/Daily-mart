/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Vehicle } from '../types';

export const SAMPLE_VEHICLES: Vehicle[] = [
  // --- Rent ---
  {
    id: 'v1',
    type: 'Rent',
    vehicleType: 'Microbus',
    brand: 'Toyota',
    model: 'Hiace Super GL',
    year: 2018,
    mileage: 78000,
    price: 4500, // Per day in BDT
    fuelType: 'CNG',
    transmission: 'Automatic',
    seats: 12,
    location: 'Chattogram GEC Circle',
    features: [
      'Dual A/C with vents for every row',
      'Professional certified English/Bangla speaking chauffeur',
      'Spacious luggage rear compartment',
      'Sleek modern alloy wheels',
      'Tinted cooling windows'
    ],
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    sellerName: 'DailyMart Rent-A-Car Hub',
    sellerContact: '+8801711223344'
  },
  {
    id: 'v2',
    type: 'Rent',
    vehicleType: 'SUV',
    brand: 'Mitsubishi',
    model: 'Pajero Sport Active',
    year: 2019,
    mileage: 45000,
    price: 8500, // Per day in BDT
    fuelType: 'Octane',
    transmission: 'Automatic',
    seats: 7,
    location: 'Dhaka Banani Hub',
    features: [
      'Panoramic premium sunroof',
      '4WD Offroad capabilities',
      'Plush pristine leather upholstery',
      'Premium JBL Sound System',
      'Full collision protection insurance'
    ],
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    sellerName: 'DailyMart Elite Renting',
    sellerContact: '+8801811556677'
  },

  // --- Sale ---
  {
    id: 'v3',
    type: 'Sale',
    vehicleType: 'Car',
    brand: 'Toyota',
    model: 'Premio F-EX Package',
    year: 2017,
    mileage: 38200,
    price: 2850000, // BDT Sale price
    fuelType: 'Hybrid',
    transmission: 'Automatic',
    seats: 5,
    location: 'Chattogram Agrabad Showroom',
    features: [
      'Push button start ignition',
      'Full wooden panel trim package',
      'Bi-Xenon clear projecting headlights',
      'Auction grade 4.5 maintained',
      'Lane keeping assist safety autopilot'
    ],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600',
    sellerName: 'Haque Brothers Car Trade',
    sellerContact: '+8801911990088'
  },
  {
    id: 'v4',
    type: 'Sale',
    vehicleType: 'Motorcycle',
    brand: 'Yamaha',
    model: 'FZS Version 3.0 ABS',
    year: 2021,
    mileage: 12500,
    price: 265000, // BDT
    fuelType: 'Octane',
    transmission: 'Manual',
    seats: 2,
    location: 'Sylhet Ambarkhana',
    features: [
      'Single channel active ABS breaking',
      'Fuel Injector (FI) system',
      'Stylish fully digital instrument cluster',
      'Aftermarket custom exhaust guard installed',
      'Laminated spotless sticker wrapping'
    ],
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
    sellerName: 'Sakib Trading Motors',
    sellerContact: '+8801511223344'
  }
];
