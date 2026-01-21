
import React, { useState, useEffect, useRef } from 'react';
import { MALE_COMPANION_PRICING, FEMALE_COMPANION_PRICING } from '../constants';
import { Shield, Zap, Lock, Unlock, Crown, Gem, Award, User, Heart, Crosshair, Star } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import { PricingTier } from '../types';
import PricingModal from './ui/PricingModal';
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

interface PricingProps {
  onModalChange?: (isOpen: boolean) => void;
}

const ScrambleText = ({ text, active }: { text: string; active: boolean }) => {
    const [display, setDisplay] = useState(text);
    const chars = "0123456789_-%$#@";
    
    useEffect(() => {
        if (!active) {
            setDisplay(text);
            return;
        }
        
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((letter, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1/2; 
        }, 30);
        
        return () => clearInterval(interval);
    }, [active, text]);

    return <span>{display}</span>;
};

interface PricingCardProps {
  tier: PricingTier;
  onClick: () => void;
  index: number;
  gender: 'male' | 'female';
  mobileOrderClass: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, onClick, index, gender, mobileOrderClass }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const isFemale = gender === 'female';
  
  // Specific Tier Identification
  const isMaleDiamond = tier.id === 'male-dia';
  
  const hasDiscount = !!tier.discountLabel;
  const isRecommended = tier.recommended && !hasDiscount; 

  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Custom colors for different tiers
  let spotlightColor = 'rgba(59, 130, 246, 0.15)'; // Blue default
  if (isFemale) spotlightColor = 'rgba(244, 114, 182, 0.2)'; // Pinkish for female
  if (hasDiscount) spotlightColor = 'rgba(218, 41, 42, 0.3)'; // Redish for discount
  
  // Override for Male Diamond Blue - High intensity spotlight
  if (isMaleDiamond) spotlightColor = 'rgba(59, 130, 246, 0.6)';

  const style = useMotionTemplate`radial-gradient(300px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 80%)`;

  let borderColor = tier.color; 
  let textColor = tier.color.replace('border-', 'text-');

  // Specific glow colors based on tier color class
  let glowColor = '#38BDF8'; // cyan
  if (tier.color.includes('purple')) glowColor = '#A855F7';
  if (tier.color.includes('pink')) glowColor = '#EC4899';
  if (tier.color.includes('rose')) glowColor = '#FB7185';
  if (tier.color.includes('yellow')) glowColor = '#EAB308'; // gold
  if (tier.color.includes('cyan')) glowColor = '#22D3EE';
  if (tier.color.includes('blue')) glowColor = '#3B82F6';
  if (hasDiscount) glowColor = '#FFD700'; // Gold glow for discount
  
  // Strong blue glow for Male Diamond
  if (isMaleDiamond) glowColor = '#3B82F6';

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`group relative h-full rounded-xl transition-all duration-500 cursor-pointer flex flex-col ${mobileOrderClass} lg:order-none 
        ${isMaleDiamond 
            ? 'scale-[1.05] z-30' // Handled by inner containers for complex borders
            : hasDiscount 
                ? 'bg-[#0f0f0f] border border-delta-gold/70 shadow-[0_0_40px_-10px_rgba(255,215,0,0.4)] scale-[1.02] z-20 overflow-hidden' 
                : 'bg-[#080808] border border-white/10 hover:border-white/30 overflow-hidden'
        }
        ${isRecommended ? `shadow-[0_0_20px_-10px_${isFemale ? '#FB7185' : '#22D3EE'}]` : ''}
      `}
    >
      
      {/* --- MALE DIAMOND SPECIAL EFFECTS (CHAMPION STYLE) --- */}
      {isMaleDiamond && (
        <>
            {/* 1. Animated Conic Gradient Border (Spinning Beam) */}
            <div className="absolute -inset-[3px] rounded-xl overflow-hidden pointer-events-none">
                <motion.div 
                    className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_90deg,#3B82F6_180deg,transparent_270deg,transparent_360deg)] opacity-80 blur-md"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>
            {/* 2. Inner Black Background to mask the center of conic gradient */}
            <div className="absolute inset-[1px] bg-[#030303] rounded-[10px] z-0"></div>

            {/* 3. Fluid Background Texture */}
             <motion.div 
                className="absolute inset-0 opacity-40 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
             />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay z-0 pointer-events-none"></div>
        </>
      )}

      {/* 1. Spotlight Effect Layer */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-10 rounded-xl"
        style={{ background: style }}
      />

      {/* 2. Grid Background Pattern (Standard Cards) */}
      {!isMaleDiamond && (
          <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <div className={`absolute inset-0 bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]`}></div>
          </div>
      )}

      {/* 3. Active Border Frame (Standard Cards) */}
      {!isMaleDiamond && (
        <div className={`absolute inset-0 border-2 ${hasDiscount ? 'border-delta-gold' : borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-20 pointer-events-none mix-blend-screen shadow-[0_0_15px_${glowColor}]`}></div>
      )}
      
      {/* 4. Content - UPDATED: Increased Fonts & Adjusted Padding */}
      <div className="relative z-30 flex flex-col h-full pt-6 px-5 pb-6 md:pt-10 md:px-8 md:pb-8">
        
        {/* PLATINUM RECOMMENDED - Subtle & Clean */}
        {isRecommended && (
            <div className="absolute top-0 right-0">
                <div className={`
                    bg-gradient-to-bl from-${isFemale ? 'rose' : 'cyan'}-500/20 to-transparent 
                    border-l border-b border-${isFemale ? 'rose' : 'cyan'}-500/30 
                    px-4 py-2 rounded-bl-xl backdrop-blur-sm
                `}>
                     <div className={`flex items-center gap-1.5 text-xs md:text-[10px] font-bold uppercase tracking-wider text-${isFemale ? 'rose' : 'cyan'}-400`}>
                        <Star size={12} fill="currentColor" />
                        Recommended
                    </div>
                </div>
            </div>
        )}

        {/* DISCOUNT BADGE - Standard (Gold) */}
        {hasDiscount && !isMaleDiamond && (
           <>
               <div className="absolute top-0 left-0 right-0 h-8 md:h-10 flex items-center justify-center shadow-lg overflow-hidden bg-gradient-to-r from-yellow-600 via-delta-gold to-yellow-600">
                   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNCIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz48L3N2Zz4=')] opacity-20"></div>
                   <div className="flex items-center gap-2 font-black text-sm md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] animate-pulse relative z-10 text-black">
                       <Zap size={14} fill="black" />
                       LIMITED // 特惠
                       <Zap size={14} fill="black" />
                   </div>
               </div>
           </>
        )}

        {/* MALE DIAMOND LIMITED OFFER - MASSIVE & EYE CATCHING */}
        {isMaleDiamond && tier.discountLabel && (
            <div className="absolute top-[50px] md:top-[80px] left-0 right-0 z-40 flex justify-center pointer-events-none">
                 <div className="relative">
                    {/* Glow behind text */}
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40"></div>
                    <h4 className="relative text-3xl md:text-5xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] scale-y-110 skew-x-[-10deg]">
                        限时特惠
                    </h4>
                    <div className="text-center text-xs md:text-[10px] tracking-[0.5em] md:tracking-[1em] text-blue-300 font-mono mt-1 font-bold uppercase">
                        Limited Time
                    </div>
                 </div>
            </div>
        )}

        {/* Top Icon Area - Increased spacing for mobile */}
        <div className={`flex justify-between items-start mb-4 md:mb-6 mt-2 ${isMaleDiamond ? 'opacity-80' : ''}`}>
            <div className={`p-2 md:p-3 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors ${hasDiscount && !isMaleDiamond ? 'text-delta-gold' : textColor}`}>
                {isFemale ? <Heart size={20} className={`md:w-6 md:h-6 ${isHovered ? 'animate-pulse' : ''}`} /> : <Shield size={20} className="md:w-6 md:h-6" />}
            </div>
            
            {/* Tier Name Badge */}
            <div className={`px-3 py-1 rounded-full border bg-black/50 backdrop-blur-sm ${hasDiscount && !isMaleDiamond ? 'border-delta-gold/50 text-delta-gold' : (isMaleDiamond ? 'border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-white/10 text-gray-400')}`}>
                <span className="text-sm md:text-[10px] font-mono font-bold uppercase tracking-widest">
                    {tier.name}
                </span>
            </div>
        </div>

        {/* Price Area - ENLARGED FONTS */}
        <div className={`mb-6 md:mb-8 ${isMaleDiamond ? 'mt-8 md:mt-16' : ''}`}>
            <div className="flex flex-col items-start gap-1">
                {/* Original Price */}
                {tier.originalPrice && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 line-through font-mono decoration-red-500/80 font-bold">
                            {tier.originalPrice}
                        </span>
                        {hasDiscount && <span className={`text-[10px] ${isMaleDiamond ? 'bg-blue-600' : 'bg-red-600'} text-white px-1.5 py-0.5 rounded font-bold`}>-20%</span>}
                    </div>
                )}
                
                <div className="flex items-baseline gap-1">
                    <span className={`text-5xl md:text-5xl font-black tracking-tighter transition-colors duration-300 ${isMaleDiamond ? 'text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]' : (hasDiscount ? 'text-transparent bg-clip-text bg-gradient-to-b from-delta-gold to-yellow-600 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]' : 'text-white group-hover:' + textColor.replace('border-', 'text-'))}`}>
                       <ScrambleText text={tier.price} active={isHovered} />
                    </span>
                </div>
                <p className="text-xs md:text-[10px] text-gray-500 font-mono tracking-widest mt-1">PER HOUR / 纯绿手打</p>
            </div>

            {/* Animated Divider */}
            <div className="w-full h-px bg-white/10 mt-4 md:mt-6 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${hasDiscount && !isMaleDiamond ? 'yellow-500' : (isMaleDiamond ? 'blue-500' : (isFemale ? 'pink-500' : 'cyan-400'))} to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}></div>
            </div>
        </div>

        {/* Features - ENLARGED FONTS */}
        <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8 flex-1">
            {tier.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-base md:text-xs text-gray-300 md:text-gray-400 group-hover:text-gray-200 transition-colors">
                    <div className={`w-1.5 h-1.5 md:w-1.5 md:h-1.5 rounded-full ${hasDiscount && !isMaleDiamond ? 'bg-delta-gold' : textColor.replace('border-', 'bg-')} group-hover:shadow-[0_0_8px_currentColor]`}></div>
                    <span className="font-mono font-medium leading-tight">{feature}</span>
                </li>
            ))}
        </ul>

        {/* Action Button - ENLARGED FONTS */}
        <div className="mt-auto">
            <button className={`w-full relative overflow-hidden group/btn py-4 px-6 bg-white/5 border border-white/10 hover:border-${hasDiscount && !isMaleDiamond ? 'yellow-500' : (isMaleDiamond ? 'blue-500' : (isFemale ? 'pink-400' : 'cyan-400'))} transition-all duration-300 rounded-sm`}>
                <div className={`absolute inset-0 bg-${hasDiscount && !isMaleDiamond ? 'yellow-600' : (isMaleDiamond ? 'blue-600' : (isFemale ? 'pink-500' : 'cyan-600'))} opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300`}></div>
                
                <div className="flex items-center justify-between relative z-10">
                    <span className={`font-mono text-base md:text-xs font-bold uppercase tracking-widest group-hover/btn:${hasDiscount && !isMaleDiamond ? 'text-delta-gold' : textColor.replace('border-', 'text-')}`}>
                        {isHovered ? 'REQUEST NOW' : 'SELECT TIER'}
                    </span>
                    {isHovered ? <Unlock size={16} className={hasDiscount && !isMaleDiamond ? 'text-delta-gold' : textColor.replace('border-', 'text-')} /> : <Lock size={16} className="text-gray-500" />}
                </div>
                
                {/* Progress Bar Effect on Hover */}
                <div className={`absolute bottom-0 left-0 h-1 bg-${hasDiscount && !isMaleDiamond ? 'yellow-500' : (isMaleDiamond ? 'blue-500' : (isFemale ? 'pink-500' : 'cyan-400'))} w-0 group-hover/btn:w-full transition-all duration-300 ease-out`}></div>
            </button>
        </div>

      </div>
    </div>
  );
};

const Pricing: React.FC<PricingProps> = ({ onModalChange }) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedTier);
    }
  }, [selectedTier, onModalChange]);

  const currentTiers = gender === 'male' ? MALE_COMPANION_PRICING : FEMALE_COMPANION_PRICING;

  return (
    <section id="pricing" className="py-12 md:py-24 bg-black relative overflow-hidden flex flex-col justify-center min-h-screen">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-[#030303]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-black to-black opacity-80"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            
            {/* Section Header */}
            <div className="mb-6 md:mb-12 flex flex-col items-center text-center">
                <FadeIn direction="down">
                    <div className="inline-flex items-center gap-2 mb-3 md:mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                        <Zap size={14} className="text-apex-red animate-pulse" />
                        <span className="text-[10px] md:text-xs font-mono text-gray-300 tracking-[0.2em]">COMPANION SERVICES</span>
                    </div>
                </FadeIn>
                <FadeIn>
                    <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 md:mb-8 relative inline-block">
                        陪玩 <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-red to-red-600">价格</span>
                    </h2>
                </FadeIn>

                {/* Gender Toggle Switch - Updated Labels for Clarity */}
                <FadeIn direction="up" delay={0.2}>
                    <div className="bg-white/5 p-1 rounded-lg border border-white/10 inline-flex relative cursor-pointer scale-90 md:scale-100">
                        {/* Active background pill */}
                        <motion.div 
                            className="absolute top-1 bottom-1 bg-apex-red rounded-md z-0 shadow-[0_0_15px_rgba(218,41,42,0.5)]"
                            initial={false}
                            animate={{ 
                                x: gender === 'male' ? 0 : '100%',
                                width: '50%' 
                            }}
                            transition={{ type: "spring", stiffness: 250, damping: 25 }}
                        />
                        
                        <button 
                            onClick={() => setGender('male')}
                            className={`relative z-10 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 ${gender === 'male' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Shield size={14} className="md:w-4 md:h-4" />
                            特勤干员 (男)
                        </button>
                        <button 
                            onClick={() => setGender('female')}
                            className={`relative z-10 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 ${gender === 'female' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                        >
                            <Heart size={14} className="md:w-4 md:h-4" />
                            支援专家 (女)
                        </button>
                    </div>
                </FadeIn>
            </div>

            {/* Pricing Cards Grid - UPDATED: 75% Width on Mobile */}
            <div className="min-h-[500px] md:min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={gender}
                        initial={{ opacity: 0, x: gender === 'male' ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: gender === 'male' ? 20 : -20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className={`grid grid-cols-1 gap-6 md:gap-8 items-stretch perspective-1000 w-[75%] md:w-full mx-auto ${
                            gender === 'male' ? 'lg:grid-cols-3' : 'lg:grid-cols-2 max-w-4xl mx-auto'
                        }`}
                    >
                        {currentTiers.map((tier, index) => {
                            // Calculate Mobile Order Logic
                            let mobileOrderClass = 'order-last'; // Default
                            if (gender === 'male') {
                                if (tier.discountLabel) mobileOrderClass = 'order-first';
                                else if (tier.recommended) mobileOrderClass = 'order-2';
                                else mobileOrderClass = 'order-3';
                            } else {
                                // Female Logic
                                if (tier.recommended) mobileOrderClass = 'order-first';
                                else mobileOrderClass = 'order-last';
                            }

                            return (
                                <PricingCard 
                                    key={tier.id} 
                                    tier={tier} 
                                    index={index}
                                    gender={gender}
                                    mobileOrderClass={mobileOrderClass}
                                    onClick={() => setSelectedTier(tier)} 
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <AnimatePresence>
                {selectedTier && (
                    <PricingModal 
                        tier={selectedTier} 
                        onClose={() => setSelectedTier(null)} 
                    />
                )}
            </AnimatePresence>
        </div>
    </section>
  );
};

export default Pricing;
