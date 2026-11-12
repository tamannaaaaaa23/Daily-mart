/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { User, ShieldAlert, Lock, ArrowRight, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface LoginViewProps {
  lang: 'en' | 'bn';
  onLoginSuccess: (role: 'user' | 'admin', email: string, name: string) => void;
}

export default function LoginView({ lang, onLoginSuccess }: LoginViewProps) {
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  
  // Custom form credentials state
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUserLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Quick validation
    if (!userEmail) {
      setErrorMsg(lang === 'en' ? 'Please enter a valid email address.' : 'অনুগ্রহ করে সঠিক ইমেইল আইডি দিন।');
      return;
    }
    
    // Accept anything for mock/demo, default to sample user Anisur Rahman
    const name = userEmail === 'anisur.gec@gmail.com' ? 'Anisur Rahman' : userEmail.split('@')[0];
    onLoginSuccess('user', userEmail, name);
  };

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (adminUsername.trim() === 'admin' && adminPassword === 'admin') {
      onLoginSuccess('admin', 'admin@dailymart.com', 'Daily Mart System Admin');
    } else {
      setErrorMsg(
        lang === 'en' 
          ? 'Invalid admin credentials. Use Username: "admin" and Password: "admin" to log in.' 
          : 'ভুল এডমিন আইডি বা পাসওয়ার্ড। ইউজারনেম: "admin" এবং পাসওয়ার্ড: "admin" ব্যবহার করুন।'
      );
    }
  };

  const loginAsDemoUser = () => {
    onLoginSuccess('user', 'anisur.gec@gmail.com', 'Anisur Rahman');
  };

  const loginAsDemoAdmin = () => {
    onLoginSuccess('admin', 'admin@dailymart.com', 'Daily Mart System Admin');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-left">
      <div className="text-center mb-10 space-y-2">
        <span className="text-[#0E5E4A] font-extrabold uppercase tracking-widest text-[10px] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/50 inline-block font-mono">
          {lang === 'en' ? 'AUTHENTICATION GATEWAY' : 'লগইন জোন'}
        </span>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900">
          {lang === 'en' ? 'Access Daily Mart Portal' : 'ডেইলিমার্ট অ্যাকাউন্টে প্রবেশ করুন'}
        </h2>
        <p className="text-gray-500 text-xs md:text-sm max-w-md mx-auto">
          {lang === 'en' ? 'Continue as our valued premium grocery customer or log in to administrative workspace.' : 'আপনার কাঙ্ক্ষিত পোর্টালে লগইন করতে সঠিক সেকশনটি নির্বাচন করুন।'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        {/* Left selector container */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#0E5E4A] to-[#123E32] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden border border-emerald-500/10">
          {/* subtle decorative blur */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-400/20 rounded-full blur-2xl"></div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-[10px] text-emerald-200 font-mono tracking-widest uppercase">Select Access Role</p>
              <h3 className="text-xl font-serif font-bold mt-1">
                {lang === 'en' ? 'Choose Section' : 'সেকশন নির্বাচন করুন'}
              </h3>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setActiveTab('user'); setErrorMsg(''); }}
                className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  activeTab === 'user'
                    ? 'bg-white text-[#0E5E4A] shadow-md font-bold'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'user' ? 'bg-emerald-50' : 'bg-white/10'}`}>
                  <User className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold">{lang === 'en' ? 'Customer Profile' : 'কাস্টমার প্রোফাইল'}</span>
                  <span className="block text-[10px] opacity-75">{lang === 'en' ? 'Order tracking & points' : 'অর্ডার ও রিওয়ার্ড ট্র্যাকিং'}</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('admin'); setErrorMsg(''); }}
                className={`w-full text-left p-4 rounded-2xl flex items-center gap-3 transition-all ${
                  activeTab === 'admin'
                    ? 'bg-white text-[#0E5E4A] shadow-md font-bold'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeTab === 'admin' ? 'bg-emerald-50' : 'bg-white/10'}`}>
                  <ShieldAlert className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="block text-xs font-semibold">{lang === 'en' ? 'Admin workspace' : 'এডমিন ওয়ার্কস্পেস'}</span>
                  <span className="block text-[10px] opacity-75">{lang === 'en' ? 'Manage products & stock' : 'প্রোডাক্ট ও স্টক ম্যানেজমেন্ট'}</span>
                </div>
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 relative z-10 space-y-3">
            <span className="text-[10px] uppercase font-mono text-emerald-200 tracking-wider block">Quick-Test Actions</span>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={loginAsDemoUser}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-xl text-[10px] text-center select-none cursor-pointer border border-white/5 transition-all"
              >
                Demo Customer
              </button>
              <button
                onClick={loginAsDemoAdmin}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-xl text-[10px] text-center select-none cursor-pointer transition-all shadow-sm"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Form container */}
        <div className="md:col-span-7 glass-panel rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-xs relative">
          
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs flex items-start gap-2 animate-in fade-in-50">
              <AlertCircle className="w-4.5 h-4.5 stroke-[2] shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            {activeTab === 'user' ? (
              <form onSubmit={handleUserLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-charcoal">{lang === 'en' ? 'Customer Sign In' : 'কাস্টমার লগইন'}</h3>
                  <p className="text-gray-400 text-xs">{lang === 'en' ? 'Access your orders history, wishlisted savings, and rewards.' : 'নিজের অর্ডার স্টেটাস, উইশলিস্ট ও লয়্যালটি পয়েন্ট দেখতে সাইন ইন করুন।'}</p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">{lang === 'en' ? 'Email Address' : 'ইমেইল এড্রেস'}</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anisur.gec@gmail.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full bg-white/70 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">{lang === 'en' ? 'Password' : 'পাসওয়ার্ড'}</label>
                    <div className="relative">
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        className="w-full bg-white/70 border border-gray-200 rounded-xl py-2.5 px-3.5 pl-10 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#0E5E4A] hover:bg-[#0c503f] text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-emerald-500/10"
                  >
                    <span>{lang === 'en' ? 'Log in to Customer Account' : 'লগইন কাস্টমার প্রোফাইল'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-charcoal">{lang === 'en' ? 'Admin Console' : 'এডমিন ড্যাশবোর্ড ল্যান্ডিং'}</h3>
                  <p className="text-gray-400 text-xs">
                    {lang === 'en' ? 'Manage product catalogues, update inventory stocks, add or drop items.' : 'ইনভেন্টরি প্রোডাক্টস ম্যানেজ ও স্টক আপডেট করতে সাইন ইন করুন।'}
                  </p>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Admin Username</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter 'admin'"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      className="w-full bg-white/70 border border-gray-200 rounded-xl py-2.5 px-3.5 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-gray-500 font-bold block">Security Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        placeholder="Enter 'admin'"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full bg-white/70 border border-gray-200 rounded-xl py-2.5 px-3.5 pl-10 text-xs font-semibold focus:outline-hidden focus:ring-1 focus:ring-[#0E5E4A] focus:border-[#0E5E4A] focus:bg-white text-charcoal shadow-inner"
                      />
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all shadow-md shadow-orange-500/10"
                  >
                    <span>{lang === 'en' ? 'Authenticate Security Admin' : 'সিকিউরিটি অ্যাডমিন লগইন'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-150 flex items-center gap-2 text-gray-450 text-[10px] select-none font-mono">
            <CheckCircle className="w-3.5 h-3.5 text-[#0E5E4A] shrink-0" />
            <span>Encrypted mock gateway. Daily Mart Premium Retailer System 1.4</span>
          </div>

        </div>
      </div>
    </div>
  );
}
