
import React, { useState, useEffect } from 'react';
import { Crosshair, Home, Trophy, Users, Zap, Rocket, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isVisible?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isVisible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideMobileLogo, setHideMobileLogo] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setHideMobileLogo(currentScrollY > 250);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'mission', 'coaching', 'pricing'];
    
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4; 

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); 
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const navLinks = [
    { name: '精英课程', href: '#mission' },
    { name: '一对一指导', href: '#coaching' },
    { name: '陪玩价格', href: '#pricing' },
  ];

  const mobileNavItems = [
    { id: 'hero', icon: Home, label: '主页', href: '#hero' },
    { id: 'mission', icon: Trophy, label: '项目', href: '#mission' },
    { id: 'coaching', icon: Crosshair, label: '教学', href: '#coaching' },
    { id: 'pricing', icon: Crown, label: '陪玩', href: '#pricing' },
  ];

  const scrollToSection = (e: React.MouseEvent | React.TouchEvent, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId === 'top' ? 'hero' : targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(targetId === 'top' ? 'hero' : targetId);
  };

  return (
    <>
      {/* ================= DESKTOP TOP BAR ================= */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[40] hidden md:flex justify-center pt-6 px-4 pointer-events-none transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className={`pointer-events-auto transition-all duration-500 ease-out border backdrop-blur-xl rounded-sm px-8 py-4 flex items-center justify-between gap-12 ${
          isScrolled 
            ? 'bg-black/90 border-apex-red/20 shadow-[0_0_30px_-10px_rgba(218,41,42,0.3)] min-w-[320px] max-w-5xl skew-x-[-10deg]' 
            : 'bg-transparent border-transparent w-full max-w-7xl'
        }`}>
          
          {/* Logo */}
          <div className={`flex items-center gap-2 group cursor-pointer pointer-events-auto shrink-0 ${isScrolled ? 'skew-x-[10deg]' : ''}`} onClick={(e) => scrollToSection(e, '#hero')}>
            <div className="relative">
              <Trophy className="w-6 h-6 text-apex-red transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-apex-red blur-md opacity-50 animate-pulse"></div>
            </div>
            <span className="font-bold tracking-tighter text-xl text-white whitespace-nowrap">
              APEX<span className="text-apex-red">.ELITE</span>
            </span>
          </div>

          {/* Links */}
          <div className={`flex items-center gap-12 ${isScrolled ? 'skew-x-[10deg]' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative text-sm font-bold text-gray-400 hover:text-apex-red transition-colors tracking-wider group px-2 py-1 whitespace-nowrap"
              >
                <span className="relative z-10 group-hover:hidden">{link.name}</span>
                <span className="relative z-10 hidden group-hover:inline-block font-mono text-apex-red">
                    [{link.name}]
                </span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className={`shrink-0 ${isScrolled ? 'skew-x-[10deg]' : ''}`}>
            <button 
              onClick={(e) => scrollToSection(e, '#pricing')}
              className="relative bg-white text-black px-8 py-2.5 text-sm font-black tracking-widest overflow-hidden group hover:bg-apex-red transition-colors whitespace-nowrap"
            >
              <span className="relative z-10">立即下单</span>
              <div className="absolute inset-0 bg-apex-red transform translate-y-full group-hover:translate-y-0 transition-transform duration-200"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM TACTICAL BAR ================= */}
      {/* Mobile Logo Top Left */}
      <div 
        className={`md:hidden fixed top-4 left-4 z-40 mix-blend-difference pointer-events-none transition-transform duration-500 ease-in-out ${
          hideMobileLogo ? '-translate-x-[200%]' : 'translate-x-0'
        }`}
      >
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-apex-red" />
            <span className="font-bold tracking-tighter text-lg text-white">APEX.ELITE</span>
          </div>
      </div>

      <nav 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-[50] transition-transform duration-500 ease-spring ${
           isVisible ? 'translate-y-0' : 'translate-y-[150%]'
        }`}
      >
        {/* Tactical HUD Style Bottom Bar */}
        <div className="bg-[#050505] border-t-2 border-apex-red relative shadow-[0_-5px_20px_-5px_rgba(218,41,42,0.3)] pb-safe">
            
            {/* Top Scanning Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-apex-red/50 overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-apex-red blur-sm animate-[shimmer_2s_infinite_linear]"></div>
            </div>

            {/* Inner Grid Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20%_100%] pointer-events-none"></div>

            <div className="flex justify-around items-center h-16 relative z-10 px-2">
                {mobileNavItems.map((item) => {
                    const isActive = activeSection === item.id;
                    const Icon = item.icon;

                    return (
                        <button 
                            key={item.id}
                            onClick={(e) => scrollToSection(e, item.href)}
                            className="relative flex flex-col items-center justify-center flex-1 h-full transition-colors duration-200 group"
                        >
                            {/* Active Bracket Effect */}
                            {isActive && (
                                <motion.div
                                    layoutId="mobileNavActive"
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                >
                                    {/* Left Bracket */}
                                    <div className="absolute left-2 h-8 w-2 border-l-2 border-t border-b border-apex-red opacity-80"></div>
                                    {/* Right Bracket */}
                                    <div className="absolute right-2 h-8 w-2 border-r-2 border-t border-b border-apex-red opacity-80"></div>
                                    {/* Background Glow */}
                                    <div className="absolute inset-x-2 inset-y-1 bg-apex-red/10"></div>
                                </motion.div>
                            )}
                            
                            <div className={`relative z-10 flex flex-col items-center gap-1 ${isActive ? 'translate-y-0' : 'translate-y-1'}`}>
                                <Icon 
                                    size={20} 
                                    className={`transition-all duration-300 ${isActive ? 'text-apex-red drop-shadow-[0_0_5px_rgba(218,41,42,0.8)]' : 'text-gray-500 group-hover:text-gray-300'}`} 
                                />
                                <span 
                                    className={`text-[9px] font-mono tracking-widest uppercase transition-all duration-300 ${isActive ? 'text-apex-red font-bold' : 'text-gray-600'}`}
                                >
                                    {item.label}
                                </span>
                            </div>
                        </button>
                    )
                })}
            </div>
            
            {/* Bottom Safe Area Spacer if needed (usually handled by padding, adding extra line for aesthetics) */}
            <div className="h-4 w-full bg-[#020202] flex justify-center items-center gap-1">
                 <div className="w-16 h-[2px] bg-gray-800 rounded-full"></div>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
