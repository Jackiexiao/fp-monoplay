import { LucideIcon } from 'lucide-react';
import { 
  Palette, Brain, Music2, Camera, Laptop, Heart, 
  Coffee, DollarSign, Globe2, Zap, Clock, Timer,
  Calendar, CheckSquare, Star
} from 'lucide-react';

export interface Space {
  name: string;
  type: 'property' | 'chance' | 'tax' | 'special';
  icon?: LucideIcon;
  price?: number;
  description: string;
  owner: number | null;
}

export const createPropertySpace = (
  name: string, 
  price: number, 
  icon: LucideIcon, 
  description: string
): Space => ({
  name,
  type: 'property',
  price,
  icon,
  description,
  owner: null
});

export let boardSpaces: Space[] = [
  { name: '起点', type: 'special', icon: Star, description: '每经过起点获得 200 元', owner: null },
  createPropertySpace('桌面壁纸', 100, Palette, '每天换一张'),
  { name: '产品评审', type: 'chance', icon: Brain, description: '老板觉得界面还要再改改', owner: null },
  createPropertySpace('音乐小程序', 100, Music2, '下一个网易云？'),
  createPropertySpace('短视频App', 120, Camera, '又一个刷视频神器'),
  createPropertySpace('交友平台', 140, Heart, '找对象必备'),
  { name: '摸鱼时间', type: 'special', icon: Coffee, description: '休息一下喝杯咖啡', owner: null },
  createPropertySpace('效率工具', 180, Zap, '让你更快摸鱼'),
  { name: '产品灵感', type: 'chance', icon: Brain, description: '深夜又想到一个点子', owner: null },
  createPropertySpace('打工人日记', 200, Brain, '记录打工人的日常'),
  { name: '免费停车', type: 'special', icon: Coffee, description: '休息一下，享受生活', owner: null },
  createPropertySpace('健康打卡', 200, Heart, '健康生活每一天'),
  createPropertySpace('番茄时钟', 200, Timer, '专注力MAX'),
  { name: '年终述职', type: 'tax', price: 100, icon: Brain, description: '向老板汇报工作', owner: null },
  createPropertySpace('任务管理', 220, CheckSquare, '项目进度一目了然'),
  { name: '加班通宵', type: 'special', icon: Coffee, description: '为了项目加把劲', owner: null },
  createPropertySpace('智能家居', 260, Laptop, '科技改变生活'),
  { name: '产品方向', type: 'chance', icon: Brain, description: '产品转型新方向', owner: null },
  createPropertySpace('二手交易', 300, DollarSign, '闲置换钱钱'),
  createPropertySpace('装修设计', 350, Palette, '家装设计灵感'),
  createPropertySpace('66设计', 350, Palette, '家装设计')
];

export const updateSpaceOwner = (position: number, newOwner: number | null) => {
  boardSpaces[position] = {
    ...boardSpaces[position],
    owner: newOwner
  };
}; 