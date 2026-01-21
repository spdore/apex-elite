
import React, { useRef, useState, useEffect } from 'react';
import TextReveal from './ui/TextReveal';
import InfiniteMarquee from './ui/InfiniteMarquee';
import { Crosshair, Trophy, Skull } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

interface HeroProps {
  onOpenShopInfo: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenShopInfo }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse movement logic for 3D Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const gridRotateX = useTransform(springY, [-0.5, 0.5], [65, 55]); 
  const gridRotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const contentX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const contentY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

  const backgroundY = useTransform(scrollY, [0, 1000], [0, 500]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const scrollToMission = () => {
    const element = document.getElementById('mission');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const useScramble = (text: string) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    
    const scramble = () => {
        let iter = 0;
        const interval = setInterval(() => {
            setDisplay(text.split('').map((c, i) => {
                if (i < iter) return text[i];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(''));
            if (iter >= text.length) clearInterval(interval);
            iter += 1/3;
        }, 30);
    };
    return { display, scramble };
  };

  const apexText = useScramble("APEX");
  const predText = useScramble("PREDATOR");

  return (
    <div 
        id="hero" 
        ref={ref} 
        onMouseMove={handleMouseMove}
        className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-delta-dark perspective-1000"
    >
      
      {/* 3D Perspective Grid Floor - Red for Apex */}
      <motion.div 
        style={{ 
            rotateX: gridRotateX,
            rotateY: gridRotateY,
            y: backgroundY,
        }} 
        className="absolute inset-0 -bottom-[50%] z-0 pointer-events-none opacity-20"
      >
        <div className="w-full h-full bg-[linear-gradient(to_right,#330000_1px,transparent_1px),linear-gradient(to_bottom,#330000_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] animate-grid-flow"></div>
      </motion.div>

      {/* Kinetic Background Typography */}
      <motion.div 
        style={{ 
            x: useTransform(springX, [-0.5, 0.5], [50, -50]),
            y: useTransform(springY, [-0.5, 0.5], [50, -50]),
            rotate: -6, 
            scale: 1 
        }} 
        className="absolute inset-0 flex flex-col justify-center pointer-events-none z-0 mix-blend-color-dodge opacity-10"
      >
         <InfiniteMarquee text="YOU ARE THE CHAMPION // KILL LEADER //" className="text-[12rem] font-black text-outline-red" speed="slow" />
         <InfiniteMarquee text="BECOME LEGEND // APEX PREDATOR //" className="text-[12rem] font-black text-outline-red translate-x-32" speed="slow" reverse />
         <InfiniteMarquee text="RANKED SERIES // BATTLE ROYALE //" className="text-[12rem] font-black text-outline-red" speed="slow" />
      </motion.div>

      {/* Main Content */}
      <motion.div 
        style={{ x: contentX, y: contentY, opacity: opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-4 w-full flex flex-col items-start justify-center h-full pt-48 pb-32 md:pt-56 md:pb-20"
      >
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-apex-red/30 bg-apex-red/5 backdrop-blur-md mb-8 cursor-crosshair hover:bg-apex-red/20 transition-all hover:border-apex-red hover:shadow-[0_0_15px_rgba(218,41,42,0.3)]"
        >
            <Trophy className="w-4 h-4 text-apex-red animate-pulse" />
            <span className="text-xs font-bold font-mono tracking-[0.3em] text-apex-red group-hover:tracking-[0.5em] transition-all duration-300">SEASON 22 RANKED</span>
        </motion.div>

        {/* Huge Title */}
        <h1 className="text-7xl md:text-[9rem] leading-[0.9] font-black tracking-tighter text-white mb-8 uppercase mix-blend-difference relative">
          <motion.span 
            initial={{ x: -100, opacity: 0, filter: "blur(20px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            onHoverStart={apexText.scramble}
            className="block hover:text-outline-red hover:translate-x-4 transition-all duration-300 cursor-default"
          >
            {apexText.display}
          </motion.span>
          <motion.span 
             initial={{ x: 100, opacity: 0, filter: "blur(20px)" }}
             animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
             onHoverStart={predText.scramble}
             className="block text-transparent bg-clip-text bg-gradient-to-r from-apex-red to-red-600 hover:text-white transition-all duration-500 cursor-default"
          >
            {predText.display}
          </motion.span>
          
          <span className="block text-4xl md:text-6xl font-normal font-mono text-gray-400 mt-6 tracking-tight border-t border-white/10 pt-6">
             <TextReveal text="登峰造极 // BECOME LEGEND" delay={800} />
          </span>
        </h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-md text-gray-300 text-base md:text-lg font-mono mb-16 leading-relaxed border-l-4 border-apex-red pl-6 hover:border-white transition-colors"
        >
            如果你想成为最强，就必须击败最强。
            <br/>
            <span className="text-apex-red group-hover:text-white transition-colors mt-2 block">/// 捍卫者已部署 /// 猎杀开始</span>
        </motion.p>

        {/* CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
            <button 
              onClick={scrollToMission}
              className="group relative px-8 py-5 bg-apex-red text-black font-black uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-200 clip-diagonal text-base md:text-lg"
            >
                <div className="absolute inset-0 w-full h-full bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                    <span>立即上分 // BOOST NOW</span>
                </div>
            </button>
            <button 
              onClick={onOpenShopInfo}
              className="group px-8 py-5 border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/5 transition-all duration-300 backdrop-blur-sm hover:border-apex-red/50 hover:text-apex-red relative overflow-hidden text-base md:text-lg"
            >
                <span className="relative z-10 group-hover:tracking-[0.2em] transition-all duration-300 flex justify-center">战队档案 // CLAN INFO</span>
                <div className="absolute inset-0 bg-apex-red/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 skew-x-12"></div>
            </button>
        </motion.div>

      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-2 z-20"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-apex-red animate-pulse"></div>
        <span className="text-[10px] font-mono text-apex-red uppercase vertical-rl tracking-widest" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
      </motion.div>
    </div>
  );
};

export default Hero;
