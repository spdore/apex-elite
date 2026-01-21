
export interface CoachingModule {
  id: string;
  title: string; // e.g., "1时 KVK 练枪指导"
  subtitle: string; // e.g., "快速诊断 / 基础建立"
  price: string;
  image: string;
  
  // New fields for discounts
  originalPrice?: string; 
  discountLabel?: string;

  // Details for Modal
  description: string;
  duration: string; // e.g., "60 Minutes" or "4 Weeks"
  syllabus: string[]; // List of what will be taught
  requirements: string[]; // e.g. "KovaaK installed", "Discord"
  
  focusStats: {
    label: string; // e.g. "Tracking", "Clicking"
    value: number; 
  }[];
  
  tags: string[]; // e.g. ["新手推荐", "瓶颈突破"]
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  discountLabel?: string;
  features: string[];
  recommended?: boolean;
  color: string;
  description: string;
  serviceLevel: string; // "Boost" or "Coaching"
  equipmentPolicy: string; // "PC / Console"
  exclusivePerks: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
