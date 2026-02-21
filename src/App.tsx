/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Zap,
  MessageCircle,
  Twitter,
  Menu,
  X,
  Eye,
  Mail
} from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/stats/views')
      .then(res => res.json())
      .then(data => setViewCount(data.views))
      .catch(err => console.error('Error fetching views:', err));
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Groups', href: '#groups' },
    { name: 'Rules', href: '#rules' },
    { name: 'Leadership', href: '#leadership' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] text-white font-sans selection:bg-[#7A3CFF]/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0B0F14]/80 backdrop-blur-md border-b border-white/5 px-5 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#2E9BFF]" />
            <span className="font-bold tracking-tighter text-lg">VERSE HUB</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="text-sm font-bold uppercase tracking-widest hover:text-[#7A3CFF] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {viewCount !== null && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400">
                <Eye className="w-3.5 h-3.5" />
                <span>{viewCount.toLocaleString()}</span>
              </div>
            )}
            <button 
              className="sm:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-[#0B0F14] border-b border-white/5 py-6 px-5 flex flex-col gap-6 animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-bold uppercase tracking-widest hover:text-[#7A3CFF] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Header / Home Page */}
      <header className="text-center py-16 px-5">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#2E9BFF] via-[#7A3CFF] to-[#FF2FD8] flex items-center justify-center shadow-lg shadow-[#7A3CFF]/20">
            <Zap className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tight">Verse Groups Hub</h1>
        <p className="text-lg lg:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
          Official directory of all Verse community divisions. Discover all groups, leaders, and responsibilities.
        </p>
        <a href="#groups" className="inline-block px-8 py-3 font-bold rounded-lg bg-gradient-to-r from-[#2E9BFF] via-[#7A3CFF] to-[#FF2FD8] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[#7A3CFF]/20">
          View Groups
        </a>
      </header>

      {/* Groups Page */}
      <section id="groups" className="py-12 px-5 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Verse Groups Directory</h2>

        <div className="space-y-6">
          {[
            { name: "VERSE", leader: "JT (General Group)", link: "https://t.me/GetVerse/177601" },
            { name: "NEWBIES (START HERE)", leader: "@Sadikufav", link: "https://t.me/GetVerse/387150" },
            { name: "VIBE CODING WITH VERSE", leader: "@Sadikufav", link: "https://t.me/GetVerse/486213" },
            { name: "VERSE RECRUITMENT (SOCIAL)", leader: "@Fav0ur10", link: "https://t.me/GetVerse/395236" },
            { name: "VERSE CORRESPONDENT", leader: "JT", link: "https://t.me/GetVerse/487889" },
            { name: "VERSE BANGLADESH", leader: "@ArifHassan6", link: "https://t.me/GetVerse/443294" },
            { name: "VERSE INDIA", leader: "@OoriS88", link: "https://t.me/GetVerse/393276" },
            { name: "VERSE EGYPT", leader: "@Skeisa", link: "https://t.me/GetVerse/440677" },
            { name: "VERSE RESEARCH", leader: "JT", link: "https://t.me/GetVerse/476423" },
            { name: "VERSE NIGERIA", leader: "@Chibykezueme", link: "https://t.me/GetVerse/379642" },
            { name: "VERSE HQ", leader: "JT", link: "https://t.me/GetVerse/384690" },
            { name: "VERSE CITY", leader: "JT", link: "https://t.me/GetVerse/379189" },
            { name: "VERSE GAME DEV HOUSE", leader: "JT", sub: "Boss of Community Conduct", link: "https://t.me/GetVerse/379189" },
            { name: "VERSE URDU", leader: "@IamFHG", link: "https://t.me/GetVerse/378951" },
            { name: "VERSE GHANA", leader: "@Mannielli", link: "https://t.me/GetVerse/395199" },
            { name: "APP REWARDS DISCUSSION", leader: "@shojib1122334", link: "https://t.me/GetVerse/373378" },
            { name: "VIBE", link: "https://t.me/GetVerse/355506" }
          ].map((group, idx) => (
            <div key={idx} className="bg-[#121620] p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all">
              <h3 className="text-xl font-bold mb-2">{group.name}</h3>
              {group.leader && <p className="text-zinc-400 mb-1">Leader: {group.leader}</p>}
              {group.sub && <p className="text-zinc-500 text-sm mb-4 italic">{group.sub}</p>}
              <a 
                href={group.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-2.5 mt-2 font-bold rounded-lg bg-gradient-to-r from-[#2E9BFF] via-[#7A3CFF] to-[#FF2FD8] hover:opacity-90 transition-all active:scale-95 text-sm"
              >
                <Send className="w-4 h-4" /> Join Telegram
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Rules Page */}
      <section id="rules" className="py-12 px-5 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Community Rules</h2>
        <div className="bg-[#121620] p-8 rounded-xl border border-white/5">
          <ul className="space-y-4 text-lg text-zinc-300 list-disc pl-6">
            <li>No spam</li>
            <li>No WEN questions</li>
            <li>No AI misuse</li>
            <li>Respect leadership</li>
          </ul>
        </div>
      </section>

      {/* Leadership Page */}
      <section id="leadership" className="py-12 px-5 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Leadership</h2>
        <div className="bg-[#121620] p-6 rounded-xl border border-white/5">
          <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">BOSS OF VERSE COMMUNITY CONDUCT</h3>
          <p className="text-zinc-400 mb-4">Leader: @Jessymia0505</p>
          <a 
            href="https://t.me/GetVerse/177601" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 px-6 py-2.5 font-bold rounded-lg bg-gradient-to-r from-[#2E9BFF] via-[#7A3CFF] to-[#FF2FD8] hover:opacity-90 transition-all active:scale-95 text-sm"
          >
            <Send className="w-4 h-4" /> Join Telegram
          </a>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-16 px-5 text-center bg-[#0B0F14] border-t border-white/5">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <div className="max-w-xl mx-auto space-y-8">
          <div className="bg-[#121620] p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex flex-col items-center gap-2">
              <p className="text-zinc-400">Join our main Verse Telegram group:</p>
              <a 
                href="https://t.me/GetVerse/177601" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 px-8 py-3 font-bold rounded-lg bg-gradient-to-r from-[#2E9BFF] via-[#7A3CFF] to-[#FF2FD8] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-[#7A3CFF]/20"
              >
                <MessageCircle className="w-5 h-5" /> Join Telegram
              </a>
            </div>

            <div className="h-px bg-white/5 w-full" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="flex flex-col items-center gap-2">
                <p className="text-zinc-500 text-sm">Telegram Admin</p>
                <a 
                  href="https://t.me/Jessymia0505" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-[#2E9BFF] hover:underline font-medium"
                >
                  <Send className="w-4 h-4" /> @Jessymia0505
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-zinc-500 text-sm">Email Support</p>
                <a 
                  href="mailto:peaceezenwamma@gmail.com" 
                  className="flex items-center gap-2 text-[#FF2FD8] hover:underline font-medium"
                >
                  <Mail className="w-4 h-4" /> peaceezenwamma@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-zinc-500">Follow us on X:</p>
            <a 
              href="https://x.com/VerseEcosystem" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-[#2E9BFF] hover:underline font-medium"
            >
              <Twitter className="w-4 h-4" /> @VerseEcosystem
            </a>
          </div>
        </div>
        
        <div className="mt-16 text-zinc-600 text-xs flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Verse Groups Hub</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Official Verse Branding</span>
          </div>
          {viewCount !== null && (
            <div className="text-zinc-700 font-mono text-[10px] uppercase tracking-widest">
              Total Access Sessions: {viewCount}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
