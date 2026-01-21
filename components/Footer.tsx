
import React, { useState } from 'react';
import { ShieldAlert, Check, Github } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

  const WECHAT_ID = 'Sachiraito1';
  const QQ_ID = '1498059513';
  const XIANYU_TEXT = "【闲鱼】https://m.tb.cn/h.7n1phWg?tk=NR6qUUIijAm HU591 「我在闲鱼发布了【APEX 多赛季大师男pw】」";
  const XIANYU_URL = "https://m.tb.cn/h.7n1phWg?tk=NR6qUUIijAm";

  const handleCopy = async (type: 'wechat' | 'qq' | 'xianyu') => {
    let content = '';
    let label = '';

    switch (type) {
        case 'wechat':
            content = WECHAT_ID;
            label = '微信号';
            break;
        case 'qq':
            content = QQ_ID;
            label = 'QQ号';
            break;
        case 'xianyu':
            content = XIANYU_TEXT;
            label = '闲鱼口令';
            // Open link directly for Xianyu
            window.open(XIANYU_URL, '_blank');
            break;
    }
    
    try {
      await navigator.clipboard.writeText(content);
      setToast({ show: true, message: `已复制 ${label}` });
      
      setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <footer id="contact" className="bg-black border-t border-white/10 py-12 pb-32 md:pb-12 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-24 md:bottom-10 left-1/2 z-[9999] bg-apex-red text-white px-6 py-3 rounded-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(218,41,42,0.5)] border border-white/20 whitespace-nowrap"
          >
            <Check size={18} />
            <span className="font-mono text-sm tracking-wide uppercase">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-white italic mb-4">
              APEX<span className="text-apex-red">.ELITE</span>
            </div>
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              专业的 Apex Legends 陪玩与教学平台。致力于为每一位捍卫者提供最优质的战术支援与技术提升。
              这不是游戏，是猎杀现场。
            </p>
            <div className="flex space-x-4">
                <button onClick={() => handleCopy('wechat')} className="text-gray-400 hover:text-apex-red text-sm uppercase tracking-wider transition-colors">
                    WeChat
                </button>
                <button onClick={() => handleCopy('qq')} className="text-gray-400 hover:text-apex-red text-sm uppercase tracking-wider transition-colors">
                    QQ
                </button>
                <button onClick={() => handleCopy('xianyu')} className="text-gray-400 hover:text-apex-red text-sm uppercase tracking-wider transition-colors">
                    闲鱼
                </button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold uppercase mb-4 tracking-widest text-sm">服务项目</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
                <li><span className="hover:text-apex-red transition-colors cursor-default">猎杀排位陪练</span></li>
                <li><span className="hover:text-apex-red transition-colors cursor-default">顶猎运营指挥</span></li>
                <li><span className="hover:text-apex-red transition-colors cursor-default">身法枪法教学</span></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold uppercase mb-4 tracking-widest text-sm">联系我们</h4>
             <div className="bg-[#0a0a0a] p-4 border border-white/5">
                <p className="text-apex-red font-mono mb-2">OPERATOR_ID: ADMIN</p>
                <button 
                    onClick={() => handleCopy('wechat')}
                    className="w-full bg-white/5 hover:bg-white/10 text-white text-xs py-2 border border-white/10 transition-colors"
                >
                    复制微信号
                </button>
             </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <div className="flex flex-col md:flex-row items-center gap-2">
                <p>© 2026 APEX ELITE. All rights reserved.</p>
                <span className="hidden md:inline text-gray-800">|</span>
                <a 
                    href="https://github.com/spdore" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1 hover:text-apex-red transition-colors"
                >
                    <Github size={12} />
                    <span>spdore</span>
                </a>
            </div>
            <div className="flex items-center mt-4 md:mt-0 space-x-2">
                <ShieldAlert className="w-4 h-4" />
                <span>拒绝外挂，绿色游戏，从我做起</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
