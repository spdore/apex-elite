
import React, { useState, useEffect, useRef } from 'react';
import { COACHING_SERVICES } from '../constants';
import { Target, ChevronRight, MousePointer2, Clock, Zap, Star } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import TiltCard from './ui/TiltCard';
import { AnimatePresence, motion, useSpring, useMotionValue } from 'framer-motion';
import OperatorModal from './ui/OperatorModal';
import { CoachingModule } from '../types';

interface OperatorsProps {
  onModalChange?: (isOpen: boolean) => void;
}

const Operators: React.FC<OperatorsProps> = ({ onModalChange }) => {
  const [selectedModule, setSelectedModule] = useState<CoachingModule | null>(null);
  const [isHoveringSection, setIsHoveringSection] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    if (onModalChange) {
      onModalChange(!!selectedModule);
    }
  }, [selectedModule, onModalChange]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop"; 
    e.currentTarget.onerror = null; 
  };

  return (
    <section 
        id="coaching" 
        ref={sectionRef}
        onMouseEnter={() => setIsHoveringSection(true)}
        onMouseLeave={() => setIsHoveringSection(false)}
        onMouseMove={handleMouseMove}
        className="py-16 md:py-24 bg-[#030303] relative z-10 cursor-none overflow-hidden"
    >
      {/* Background Grid for Aim Trainer Feel */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="w-full h-full bg-[linear-gradient(rgba(218,41,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(218,41,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Custom Crosshair Cursor - Red */}
      <motion.div
        style={{ left: cursorX, top: cursorY, opacity: isHoveringSection ? 1 : 0 }}
        className="absolute pointer-events-none z-[60] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      >
        <div className="relative">
            <div className="w-[1px] h-8 bg-apex-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-8 h-[1px] bg-apex-red absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 translate-x-6 -translate-y-1/2 text-[8px] font-mono text-apex-red whitespace-nowrap">AIM_TRAINING_MODULE</div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b border-white/10 pb-6">
            <FadeIn direction="right" className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <Target className="w-5 h-5 text-apex-red animate-pulse" />
                    <span className="text-apex-red font-mono text-xs tracking-[0.2em] uppercase">PERFORMANCE LAB</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
                    一对一 <br/>
                    {/* High contrast title */}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-red via-white to-apex-red bg-[length:200%_auto] animate-text-shimmer drop-shadow-[0_0_15px_rgba(218,41,42,0.6)]">
                        精准指导
                    </span>
                </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2} className="mt-8 md:mt-0 text-right">
                <p className="text-gray-500 max-w-xs text-sm font-mono">
                    结合 KovaaK 与 Apex 靶场。<br/>
                    科学量化你的瞄准能力，拒绝玄学。
                </p>
            </FadeIn>
        </div>

        {/* 3-Column Grid Layout for 1x3 Row on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 justify-items-center">
            {COACHING_SERVICES.map((module, index) => {
                // Determine mobile order: Discount items first
                const mobileOrderClass = module.discountLabel ? 'order-first' : 'order-last';

                return (
                    <div 
                        // CHANGED: Use min-h and h-auto on mobile to be compact but grow with text. Fixed height only on desktop.
                        className={`min-h-[420px] h-auto md:h-[520px] w-full cursor-none relative group/card perspective-1000 ${mobileOrderClass} lg:order-none`}
                        key={module.id}
                        onClick={() => setSelectedModule(module)}
                    >
                        {/* Aim HUD Corners */}
                        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-apex-red opacity-0 group-hover/card:opacity-100 transition-all z-30"></div>
                        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-apex-red opacity-0 group-hover/card:opacity-100 transition-all z-30"></div>
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-apex-red opacity-0 group-hover/card:opacity-100 transition-all z-30"></div>
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-apex-red opacity-0 group-hover/card:opacity-100 transition-all z-30"></div>

                        <FadeIn delay={index * 0.1} direction="up" blur={true} className="h-full w-full">
                            <TiltCard className={`h-full border group-hover/card:border-apex-red/50 transition-colors bg-[#0a0a0a] ${module.discountLabel ? 'border-delta-gold/50' : 'border-white/10'}`}>
                                
                                {/* TREASURE-LEVEL FLASH SALE BADGE */}
                                {module.discountLabel && (
                                    <div className="absolute -top-4 -left-4 z-[70] pointer-events-none">
                                        <div className="relative group-hover/card:scale-110 transition-transform duration-300 ease-spring scale-75 md:scale-100 origin-top-left">
                                            {/* Glow Behind */}
                                            <div className="absolute inset-0 bg-yellow-500 blur-xl opacity-60 animate-pulse"></div>
                                            
                                            {/* Main Badge Body */}
                                            <div className="relative bg-gradient-to-br from-yellow-300 via-delta-gold to-yellow-600 text-black px-6 py-3 border-2 border-white/80 shadow-[0_0_25px_rgba(255,215,0,0.8)] transform -rotate-12 rounded-sm overflow-hidden">
                                                {/* Moving Shine Effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent translate-x-[-150%] animate-[shimmer_2s_infinite_linear]"></div>
                                                
                                                <div className="flex items-center gap-2 relative z-10">
                                                    <Star size={24} className="fill-white stroke-none animate-[spin_3s_linear_infinite]" />
                                                    <div className="flex flex-col leading-none text-center">
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-0.5">Limited Time</span>
                                                        <span className="font-black text-2xl uppercase tracking-tighter drop-shadow-sm">{module.discountLabel}</span>
                                                    </div>
                                                    <Zap size={24} className="fill-black animate-bounce" />
                                                </div>
                                            </div>

                                            {/* 'HOT' Tag attached */}
                                            <div className="absolute -bottom-2 -right-2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 transform rotate-6 border border-white shadow-md animate-pulse">
                                                HOT!!!
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* HIGH VISIBILITY PRICE BADGE */}
                                {/* CHANGED: Scaled down on mobile (scale-75) and adjusted position to not block content */}
                                <div className="absolute top-0 right-0 z-50 transform group-hover/card:scale-105 transition-transform duration-300 origin-top-right scale-75 md:scale-100">
                                     <div className={`text-white font-black px-6 py-4 rounded-bl-3xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] border-b border-l border-white/10 flex flex-col items-center leading-none ${module.discountLabel ? 'bg-gradient-to-bl from-delta-gold to-orange-500' : 'bg-apex-red'}`}>
                                        
                                        {/* Original Price Strikethrough */}
                                        {module.originalPrice && (
                                            <span className="text-xs text-black/60 line-through font-mono mb-1 font-bold decoration-black/50">
                                                {module.originalPrice}
                                            </span>
                                        )}
                                        
                                        <span className={`drop-shadow-sm text-3xl ${module.discountLabel ? 'text-black' : 'text-white'}`}>
                                            {module.price.split(' ')[0]}
                                        </span>
                                        
                                        <span className={`text-[10px] opacity-100 font-mono tracking-widest mt-1 font-bold px-2 py-0.5 rounded-sm ${module.discountLabel ? 'bg-black text-delta-gold' : 'bg-white/90 text-black'}`}>
                                            {module.price.split(' ').slice(1).join(' ')}
                                        </span>
                                     </div>
                                </div>

                                {/* Image Layer */}
                                <div className="absolute inset-0 group-hover/card:scale-105 transition-transform duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10"></div>
                                    <img 
                                        src={module.image} 
                                        alt={module.title}
                                        onError={handleImageError}
                                        className="w-full h-full object-cover opacity-60 grayscale group-hover/card:grayscale-0 group-hover/card:opacity-80 transition-all duration-500"
                                    />
                                    {/* Scanline overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.4)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,0,0,0.02),rgba(0,0,0,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10 opacity-30"></div>
                                </div>

                                {/* Content Container - Compacted padding for mobile (p-5 vs p-8) */}
                                <div className="absolute inset-0 p-5 md:p-8 flex flex-col z-20 pointer-events-none">
                                    
                                    {/* Top Tags - Pushed tags slightly lower on desktop, kept tight on mobile */}
                                    <div className="flex flex-wrap gap-2 mb-auto pr-24 md:pr-32 pt-12 md:pt-10" style={{ transform: "translateZ(30px)" }}>
                                        {module.tags.map((tag, i) => (
                                            <span key={i} className="px-2 py-0.5 md:px-3 md:py-1 bg-black/80 border border-apex-red/30 text-[10px] md:text-xs font-bold text-apex-red uppercase backdrop-blur-md shadow-lg rounded-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    {/* Main Text - Compacted sizes for mobile */}
                                    <div className="mt-4 mb-2" style={{ transform: "translateZ(50px)" }}>
                                        <div className="flex items-center gap-2 mb-2 opacity-90 group-hover/card:opacity-100 transition-opacity">
                                            <div className="w-1.5 h-1.5 bg-apex-red rounded-full animate-pulse"></div>
                                            <span className="text-[10px] md:text-xs font-mono text-gray-300 uppercase tracking-widest shadow-black drop-shadow-md">{module.subtitle}</span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic mb-3 leading-[0.9] group-hover/card:text-apex-red transition-colors drop-shadow-lg">
                                            {module.title}
                                        </h3>
                                        
                                        {/* Description - Adjusted padding and margin */}
                                        <p className="text-gray-200 text-xs md:text-sm font-sans leading-relaxed line-clamp-4 mb-4 border-l-2 border-apex-red pl-3 bg-black/60 p-2 md:p-3 rounded-r-md backdrop-blur-md shadow-lg">
                                            {module.description}
                                        </p>

                                        <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 p-2 px-3 md:px-4 rounded-sm backdrop-blur-md">
                                            <Clock size={14} className="text-apex-red" />
                                            <div>
                                                <p className="text-[8px] md:text-[9px] text-gray-400 font-mono uppercase tracking-wider leading-none">DURATION</p>
                                                <p className="text-xs md:text-sm font-bold text-white leading-none mt-0.5">{module.duration}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Hint */}
                                    <div className="mt-auto flex items-center gap-2 text-white/50 text-xs font-mono group-hover/card:text-white transition-colors border-t border-white/5 pt-3" style={{ transform: "translateZ(20px)" }}>
                                        <MousePointer2 size={12} />
                                        <span>CLICK FOR SYLLABUS</span>
                                        <ChevronRight size={12} className="group-hover/card:translate-x-1 transition-transform text-apex-red" />
                                    </div>
                                </div>
                            </TiltCard>
                        </FadeIn>
                    </div>
                );
            })}
        </div>

        {/* Modal */}
        <AnimatePresence>
            {selectedModule && (
                <OperatorModal 
                    module={selectedModule} 
                    onClose={() => setSelectedModule(null)} 
                />
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Operators;
