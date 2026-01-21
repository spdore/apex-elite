
import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, ShieldCheck, Star, Users, Award, Radio } from 'lucide-react';

interface ShopInfoModalProps {
  onClose: () => void;
}

const ShopInfoModal: React.FC<ShopInfoModalProps> = ({ onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-[90vw] max-h-[85vh] md:w-full md:max-w-3xl md:h-auto md:max-h-[90vh] bg-[#080808] border border-apex-red/30 shadow-[0_0_50px_rgba(218,41,42,0.1)] rounded-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(218,41,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(218,41,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

        {/* Close Button - Sticky/Fixed relative to modal */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-gray-500 hover:text-white transition-colors bg-black/50 rounded-full border border-white/10 backdrop-blur-sm"
        >
          <X size={20} />
        </button>

        {/* Scrollable Container */}
        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-visible scrollbar-hide md:scrollbar-default">
            {/* Left Brand Panel */}
            <div className="w-full md:w-1/3 bg-apex-red/5 border-b md:border-b-0 md:border-r border-apex-red/10 p-8 flex flex-col justify-between relative overflow-hidden shrink-0">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-apex-red to-transparent"></div>
                
                <div>
                    <h2 className="text-3xl font-black text-white italic tracking-tighter mb-2">APEX<span className="text-apex-red">.ELITE</span></h2>
                    <p className="text-xs font-mono text-apex-red/70 tracking-widest uppercase mb-8">Predator Squad</p>
                    
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-apex-red" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">顶猎认证</div>
                                <div className="text-gray-500 text-[10px]">PREDATOR RANKED</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Users className="text-apex-red" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">实力打手</div>
                                <div className="text-gray-500 text-[10px]">MASTER & PREDATOR</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Award className="text-apex-red" size={20} />
                            <div>
                                <div className="text-white font-bold text-sm">效率至上</div>
                                <div className="text-gray-500 text-[10px]">FAST BOOSTING</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-apex-red/10">
                    <div className="flex items-center gap-2 text-apex-red animate-pulse">
                        <Radio size={14} />
                        <span className="text-[10px] font-mono">STATUS: LOOKING FOR GROUP</span>
                    </div>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="w-full md:w-2/3 p-8 relative z-10">
                <h3 className="text-xl font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-apex-red block"></span>
                    关于战队 // About Squad
                </h3>

                <div className="space-y-6 text-sm text-gray-300 leading-relaxed font-sans">
                    <p>
                        <strong className="text-white">APEX ELITE</strong> 是由一群拥有多个赛季顶猎印记（Predator Badge）的<strong className="text-white">高分路人王</strong>和<strong className="text-white">大师/猎杀选手</strong>组成的代练与陪玩团队。
                    </p>
                    <p>
                        我们深知《Apex 英雄》不仅仅是枪法的比拼，更是关于身法（Tap Strafe/Super Glide）、意识与团队协同的极限博弈。无论您是想冲击大师/顶猎段位，还是想解锁 4000 锤子与 20 杀骷髅海徽章，我们都是您最坚实的后盾。
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                            <h4 className="text-apex-red font-bold text-xs uppercase mb-2">纯绿手打</h4>
                            <p className="text-xs text-gray-500">坚持纯人工操作，拒绝任何形式的宏、脚本或外挂。支持全程直播推流，保障账号绝对安全。</p>
                        </div>
                        <div className="bg-white/5 p-4 border border-white/5 rounded-sm">
                            <h4 className="text-apex-red font-bold text-xs uppercase mb-2">战损包赔</h4>
                            <p className="text-xs text-gray-500">如果在代练期间出现掉分情况，我们承诺免费补回并双倍赔偿。效率发车，光速上分。</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <div className="text-right">
                        <p className="text-[10px] font-mono text-gray-600 uppercase">Current Season</p>
                        <p className="text-xl font-black text-white italic">SEASON 22: SHOCKWAVE</p>
                    </div>
                </div>
            </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default ShopInfoModal;
