
import { CoachingModule, PricingTier } from './types';

export const MISSIONS = [
  {
    id: 'service-01',
    title: '一对一指导 // 1 ON 1 COACHING',
    subtitle: '定制化教学',
    desc: '针对个人习惯量身定制。从身法（TS/SG/兔子跳）到枪法拉枪，手把手纠正肌肉记忆，突破瓶颈期。',
    icon: 'Target', 
    features: ['靶场身法教学', '枪法定位纠正', '专属训练计划']
  },
  {
    id: 'service-02',
    title: '游戏复盘 // VOD REVIEW',
    subtitle: '战术分析',
    desc: '发送第一视角录像，由顶猎教练逐帧分析。指出走位失误、进圈思路及团战决策问题，通过复盘提升大局观与意识。',
    icon: 'ScanLine', 
    features: ['第一视角分析', '决赛圈复盘', '运营思路优化']
  },
  {
    id: 'service-03',
    title: '技术陪玩 // SKILL COMPANION',
    subtitle: '实战演练',
    desc: '拒绝纯躺。顶猎打手开小号双排，实时语音指挥。在实战中教你如何在顶尖局生存、打架并高效拿分。',
    icon: 'Users', 
    features: ['实时语音指挥', '动态局势教学', '协同作战训练']
  }
];

export const COACHING_SERVICES: CoachingModule[] = [
  {
    id: 'kvk-01',
    title: '1时 KVK 练枪指导',
    subtitle: '快速诊断 // 基础建立',
    price: '¥88 / Hour',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop', // Techy grid/screen look
    description: '适合全阶段玩家。一小时内通过Benchmark场景全面测试瞄准能力，精准诊断手腕僵硬、预瞄错误等核心短板，并现场纠正握鼠姿势与发力方式。',
    duration: '60 Minutes Live',
    syllabus: [
      '外设与灵敏度科学设置 (cm/360°)',
      'Benchmark 综合能力摸底测试',
      '手部发力与坐姿纠正',
      '针对性 KovaaK 场景推荐 (Playlist)',
      'Apex 实战应用转化讲解'
    ],
    requirements: ['已安装 KovaaK (Steam)', '麦克风清晰', 'Discord / 腾讯会议'],
    focusStats: [
      { label: 'Diagnosis (诊断)', value: 100 },
      { label: 'Posture (姿势)', value: 90 },
      { label: 'Routine (计划)', value: 60 },
      { label: 'Theory (理论)', value: 80 }
    ],
    tags: ['新手推荐', '快速提升', '姿势矫正']
  },
  {
    id: 'kvk-02',
    title: '长期规划 KVK 练枪指导',
    subtitle: '周期训练 // 突破瓶颈',
    price: '¥188 / 6 Months',
    originalPrice: '¥238',
    discountLabel: '限时特惠',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1600&auto=format&fit=crop', // Abstract data/planning look
    description: '专为突破瓶颈冲击顶猎设计。定制6个月周期性训练计划，包售后支持。每周根据练习数据调整难度，解决高强度拉枪下的抖动与定位丢失问题。',
    duration: '6 Months Support',
    syllabus: [
      'Voltaic / rA 段位冲击指导',
      '瞄准瓶颈期 (Plateau) 突破方案',
      '每周一次 45分钟 进度复盘',
      'Apex 均伤/命中率 提升追踪'
    ],
    requirements: [],
    focusStats: [],
    tags: ['进阶必选', '职业标准', '数据追踪']
  },
  {
    id: 'kvk-03',
    title: '游戏复盘 // VOD REVIEW',
    subtitle: '战术分析 // 决策优化',
    price: '¥58 / Review',
    image: 'https://images.unsplash.com/photo-1593305841991-05c29736ce37?q=80&w=1600&auto=format&fit=crop', // Gaming analysis vibe
    description: '发送第一视角录像，由顶猎教练逐帧分析。指出走位失误、进圈思路及决策问题。通过慢放与画图演示，深度解析如何提升大局观与意识。',
    duration: '45-60 Mins',
    syllabus: [
      '团战细节复盘 (Micro Positioning)',
      '运营思路分析 (Macro Rotation)',
      '地形利用与掩体选择讲解',
      '决赛圈决策优化方案',
      '错误习惯纠正与建议'
    ],
    requirements: ['提供 720p+ 第一视角录像', 'Discord / 腾讯会议', '上传至 B站/Youtube (可选)'],
    focusStats: [],
    tags: ['进阶必选', '意识提升', '战术分析']
  }
];

// --- MALE COMPANION DATA ---
export const MALE_COMPANION_PRICING: PricingTier[] = [
  {
    id: 'male-basic',
    name: '下三段 / 匹配',
    price: '¥28/Hr',
    features: ['人狠话不多', '技术流带飞', '战术指挥', '幽默风趣可选'],
    color: 'border-yellow-500', // Changed to Gold per request
    description: '适合青铜、白银、黄金段位或匹配娱乐。技术过硬，不仅能杀人还能讲段子，让你的游戏体验直线拉满。',
    serviceLevel: 'TECH CARRY // 技术陪玩',
    equipmentPolicy: 'PC Only',
    exclusivePerks: ['KD 效率保障', '免费战术指导']
  },
  {
    id: 'male-plat',
    name: '铂金段位',
    price: '¥35/Hr',
    recommended: true,
    features: ['前顶猎/大师打手', '运营思路清晰', '关键时刻能C', '情绪价值拉满'],
    color: 'border-cyan-400', 
    description: '铂金局强度提升，需要更强的枪法与意识。我们的铂金陪玩均为大师水平，在保证上分的同时提供极佳的语音氛围。',
    serviceLevel: 'ELITE SQUAD // 精英陪玩',
    equipmentPolicy: 'PC Only',
    exclusivePerks: ['掉分包补', '优先接单']
  },
  {
    id: 'male-dia',
    name: '钻石段位',
    price: '¥55/Hr',
    originalPrice: '¥68',
    discountLabel: '限时特惠',
    features: ['S12-S21 现役顶猎', '均伤 1000+', '高端局指挥', '绝活哥任选'],
    color: 'border-blue-500', // Changed to Blue (previous basic color) per request
    description: '钻石局是高手的试炼场。由现役顶猎亲自护航，无论是正面接团还是决赛圈运营，都让你感受到职业级的统治力。',
    serviceLevel: 'PREDATOR CARRY // 顶猎护航',
    equipmentPolicy: 'PC Only',
    exclusivePerks: ['签署保密协议', '包含击杀分']
  }
];

// --- FEMALE COMPANION DATA ---
export const FEMALE_COMPANION_PRICING: PricingTier[] = [
  {
    id: 'female-basic',
    name: '下三段 / 匹配',
    price: '¥30/Hr',
    features: ['甜美声线', '皮套人/虚拟主播', '心态超好', '全程报点'],
    color: 'border-pink-500',
    description: '无论是匹配娱乐还是低段位排位，小姐姐都会全程陪伴。声音甜美，性格温柔，输了不红温，赢了狂夸你。',
    serviceLevel: 'SWEET COMPANION // 娱乐陪玩',
    equipmentPolicy: 'PC / Console',
    exclusivePerks: ['可开视频', '才艺展示']
  },
  {
    id: 'female-plat',
    name: '铂金段位',
    price: '¥48/Hr',
    recommended: true,
    features: ['技术与颜值并存', '不拖后腿', '绝活辅助位', '情绪价值Max'],
    color: 'border-rose-400',
    description: '谁说女生不能打？这里的女陪玩不仅声音好听，枪法同样犀利。在铂金局也能跟上节奏，甚至Carry全场。',
    serviceLevel: 'PRO SUPPORT // 技术女陪',
    equipmentPolicy: 'PC Only',
    exclusivePerks: ['优先排单', '专属语音频道']
  }
];

// Default Export for compatibility if needed elsewhere, though components should switch to specific arrays
export const PRICING = MALE_COMPANION_PRICING; 

export const FEATURES = [
  { title: "纯绿手打", desc: "绝无科技，保障账号安全" },
  { title: "极速效率", desc: "平均每小时 +200 RP" },
  { title: "顶猎打手", desc: "S12-S21 多赛季顶猎认证" },
  { title: "售后无忧", desc: "封号包赔，掉分免费补" },
];
