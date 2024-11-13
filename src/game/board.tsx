import { 
  LucideIcon, 
  Rocket, 
  Coffee, 
  Pizza, 
  Brain, 
  Trophy, 
  Laptop, 
  Gamepad2, 
  Smartphone, 
  ShoppingCart, 
  Palette, 
  Music2, 
  Camera, 
  Globe2, 
  MessageCircle, 
  Heart, 
  Zap, 
  DollarSign,
  Clock,
  Timer,
  Calendar,
  CheckSquare,
  Star,
  Activity,
  Moon,
  Book,
  GraduationCap,
  Briefcase,
  PiggyBank,
  ShoppingBag,
  BookOpen,
  Map,
  Utensils,
  Smile
} from 'lucide-react';

export interface Space {
  name: string;
  type: 'start' | 'property' | 'chance' | 'tax' | 'special';
  price?: number;
  icon?: LucideIcon;
  description?: string;
}

const createPropertySpace = (
  name: string, 
  price: number, 
  icon: LucideIcon, 
  description: string
): Space => ({
  name,
  type: 'property',
  price,
  icon,
  description
});

export const boardSpaces: Space[] = [
  { name: '开始', type: 'start', icon: Rocket, description: '从这里开始你的创业之旅！' },
  createPropertySpace('摸鱼小游戏', 60, Gamepad2, '上班摸鱼必备'),
  { name: '创业基金', type: 'chance', icon: DollarSign, description: '天使投资人看上你了！' },
  createPropertySpace('二手交易平台', 60, ShoppingCart, '闲置物品交易'),
  { name: '外卖税', type: 'tax', price: 200, icon: Pizza, description: '加班必备，付出代价' },
  createPropertySpace('社交App', 200, MessageCircle, '又一个约饭软件'),
  createPropertySpace('桌面壁纸', 100, Palette, '每天换一张'),
  { name: '产品评审', type: 'chance', icon: Brain, description: '老板觉得界面还要再改改' },
  createPropertySpace('音乐小程序', 100, Music2, '下一个网易云？'),
  createPropertySpace('短视频App', 120, Camera, '又一个刷视频神器'),
  { name: 'Bug修复中', type: 'special', icon: Laptop, description: '在这里关禁闭修Bug' },
  createPropertySpace('交友平台', 140, Heart, '找对象必备'),
  { name: '摸鱼时间', type: 'special', icon: Coffee, description: '休息一下喝杯咖啡' },
  createPropertySpace('记账软件', 140, DollarSign, '让你知道钱都花哪了'),
  createPropertySpace('天气预报', 160, Globe2, '下雨要带伞'),
  createPropertySpace('效率工具', 180, Zap, '让你更快摸鱼'),
  createPropertySpace('头像生成器', 180, Palette, '你的头像你做主'),
  { name: '产品灵感', type: 'chance', icon: Brain, description: '深夜又想到一个点子' },
  createPropertySpace('表情包制作', 180, Palette, '斗图必备神器'),
  createPropertySpace('打工人日记', 200, Brain, '记录打工人的日常'),
  { name: '免费停车', type: 'special', icon: Coffee, description: '休息一下，享受生活' },
  createPropertySpace('健康打卡', 200, Heart, '健康生活每一天'),
  createPropertySpace('早起闹钟', 200, Clock, '早起是不可能的'),
  createPropertySpace('番茄时钟', 200, Timer, '专注力MAX'),
  createPropertySpace('日程管理', 200, Calendar, '安排满满当当'),
  createPropertySpace('待办清单', 200, CheckSquare, '永远都做不完'),
  createPropertySpace('习惯养成', 200, Star, '21天就能养成'),
  createPropertySpace('减肥助手', 200, Activity, '瘦身永远在明天'),
  createPropertySpace('冥想放松', 200, Moon, '休息是很重要的'),
  createPropertySpace('背单词', 200, Book, '背完就忘系列'),
  createPropertySpace('学习计划', 200, GraduationCap, '学习永无止境'),
  createPropertySpace('职场修炼', 200, Briefcase, '职场进阶指南'),
  createPropertySpace('理财助手', 200, PiggyBank, '月光族的救星'),
  createPropertySpace('购物清单', 200, ShoppingBag, '剁手清单'),
  createPropertySpace('读书笔记', 200, BookOpen, '读书使我快乐'),
  createPropertySpace('旅行规划', 200, Map, '说走就走'),
  createPropertySpace('美食地图', 200, Utensils, '吃货打卡地图'),
  createPropertySpace('运动追踪', 200, Activity, '运动是第一生产力'),
  createPropertySpace('睡眠监测', 200, Moon, '睡眠质量报告'),
  createPropertySpace('心情日记', 200, Smile, '记录每天的心情')
];