
import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Target, List, BookOpen, CheckCircle2, Zap } from 'lucide-react';
import { CoachingModule } from '../../types';

interface OperatorModalProps {
  module: CoachingModule;
  onClose: () => void;
}

const OperatorModal: React.FC<OperatorModalProps> = ({ module, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/40 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-[70vw] h-[60vh] md:w-full md:h-auto md:max-w-5xl md:max-h-[85vh] bg-[#080808] border border-apex-red/30 shadow-[0_0_100px_rgba(218,41,42,0.1)] flex flex-col md:flex-row rounded-2xl md:rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Sticky on Mobile */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[70] p-2 text-white hover:text-apex-red transition-colors bg-black/60 backdrop-blur-md rounded-full border border-white/10 group shadow-lg"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Scroll Wrapper for Mobile: Entire card scrolls on mobile, desktop handled by internal flex */}
        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden">
            
            {/* Left Column: Cover Image & Title */}
            <div className="w-full md:w-5/12 relative group h-[220px] md:h-auto shrink-0 overflow-hidden">
            <img 
                src={module.image} 
                alt={module.title}
                onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop";
                    e.currentTarget.onerror = null;
                }}
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent"></div>
            
            {/* Discount Badge on Image */}
            {module.discountLabel && (
                    <div className="absolute top-4 left-4 z-20 bg-delta-gold text-black px-3 py-1 skew-x-[-15deg] shadow-[0_0_15px_rgba(255,215,0,0.5)] border-l-4 border-white animate-pulse">
                        <div className="skew-x-[15deg] font-black text-xs uppercase tracking-wider flex items-center gap-1">
                            <Zap size={12} className="fill-black" />
                            {module.discountLabel}
                        </div>
                    </div>
                )}
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="inline-flex items-center gap-2 px-2 py-1 bg-apex-red text-white text-[10px] font-bold uppercase tracking-widest mb-3 rounded-sm shadow-[0_0_10px_rgba(218,41,42,0.4)]">
                    <Target size={12} /> TRAINING MODULE
                </span>
                <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tighter uppercase italic leading-none mb-4 drop-shadow-xl">{module.title}</h2>
                <div className="flex flex-wrap gap-2">
                    {module.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-mono text-gray-300 bg-black/50 border border-white/10 px-2 py-1 backdrop-blur-sm">{tag}</span>
                    ))}
                </div>
            </div>
            </div>

            {/* Right Column: Syllabus & Details */}
            <div className="w-full md:w-7/12 flex flex-col h-auto md:h-full bg-[#080808] relative">
                
                {/* Scrollable Content Area - Desktop only scroll here, Mobile scrolls parent */}
                <div className="flex-1 md:overflow-y-auto scrollbar-thin p-6 md:p-10 pb-32 md:pb-10">
                    
                    {/* Header with Price */}
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 border-b border-white/10 pb-6 md:pr-10">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-xs font-bold text-apex-red uppercase tracking-widest mb-1 flex items-center gap-2">
                                <BookOpen size={14} /> Course Overview
                            </h3>
                            <p className="text-[10px] text-gray-500 font-mono">CODE: {module.id.toUpperCase()}</p>
                        </div>
                        <div className="text-left md:text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-start items-center md:items-end">
                            <div className="flex items-center justify-end gap-2 mb-0 md:mb-1">
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest hidden md:block">Total Investment</p>
                                {module.discountLabel && (
                                    <span className="bg-delta-gold text-black text-[10px] font-bold px-2 py-0.5 rounded-sm flex items-center gap-1 animate-pulse">
                                        <Zap size={10} fill="currentColor" /> {module.discountLabel}
                                    </span>
                                )}
                            </div>
                            
                            <div className="flex flex-col items-start md:items-end">
                                {module.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through font-mono decoration-apex-red/50 mb-[-4px]">
                                        {module.originalPrice}
                                    </span>
                                )}
                                <p className={`text-3xl font-black ${module.discountLabel ? 'text-delta-gold drop-shadow-[0_0_10px_rgba(255,215,0,0.3)]' : 'text-white'}`}>
                                    {module.price}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed border-l-2 border-apex-red pl-4 font-normal">
                            {module.description}
                        </p>
                    </div>

                    {/* Syllabus List */}
                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <List size={14} /> Training Syllabus
                        </h3>
                        <ul className="space-y-3">
                            {module.syllabus.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 group bg-white/5 p-3 rounded-sm border border-transparent hover:border-white/10 transition-colors">
                                    <CheckCircle2 size={16} className="text-apex-red shrink-0 mt-0.5" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Extra Requirements for mobile flow visibility */}
                    {module.requirements && module.requirements.length > 0 && (
                        <div className="mb-8">
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap size={14} /> Prerequisites
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {module.requirements.map((req, i) => (
                                    <span key={i} className="text-[10px] font-mono border border-white/20 px-2 py-1 rounded-sm text-gray-400">
                                        {req}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Bar - Optional Actions or Info */}
                <div className="p-4 border-t border-white/5 bg-black/20 text-center md:text-right sticky bottom-0 md:relative bg-[#080808] md:bg-transparent">
                    <span className="text-[10px] text-gray-600 font-mono">SECURE TRANSMISSION // ENCRYPTED</span>
                </div>

            </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default OperatorModal;
