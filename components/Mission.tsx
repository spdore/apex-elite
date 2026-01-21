
import React, { useState, useRef } from 'react';
import { MISSIONS } from '../constants';
import { Trophy, Skull, Users, ArrowRight, ScanLine, Hexagon, Target } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import TiltCard from './ui/TiltCard';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Mission: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const gridX = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), { stiffness: 150, damping: 20 });
  const gridY = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), { stiffness: 150, damping: 20 });

  const getIcon = (iconName: string, size: number = 32) => {
    switch (iconName) {
      case 'Trophy': return <Trophy size={size} />;
      case 'Skull': return <Skull size={size} />;
      case 'Users': return <Users size={size} />;
      case 'Target': return <Target size={size} />;
      case 'ScanLine': return <ScanLine size={size} />;
      default: return <Trophy size={size} />;
    }
  };

  return (
    <section 
      id="mission" 
      ref={ref}
      onMouseMove={handleMouseMove}
      className="py-24 bg-[#050505] relative overflow-hidden group/section"
    >
      {/* Interactive Grid Background - Red Tint */}
      <motion.div 
        style={{ x: gridX, y: gridY }}
        className="absolute inset-[-10%] w-[120%] h-[120%] opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(218,41,42,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(218,41,42,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center relative">
            <FadeIn direction="up">
                <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 bg-apex-red/5 border border-apex-red/20 rounded-full">
                    <Trophy size={16} className="text-apex-red animate-pulse" />
                    <span className="text-apex-red font-mono text-xs tracking-[0.2em] uppercase">TACTICAL ACADEMY</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase mb-6 mix-blend-exclusion">
                    精英 <span className="text-transparent bg-clip-text bg-gradient-to-r from-apex-red to-red-600">课程</span>
                </h2>
            </FadeIn>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MISSIONS.map((mission, index) => (
                <FadeIn key={mission.id} delay={index * 0.2} direction="up" className="h-full">
                    <div 
                        onMouseEnter={() => setHoveredCard(index)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="h-full relative group perspective-1000"
                    >
                        {/* Connecting Lines (Decor) */}
                        <div className="absolute top-1/2 -left-4 w-4 h-px bg-apex-red/20 hidden md:block"></div>
                        <div className="absolute top-1/2 -right-4 w-4 h-px bg-apex-red/20 hidden md:block"></div>

                        <TiltCard className="h-full bg-[#080808] border border-white/10 group-hover:border-apex-red/50 transition-colors duration-500 overflow-hidden">
                            
                            {/* Scanning Laser Effect - Red */}
                            <motion.div 
                                initial={{ top: "-10%" }}
                                animate={hoveredCard === index ? { top: "110%" } : { top: "-10%" }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
                                className="absolute left-0 right-0 h-[2px] bg-apex-red z-20 pointer-events-none opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#DA292A,0_0_30px_#DA292A]"
                            >
                                <div className="absolute top-0 right-0 text-[8px] font-mono text-apex-red bg-black px-1 transform translate-x-full">SCANNING...</div>
                            </motion.div>
                            
                            {/* Inner Grid Pattern for Hologram feel */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(218,41,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(218,41,42,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            <div className="p-8 h-full flex flex-col relative overflow-hidden">
                                
                                {/* Background Icon - Dynamic based on mission type */}
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-all duration-500 transform group-hover:scale-110 group-hover:-rotate-12 pointer-events-none">
                                    {getIcon(mission.icon, 120)}
                                </div>

                                {/* Icon & ID */}
                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className="relative">
                                        <div className="p-4 bg-white/5 rounded-sm text-apex-red border border-white/5 group-hover:bg-apex-red group-hover:text-black transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                                            {getIcon(mission.icon, 32)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-mono text-xs text-gray-600 group-hover:text-apex-red transition-colors">OP-0{index + 1}</span>
                                        <Hexagon size={12} className="text-gray-800 group-hover:text-apex-red transition-colors mt-1" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 relative z-10" style={{ transform: "translateZ(20px)" }}>
                                    <div className="flex items-center gap-2 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <div className="w-1 h-1 bg-apex-red rounded-full"></div>
                                        <h3 className="text-[10px] font-bold text-apex-red uppercase tracking-widest">{mission.subtitle}</h3>
                                    </div>
                                    <h4 className="text-3xl font-black text-white uppercase italic mb-4 group-hover:translate-x-2 transition-transform duration-300 relative inline-block">
                                        {mission.title}
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                                        {mission.desc}
                                    </p>
                                </div>

                                {/* Features List */}
                                <div className="relative z-10 border-t border-white/10 pt-4 mt-auto">
                                    <ul className="space-y-2">
                                        {mission.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs font-mono text-gray-500 group-hover:text-apex-red/80 transition-colors">
                                                <ArrowRight size={10} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </TiltCard>
                    </div>
                </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
