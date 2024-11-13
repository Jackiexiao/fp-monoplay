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
  { name: 'Bug修复中', type: 'special', icon: Laptop, description: '在这里关禁闭修Bug', owner: null },
  createPropertySpace('交友平台', 140, Heart, '找对象必备'),
  { name: '摸鱼时间', type: 'special', icon: Coffee, description: '休息一下喝杯咖啡', owner: null },
  createPropertySpace('记账软件', 140, DollarSign, '让你知道钱都花哪了'),
  createPropertySpace('天气预报', 160, Globe2, '下雨要带伞'),
  createPropertySpace('效率工具', 180, Zap, '让你更快摸鱼'),
  createPropertySpace('头像生成器', 180, Palette, '你的头像你做主'),
  { name: '产品灵感', type: 'chance', icon: Brain, description: '深夜又想到一个点子', owner: null },
  createPropertySpace('表情包制作', 180, Palette, '斗图必备神器'),
  createPropertySpace('打工人日记', 200, Brain, '记录打工人的日常'),
  { name: '免费停车', type: 'special', icon: Coffee, description: '休息一下，享受生活', owner: null },
  createPropertySpace('健康打卡', 200, Heart, '健康生活每一天'),
  createPropertySpace('早起闹钟', 200, Clock, '早起是不可能的'),
  createPropertySpace('番茄时钟', 200, Timer, '专注力MAX'),
  createPropertySpace('日程管理', 200, Calendar, '安排满满当当'),
  createPropertySpace('待办清单', 200, CheckSquare, '永远都做不完'),
  createPropertySpace('习惯养成', 200, Star, '21天就能养成'),
  { name: '年终述职', type: 'tax', price: 100, icon: Brain, description: '向老板汇报工作', owner: null },
  createPropertySpace('任务管理', 220, CheckSquare, '项目进度一目了然'),
  createPropertySpace('阅读笔记', 220, Brain, '知识就是力量'),
  { name: '加班通宵', type: 'special', icon: Coffee, description: '为了项目加把劲', owner: null },
  createPropertySpace('社交圈子', 240, Heart, '认识更多朋友'),
  createPropertySpace('在线教育', 240, Brain, '活到老学到老'),
  { name: '产品创意', type: 'chance', icon: Brain, description: '灵感乍现', owner: null },
  createPropertySpace('智能家居', 260, Laptop, '科技改变生活'),
  createPropertySpace('运动健身', 260, Heart, '健康生活每一天'),
  { name: '季度考核', type: 'tax', price: 150, icon: Brain, description: '老板要检查KPI了', owner: null },
  createPropertySpace('旅行助手', 280, Globe2, '带你看世界'),
  createPropertySpace('美食地图', 280, Heart, '吃货必备'),
  { name: '产品方向', type: 'chance', icon: Brain, description: '产品转型新方向', owner: null },
  createPropertySpace('二手交易', 300, DollarSign, '闲置换钱钱'),
  createPropertySpace('求职招聘', 300, Brain, '找工作找人才'),
  { name: '团建基金', type: 'tax', price: 200, icon: Heart, description: '该交团建费了', owner: null },
  createPropertySpace('宠物社区', 320, Heart, '铲屎官集合'),
  createPropertySpace('装修设计', 350, Palette, '家装设计灵感'),
  { name: '产品机遇', type: 'chance', icon: Brain, description: '新的市场机会', owner: null }
];

export const updateSpaceOwner = (position: number, newOwner: number | null) => {
  boardSpaces[position] = {
    ...boardSpaces[position],
    owner: newOwner
  };
}; 